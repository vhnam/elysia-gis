import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import type * as GeoJSON from 'geojson';

import { db } from '@/config/db';

import { coordinatesToPoint, pointToCoordinates } from '@/utils/geometry';

import { rescueRequestSchema } from './rescue-request.schema';

/**
 * Service for rescue request operations
 */
export abstract class RescueRequestService {
  /**
   * Create a new rescue request
   * @param data Request data with longitude/latitude (will be converted to Point)
   */
  static async createRequest(data: {
    name: string;
    email?: string;
    phone: string;
    address?: string;
    requestType: string;
    description?: string;
    longitude: number;
    latitude: number;
  }) {
    // Use raw SQL to properly insert PostGIS geometry
    // ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) creates a Point geometry
    const id = createId();
    await db.execute(sql`
      INSERT INTO "rescue_request" (
        "id", "name", "email", "phone", "address", 
        "request_type", "description", "location", 
        "created_at", "updated_at"
      )
      VALUES (
        ${id},
        ${data.name},
        ${data.email ?? null},
        ${data.phone},
        ${data.address ?? null},
        ${data.requestType}::request_type,
        ${data.description ?? null},
        ST_SetSRID(ST_MakePoint(${data.longitude}, ${data.latitude}), 4326),
        NOW(),
        NOW()
      )
    `);

    // Fetch the inserted record to get properly formatted data
    const request = await this.getRequestById(id);
    if (!request) {
      throw new Error('Failed to retrieve created rescue request');
    }

    // Convert location back to coordinates for response
    const { longitude, latitude } = pointToCoordinates(
      request.location as GeoJSON.Point,
    );

    return {
      ...request,
      longitude,
      latitude,
    };
  }

  /**
   * Get all rescue requests
   * @returns Array of rescue requests with longitude/latitude extracted
   */
  static async getAllRequests() {
    const requests = await db.select().from(rescueRequestSchema);

    return requests.map((request) => {
      const { longitude, latitude } = pointToCoordinates(
        request.location as GeoJSON.Point,
      );
      return {
        ...request,
        longitude,
        latitude,
      };
    });
  }

  /**
   * Get rescue requests within a radius (in meters) of a point
   * @param longitude Center point longitude
   * @param latitude Center point latitude
   * @param radiusMeters Radius in meters
   */
  static async getRequestsWithinRadius(
    longitude: number,
    latitude: number,
    radiusMeters: number,
  ) {
    const centerPoint = coordinatesToPoint(longitude, latitude);

    const requests = await db
      .select()
      .from(rescueRequestSchema)
      .where(
        sql`ST_DWithin(
          ${rescueRequestSchema.location}::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radiusMeters}
        )`,
      );

    return requests.map((request) => {
      const { longitude, latitude } = pointToCoordinates(
        request.location as GeoJSON.Point,
      );
      return {
        ...request,
        longitude,
        latitude,
      };
    });
  }

  /**
   * Get rescue requests within an administrative unit
   * @param administrativeUnitId Administrative unit ID
   */
  static async getRequestsInAdministrativeUnit(administrativeUnitId: string) {
    const requests = await db
      .select()
      .from(rescueRequestSchema)
      .where(
        sql`ST_Within(
          ${rescueRequestSchema.location},
          (SELECT geom FROM gis.administrative_unit WHERE id = ${administrativeUnitId})
        )`,
      );

    return requests.map((request) => {
      const { longitude, latitude } = pointToCoordinates(
        request.location as GeoJSON.Point,
      );
      return {
        ...request,
        longitude,
        latitude,
      };
    });
  }

  /**
   * Get a rescue request by ID
   */
  static async getRequestById(id: string) {
    const [result] = await db.execute<{
      id: string;
      name: string;
      email: string | null;
      phone: string;
      address: string | null;
      request_type: string;
      description: string | null;
      location: GeoJSON.Point; // GeoJSON object from ST_AsGeoJSON
      created_at: Date;
      updated_at: Date;
    }>(sql`
      SELECT 
        id, name, email, phone, address,
        request_type, description,
        ST_AsGeoJSON(location)::json as location,
        created_at, updated_at
      FROM "rescue_request"
      WHERE id = ${id}
      LIMIT 1
    `);

    if (!result) {
      return null;
    }

    const location = result.location;
    const { longitude, latitude } = pointToCoordinates(location);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      address: result.address,
      requestType: result.request_type as any,
      description: result.description,
      location,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      longitude,
      latitude,
    };
  }
}
