/** @type {import('next').NextConfig} */


const nextConfig = {
  images: {
    hostname: ['seventech.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com'],
    domains: ['seventech.s3.ap-southeast-1.amazonaws.com', 'tailwindui.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
