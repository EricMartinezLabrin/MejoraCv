import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            output: {
              ascii_only: true, // Esta opción asegura que solo se usen caracteres ASCII
            },
          },
        }),
      ];
    }
    return config;
  },
};

export default nextConfig;
