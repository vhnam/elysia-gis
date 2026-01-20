import axios from 'axios';

import { Config } from '@/config/env';

export const api = axios.create({
  baseURL: `${Config.API_URL}/api/v1`,
  withCredentials: true, // Include cookies in requests for better-auth
});
