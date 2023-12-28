/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.builder.io", "cdn2.iconfinder.com", "cdn1.iconfinder.com"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
