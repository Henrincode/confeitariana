'use server'

// para desativar o redirecionamento
// signOut({ redirect: false })

// para controlar o redirecionamento
// signOut({ redirectTo: "/login" })

import { signIn, signOut } from "@/auth"
import { authSchema } from "@/schemas/auth.schema"
import { AuthError } from "next-auth"

export async function authenticate(params: FormData | { username: string, password: string }) {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = authSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) {
        return "Campo usuário e senha devem ser preenchidos corretamente. USUÁRIO mínimo 3 caracteres, SENHA mínimo 4 caracteres"
    }

    try {
        // O primeiro parâmetro "credentials" deve bater com o nome 
        // que você deu ao provider no seu arquivo auth.ts
        await signIn("staff", {
            username: paramsValidate.data.username,
            password: paramsValidate.data.password,
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
    await signOut({ redirectTo: '/' })
}