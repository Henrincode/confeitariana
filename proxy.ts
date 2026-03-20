import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

  // Se tentar entrar no /admin sem estar logado, vai para o login
  if (isOnAdmin && !isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }
})

export const config = {
  // O middleware roda em tudo, exceto arquivos estáticos e API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}