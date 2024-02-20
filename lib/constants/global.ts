export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://form-manager-v1.vercel.app'
    : 'http://localhost:3000';
