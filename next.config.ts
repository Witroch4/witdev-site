import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necessário para o Dockerfile.prod usar o modo standalone (menor imagem)
  output: "standalone",
};

export default nextConfig;

