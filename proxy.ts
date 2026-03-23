// Trago a instância do Auth.js que configurei para lidar com a sessão
import { auth } from "@/auth"

// O middleware recebe a requisição (req) e já verifica o estado da sessão do usuário
export default auth((req) => {
  // Verifico se o cara está logado transformando o objeto de sessão em um booleano
  const isLoggedIn = !!req.auth

  
  // Pego o caminho da URL que ele está tentando acessar no momento
  const { pathname } = req.nextUrl

  // Identifico se ele está tentando entrar em qualquer página que comece com /admin
  const isOnAdmin = pathname.startsWith("/admin")
  
  // Faço a verificação exata da Home (/) para evitar que outras rotas caiam no loop
  const isOnHome = pathname === "/"

  // --- LOGICA DE PROTEÇÃO ---
  // Se ele tentar forçar a entrada no painel administrativo sem estar logado...
  if (isOnAdmin && !isLoggedIn) {
    // Eu chuto ele de volta para a Home/Login para ele se autenticar
    return Response.redirect(new URL("/", req.nextUrl))
  }

  // --- LOGICA DE FLUXO ---
  // Se o cara já está logado e tenta acessar a Home (que é o nosso login)...
  if (isOnHome && isLoggedIn) {
    // Eu mando ele direto para a listagem de clientes dentro do admin, que é o que importa
    return Response.redirect(new URL("/admin/clientes", req.nextUrl))
  }
})

// Configurações de performance do Next.js
export const config = {
  // Aqui eu defino um filtro (matcher) para o middleware não rodar em tudo.
  // Ele vai ignorar pastas do sistema, imagens e APIs pra deixar a navegação mais rápida.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}