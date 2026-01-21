/**
 * Custom PostGIS geometry type for Drizzle ORM
 * Stores GeoJSON geometry as PostGIS geometry with SRID 4326 (WGS84)
 */
import { customType } from 'drizzle-orm/pg-core';
import type * as GeoJSON from 'geojson';

export const geometry = customType<{
  data: GeoJSON.Geometry;
  driverData: string;
}>({
  dataType() {
    return 'geometry(Geometry, 4326)';
  },
  toDriver(value: GeoJSON.Geometry): string {
    return `ST_GeomFromGeoJSON('${JSON.stringify(value)}')`;
  },
  fromDriver(value: string): GeoJSON.Geometry {
    // PostGIS returns geometry as WKB hex string or GeoJSON depending on query
    // When using ST_AsGeoJSON, it returns a GeoJSON string
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        // If it's WKB hex, we'll handle it in queries with ST_AsGeoJSON
        return value as unknown as GeoJSON.Geometry;
      }
    }
    return value as unknown as GeoJSON.Geometry;
  },
});

/**
 * Custom PostGIS MultiPolygon geometry type
 */
export const multiPolygon = customType<{
  data: GeoJSON.MultiPolygon;
  driverData: string;
}>({
  dataType() {
    return 'geometry(MultiPolygon, 4326)';
  },
  toDriver(value: GeoJSON.MultiPolygon): string {
    return `ST_GeomFromGeoJSON('${JSON.stringify(value)}')`;
  },
  fromDriver(value: string): GeoJSON.MultiPolygon {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value as unknown as GeoJSON.MultiPolygon;
      }
    }
    return value as unknown as GeoJSON.MultiPolygon;
  },
});

/**
 * Custom PostGIS Point geometry type for storing coordinates
 * Stores GeoJSON Point as PostGIS geometry with SRID 4326 (WGS84)
 */
export const point = customType<{
  data: GeoJSON.Point;
  driverData: string;
}>({
  dataType() {
    return 'geometry(Point, 4326)';
  },
  toDriver(value: GeoJSON.Point): string {
    return `ST_GeomFromGeoJSON('${JSON.stringify(value)}')`;
  },
  fromDriver(value: string): GeoJSON.Point {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value as unknown as GeoJSON.Point;
      }
    }
    return value as unknown as GeoJSON.Point;
  },
});
