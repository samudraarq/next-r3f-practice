import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.vs": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.fs": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.vert": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.frag": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

export default nextConfig;
