import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 1. Domínios permitidos
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    // 2. Resolve o erro "dangerouslyAllowSVG"
    dangerouslyAllowSVG: true,
    // 3. (Opcional) Melhora a segurança forçando o download se alguém tentar abrir a imagem direto
    contentDispositionType: 'attachment',
    // 4. (Opcional) Impede a execução de scripts dentro do SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;