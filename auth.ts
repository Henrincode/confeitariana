import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import sql from "@/server/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const [user] = await sql`
          SELECT s.*, r.name as role_name
          FROM ana_auth_staff s
          JOIN ana_auth_staff_roles r ON s.id_auth_staff_role_fk = r.id_auth_staff_role
          WHERE LOWER(s.username) = LOWER(${credentials.username as string})
          AND s.deleted_at IS NULL
          LIMIT 1
        `
                if (!user || !bcrypt.compareSync(credentials.password as string, user.pass_hash)) return null

                return { id: user.id_auth_staff.toString(), name: user.name, role: user.role_name }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = (user as any).role
            return token
        },
        async session({ session, token }) {
            if (session.user) (session.user as any).role = token.role as string
            return session
        }
    },
    session: { strategy: "jwt" },
    pages: { signIn: '/login' }
})