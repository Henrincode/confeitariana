import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import sql from "@/lib/db" // Caminho para o seu arquivo que exporta o postgres()
import bcrypt from "bcryptjs" // Lembre-se de instalar: npm install bcryptjs

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        // Buscando na SUA tabela ana_auth_staff
        const [user] = await sql`
          SELECT s.*, r.name as role_name
          FROM ana_auth_staff s
          JOIN ana_auth_staff_roles r ON s.id_auth_staff_role_fk = r.id_auth_staff_role
          WHERE LOWER(s.username) = LOWER(${credentials.username as string})
          AND s.deleted_at IS NULL
          LIMIT 1
        `

        // Se não achar o usuário ou a senha não bater
        if (!user || !user.pass_hash) return null

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.pass_hash
        )

        if (!isPasswordValid) return null

        // Retorna os dados que ficarão salvos no Cookie (JWT)
        return {
          id: user.id_auth_staff.toString(),
          name: user.name,
          role: user.role_name,
        }
      }
    })
  ],
  session: { strategy: "jwt" }, // Usando Cookies, sem precisar de tabelas extras
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        (session.user as any).id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/login', // URL da sua página de login customizada
  }
})