/**
 * O QUE É UM ARQUIVO .d.ts? (Declaration File)
 * * 1. "d" de Declaration: Este arquivo não gera código JavaScript no final. 
 * Ele serve apenas para "explicar" ao TypeScript como são os formatos das coisas.
 * * 2. Module Augmentation (Aumento de Módulo): O NextAuth já vem com tipos prontos 
 * (como id, name, email). Quando usamos o "declare module", estamos dizendo: 
 * "Ei TypeScript, pegue o que já existe no NextAuth e ADICIONE esses campos novos".
 * * 3. Sem Erros no VS Code: Sem esse arquivo, o TS reclamaria que 'role' ou 'id_role' 
 * não existem no objeto 'session'. Esse arquivo "ensina" o editor a aceitar esses campos.
 */

import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            id_role: string
            name: string
            role: string
        }
        // Ao remover o & DefaultSession["user"], você está dizendo que 
        // o objeto user terá EXATAMENTE apenas esses 4 campos acima.
    }

    interface User {
        id: string
        id_role: string
        name: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        id_role: string
        name: string
        role: string
    }
}