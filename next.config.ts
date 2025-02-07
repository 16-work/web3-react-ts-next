/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
    trailingSlash: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "src")],
    },
    webpack(config: { module: { rules: { test: RegExp; use: string[] }[] } }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },

};

export default nextConfig;
