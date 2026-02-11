import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // permite servidor baixar imagens externas
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // invalida cache do usuário durante navegação
  experimental: {
    staleTimes: {
      dynamic: 0, // Invalida o cache do navegador para rotas dinâmicas instantaneamente
      static: 0, // Mantém o cache de rotas estáticas por 3 minutos (opcional)
    },
  },
};

export default nextConfig;