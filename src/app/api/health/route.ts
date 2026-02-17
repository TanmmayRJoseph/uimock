import { NextResponse } from "next/server";

/**
 * Health Check Endpoint
 * Used by Docker health checks and monitoring systems
 * Returns 200 OK if the application is running properly
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "uimock",
      version: "1.0.0",
    },
    { status: 200 },
  );
}
