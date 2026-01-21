# Migration Guide: Rescue Request Location to PostGIS

This guide explains how to migrate the `rescue_request` table from separate `longitude`/`latitude` columns to a PostGIS `Point` geometry column.

## Overview

The migration converts:

- `longitude` (double precision) + `latitude` (double precision)
- → `location` (geometry(Point, 4326))

## Benefits

1. **Spatial Queries**: Enable efficient geographic queries (distance, within radius, etc.)
2. **Spatial Indexing**: GIST index for fast spatial lookups
3. **Consistency**: Matches the pattern used in `administrative_unit` tables
4. **PostGIS Functions**: Access to powerful spatial functions (ST_Distance, ST_Within, etc.)

## Migration Steps

### 1. Generate Drizzle Migration

First, generate the schema migration:

```bash
bun run db:generate
```

This will create a new migration file in `drizzle/` that adds the `location` column.

### 2. Apply Schema Migration

Apply the migration to your database:

```bash
bun run db:migrate
```

### 3. Run Data Migration

Migrate existing data from `longitude`/`latitude` to `location`:

```bash
bun run db:migrate:location
```

This script will:

- Add the `location` column (if not already added)
- Convert existing `longitude`/`latitude` data to Point geometry
- Create a spatial index on `location`
- Drop the old `longitude` and `latitude` columns

## Usage in Code

### Creating a Rescue Request

The service layer handles conversion automatically:

```typescript
import { RescueRequestService } from '@/modules/rescue-request';

// Create request with longitude/latitude (converted to Point internally)
const request = await RescueRequestService.createRequest({
  name: 'John Doe',
  phone: '+1234567890',
  longitude: 106.6873555,
  latitude: 10.7634781,
  requestType: 'medical',
  // ... other fields
});
```

### Querying Requests

#### Get all requests (with longitude/latitude extracted)

```typescript
const requests = await RescueRequestService.getAllRequests();
// Returns: [{ id, name, ..., longitude, latitude }]
```

#### Find requests within radius

```typescript
// Find all requests within 5km of a point
const nearbyRequests = await RescueRequestService.getRequestsWithinRadius(
  106.6873555, // longitude
  10.7634781, // latitude
  5000, // radius in meters
);
```

#### Find requests within administrative unit

```typescript
const requestsInProvince =
  await RescueRequestService.getRequestsInAdministrativeUnit('province-id-123');
```

## Direct PostGIS Queries

You can also use PostGIS functions directly in SQL:

```typescript
import { sql } from 'drizzle-orm';

// Calculate distance between two points
const distance = await db.execute(sql`
  SELECT ST_Distance(
    (SELECT location FROM rescue_request WHERE id = 'request-1'),
    (SELECT location FROM rescue_request WHERE id = 'request-2')
  ) AS distance;
`);

// Find requests within a polygon
const requests = await db.execute(sql`
  SELECT * FROM rescue_request
  WHERE ST_Within(
    location,
    ST_GeomFromGeoJSON('{"type":"Polygon","coordinates":[...]}')
  );
`);
```

## Rollback (if needed)

If you need to rollback, you would need to:

1. Add back `longitude` and `latitude` columns
2. Extract coordinates from `location` Point
3. Drop the `location` column

However, this is not recommended once the migration is complete. Always backup your database before running migrations.

## Notes

- The frontend API can continue to accept `longitude`/`latitude` in requests
- The service layer converts between coordinate pairs and Point geometry
- All spatial queries use SRID 4326 (WGS84), matching your administrative units
