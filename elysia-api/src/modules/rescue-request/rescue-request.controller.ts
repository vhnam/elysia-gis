import { Elysia } from 'elysia';

import { RescueRequestModel } from './rescue-request.model';
import { RescueRequestService } from './rescue-request.service';

export const rescueRequestController = new Elysia({
  prefix: '/api/v1/rescue-requests',
  tags: ['Rescue Requests'],
})
  .get(
    '/',
    async (): Promise<RescueRequestModel.GetRescueRequestsResponse> => {
      const requests = await RescueRequestService.getAllRequests();
      // Convert null values to undefined for optional fields to match schema
      const transformedRequests = requests.map((request) => ({
        ...request,
        email: request.email ?? undefined,
        address: request.address ?? undefined,
        description: request.description ?? undefined,
      }));
      return {
        data: transformedRequests,
        total: transformedRequests.length,
      };
    },
    {
      response: {
        200: RescueRequestModel.getRescueRequestsResponse,
      },
    },
  )
  .post(
    '/',
    async ({ body }) => {
      const request = await RescueRequestService.createRequest(body);
      return {
        ...request,
        description: request.description ?? undefined,
        email: request.email ?? undefined,
        address: request.address ?? undefined,
      };
    },
    {
      body: RescueRequestModel.createRescueRequestRequest,
      response: {
        200: RescueRequestModel.rescueRequestResponse,
      },
    },
  );
