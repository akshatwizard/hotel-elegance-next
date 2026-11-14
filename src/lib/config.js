// Single source of truth for the content backend.
// Override per environment with NEXT_PUBLIC_API_BASE (no trailing slash).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://www.inforbit.in/demo/hotel-elegance-backend/api";

// Default cache window for read-only content fetched on the server.
export const REVALIDATE_SECONDS = 3600;
