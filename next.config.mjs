/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.neuaurelius.com" }],
        destination: "https://neuaurelius.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
