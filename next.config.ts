import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Enable standalone output for Docker deployment
  // This creates a minimal production server in .next/standalone
  // that includes only the necessary files to run the app
  output: "standalone",
};

export default nextConfig;
