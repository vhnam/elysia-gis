export interface CreateRescueRequestRequest {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  requestType: string;
  description?: string;
  longitude: number;
  latitude: number;
}

export interface RescueRequestResponse {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  requestType: string;
  description?: string;
  longitude: number;
  latitude: number;
}
