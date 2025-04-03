// src/config/env.ts
export const env = {
	apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
	mapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
	maxUploadSize: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || '5', 10),
};