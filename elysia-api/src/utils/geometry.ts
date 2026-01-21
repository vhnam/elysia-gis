import type * as GeoJSON from 'geojson';

/**
 * Convert longitude and latitude to a GeoJSON Point
 */
export function coordinatesToPoint(
  longitude: number,
  latitude: number,
): GeoJSON.Point {
  return {
    type: 'Point',
    coordinates: [longitude, latitude],
  };
}

/**
 * Extract longitude and latitude from a GeoJSON Point
 */
export function pointToCoordinates(point: GeoJSON.Point): {
  longitude: number;
  latitude: number;
} {
  const [longitude, latitude] = point.coordinates;
  return { longitude, latitude };
}
