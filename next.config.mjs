
const nextConfig = {
  htmlLimitedBots: /.*/,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.inforbit.in",
      },
    ],
  },
  async redirects() {
    return [
      // One canonical host: send non-www to www permanently (308).
      {
        source: "/:path*",
        has: [{ type: "host", value: "theelegance.co.in" }],
        destination: "https://www.theelegance.co.in/:path*",
        permanent: true,
      },
      // Old PHP site URLs still indexed by Google -> new clean URLs.
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/:path*.php", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
