// ============================================================================
// Base GeoJSON Types
// ============================================================================

/**
 * GeoJSON Geometry Types
 */
export type GeoJSONGeometryType =
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon';

/**
 * Position - [longitude, latitude] or [longitude, latitude, elevation]
 */
export type Position = [number, number] | [number, number, number];

/**
 * MultiPolygon Geometry (used in all your GeoJSON files)
 */
export interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: Position[][][][]; // Array of polygons, each containing rings of positions
}

/**
 * Generic GeoJSON Geometry
 */
export type Geometry = MultiPolygonGeometry; // Can be extended with other geometry types if needed

// ============================================================================
// VN-63 Dataset (Simpler structure)
// ============================================================================

/**
 * Province properties for VN-63 dataset
 */
export interface AdministrativeUnitLegacyProvinceProperties {
  ma_tinh: string;      // Province code
  ten_tinh: string;     // Province name
  loai: string;         // Type (e.g., "Tỉnh", "Thành phố")
  cap: number;          // Administrative level
  stt: number;          // Order/sequence number
}

/**
 * District properties for VN-63 dataset
 */
export interface AdministrativeUnitLegacyDistrictProperties {
  ma_huyen: string;     // District code
  ten_huyen: string;    // District name
  loai: string;         // Type (e.g., "Huyện", "Thành phố", "Quận")
  cap: number;          // Administrative level
  stt: number;          // Order/sequence number
  ma_tinh: string;      // Province code
  ten_tinh: string;     // Province name
}

/**
 * Ward properties for VN-63 dataset
 */
export interface AdministrativeUnitLegacyWardProperties {
  ma_xa: string;        // Ward code
  ten_xa: string;       // Ward name
  loai: string;         // Type (e.g., "Xã", "Phường", "Thị trấn")
  cap: number;          // Administrative level
  stt: number;          // Order/sequence number
  ma_huyen: string;     // District code
  ten_huyen: string;    // District name
  ma_tinh: string;      // Province code
  ten_tinh: string;     // Province name
}

// ============================================================================
// VN-34 Dataset (More detailed with demographic data)
// ============================================================================

/**
 * Province properties for VN-34 dataset (with demographic data)
 */
export interface AdministrativeUnitProvinceProperties {
  ma_tinh: string;      // Province code
  ten_tinh: string;     // Province name
  sap_nhap: string;     // Merger information
  quy_mo: string;       // Scale/size description
  tru_so: string;       // Headquarters address
  loai: string;         // Type (e.g., "Tỉnh", "Thành phố")
  cap: number;          // Administrative level
  stt: number;          // Order/sequence number
  dtich_km2: number;    // Area in km²
  dan_so: number;       // Population
  matdo_km2: number;    // Population density per km²
}

/**
 * Ward properties for VN-34 dataset (with demographic data)
 */
export interface AdministrativeUnitWardProperties {
  ma_xa: string;        // Ward code
  ten_xa: string;       // Ward name
  sap_nhap: string;     // Merger information
  tru_so: string;       // Headquarters address
  loai: string;         // Type (e.g., "Xã", "Phường", "Thị trấn")
  cap: number;          // Administrative level
  stt: number;          // Order/sequence number
  dtich_km2: number;    // Area in km²
  dan_so: number;       // Population
  matdo_km2: number;    // Population density per km²
  ma_tinh: string;      // Province code
  ten_tinh: string;     // Province name
}

// ============================================================================
// GeoJSON Feature & FeatureCollection Types
// ============================================================================

/**
 * GeoJSON Feature
 */
export interface GeoJSONFeature<P = Record<string, any>> {
  type: 'Feature';
  properties: P;
  geometry: Geometry;
}

/**
 * GeoJSON FeatureCollection
 */
export interface GeoJSONFeatureCollection<P = Record<string, any>> {
  type: 'FeatureCollection';
  name: string; // e.g., "gis.vn"
  features: GeoJSONFeature<P>[];
}

// ============================================================================
// Specific FeatureCollection Types for Each Dataset
// ============================================================================

/**
 * VN-63 Province FeatureCollection
 */
export type AdministrativeUnitLegacyProvinceFeatureCollection = GeoJSONFeatureCollection<AdministrativeUnitLegacyProvinceProperties>;

/**
 * VN-63 District FeatureCollection
 */
export type AdministrativeUnitLegacyDistrictFeatureCollection = GeoJSONFeatureCollection<AdministrativeUnitLegacyDistrictProperties>;

/**
 * VN-63 Ward FeatureCollection
 */
export type AdministrativeUnitLegacyWardFeatureCollection = GeoJSONFeatureCollection<AdministrativeUnitLegacyWardProperties>;

/**
 * VN-34 Province FeatureCollection
 */
export type AdministrativeUnitProvinceFeatureCollection = GeoJSONFeatureCollection<AdministrativeUnitProvinceProperties>;

/**
 * VN-34 Ward FeatureCollection
 */
export type AdministrativeUnitWardFeatureCollection = GeoJSONFeatureCollection<AdministrativeUnitWardProperties>;

// ============================================================================
// Union Types for All Datasets
// ============================================================================

/**
 * All province properties
 */
export type ProvinceProperties = AdministrativeUnitLegacyProvinceProperties | AdministrativeUnitProvinceProperties;

/**
 * All district properties
 */
export type DistrictProperties = AdministrativeUnitLegacyDistrictProperties;

/**
 * All ward properties
 */
export type WardProperties = AdministrativeUnitLegacyWardProperties | AdministrativeUnitWardProperties;

/**
 * All administrative properties
 */
export type AdministrativeProperties =
  | ProvinceProperties
  | DistrictProperties
  | WardProperties;

/**
 * All FeatureCollection types
 */
export type VietnamGeoJSONFeatureCollection =
  | AdministrativeUnitLegacyProvinceFeatureCollection
  | AdministrativeUnitLegacyDistrictFeatureCollection
  | AdministrativeUnitLegacyWardFeatureCollection
  | AdministrativeUnitProvinceFeatureCollection
  | AdministrativeUnitWardFeatureCollection;
