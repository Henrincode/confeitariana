'use client'

import bcrypt from "bcryptjs"
import { useState } from "react"

export default function ClientTeste() {

    async function hashPassword(password: string) {
        // O número 10 é o "cost factor" (custo de processamento). 
        // 10 é o padrão seguro atual para equilíbrio entre segurança e performance.
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const teste = await bcrypt.compareSync(password, hash)

        setSenha(hash)
    }

    const [senha, setSenha] = useState<boolean | string>(true)

    return (
        <div>
            <p onClick={() => hashPassword('admin')}>teste</p>
            {String(senha)}
        </div>
    )
}