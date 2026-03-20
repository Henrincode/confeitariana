// app/login/actions.ts
'use server'

// para desativar o redirecionamento
// signOut({ redirect: false })

// para controlar o redirecionamento
// signOut({ redirectTo: "/login" })

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function authenticate(formData: FormData) {
    try {
        // O primeiro parâmetro "credentials" deve bater com o nome 
        // que você deu ao provider no seu arquivo auth.ts
        await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirectTo: "/admin/clientes", // Para onde ele vai se der certo
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Usuário ou senha inválidos."
                default:
                    return "Algo deu errado no login."
            }
        }
        throw error // Necessário para o redirecionamento do Next.js funcionar
    }
}

// configurar o signout
export async function logout() {
    await signOut()
}