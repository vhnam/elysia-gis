import { Elysia } from 'elysia';

import { RescueRequestModel } from './rescue-request.model';
import { RescueRequestService } from './rescue-request.service';

export const rescueRequestController = new Elysia({
  prefix: '/api/v1/rescue-requests',
  tags: ['Rescue Requests'],
}).post(
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
