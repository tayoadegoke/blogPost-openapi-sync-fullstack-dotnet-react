/// <reference types="node" />
import { defineConfig } from '@hey-api/openapi-ts';

const API_BASE_URL = process.env['VITE_API_BASE_URL'] || 'http://localhost:5000';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: `${API_BASE_URL}/swagger/v1/swagger.json`,
  output: {
    path: './src/api',
  },
});
