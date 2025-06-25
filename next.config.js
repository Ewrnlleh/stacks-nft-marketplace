/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'stacksapi.net', 'images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
