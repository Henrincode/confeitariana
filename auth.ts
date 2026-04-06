import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import sql from "@/server/db"
import bcrypt from "bcryptjs"
import { Staff } from "./types/staff.types"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            id: 'staff',
            name: 'staff login',
            async authorize(credentials) {
                // 1. Aqui você busca no banco. O nome 'staff' é apenas uma variável sua.
                const [staff] = await sql<Staff[]>`
                    SELECT s.*, r.name as role
                    FROM ana_auth_staff s
                    JOIN ana_auth_staff_roles r ON s.id_auth_staff_role_fk = r.id_auth_staff_role
                    WHERE LOWER(s.username) = LOWER(${credentials.username as string})
                    AND s.deleted_at IS NULL
                    LIMIT 1
                `

                // 2. Validação: se não achar ou a senha estiver errada, retorna null
                if (!staff || !bcrypt.compareSync(credentials.password as string, staff.pass_hash)) return null

                // 3. A TRANSFORMAÇÃO:
                // O NextAuth EXIGE que você retorne um objeto que ele entenda (um "User").
                // Você mapeia os campos do seu 'staff' para os campos padrão do NextAuth.
                return {
                    id: staff.id_auth_staff.toString(),
                    id_role: staff.id_auth_staff_role_fk.toString(),
                    name: staff.name,
                    role: staff.role // Adicionamos 'role' extra aqui
                }
            }
        })
    ],
    callbacks: {
        // 4. O 'user' aqui é exatamente o objeto que você deu 'return' ali em cima no authorize.
        async jwt({ token, user }) {
            if (user) {
                // Se o user existe (primeiro login), passamos a role do 'user' para o 'token'
                token.id = user.id
                token.id_role = user.id_role
            }
            return token
        },
        // 5. A 'session' é o que o seu Frontend (useSession) vai enxergar.
        async session({ session, token }) {
            if (session.user) {
                // Passamos a role que estava guardada no token para a sessão final
                session.user.id = token.id
                session.user.id_role = token.id_role
            }
            return session
        }
    },
    session: { strategy: "jwt" },
    pages: { signIn: '/' }
})