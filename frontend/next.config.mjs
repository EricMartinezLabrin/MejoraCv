/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        config.optimization = {
            ...config.optimization,
            minimize: false
        }
        return config
    }
}

export default nextConfig
