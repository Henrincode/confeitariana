'use client'

import { authenticate } from "@/server/actions/auth"
import { useState } from "react"

export default function ClientViewHome() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function login(formData: FormData) {

        console.log(Object.fromEntries(formData.entries()))

        const username = formData.get('username')
        const password = formData.get('password')

        if (!username || !password) {
            setError('Usuário e senha devem ser preenchidos')
            return
        }

        const response = await authenticate(formData)

        if (response) setError(response)
    }

    return (
        <div className="flex flex-col justify-center items-center p-3">
            <img className="w-100" src="/cookie-01.png" alt="" />
            <h1 className="mb-2 font-bold text-5xl text-pink-400">Confeitariana</h1>
            <form action={login} className="
                flex
                flex-col
                gap-2
                max-w-100
                w-full
                p-2
                rounded-2xl
                bg-pink-400

                [&_.coluna]:flex
                [&_.coluna]:flex-row
                [&_.coluna]:justify-center
                [&_.coluna]:gap-2

                [&_input]:w-full
                [&_input]:p-2
                [&_input]:rounded-2xl
                [&_input]:text-center
                [&_input]:hover:outline-2
                [&_input]:focus:outline-2
                [&_input]:outline-pink-500
                [&_input]:bg-white
                [&_input]:hover:bg-pink-100

                [&_button]:w-full
                [&_button]:p-2
                [&_button]:rounded-2xl
                [&_button]:text-pink-800
                [&_button]:bg-pink-100
                [&_button]:hover:bg-pink-300
                [&_button]:cursor-pointer
            ">
                <input onInput={(e) => setUsername(e.currentTarget.value)} name='username' type="text" placeholder="login: admin" />
                <input onInput={(e) => setPassword(e.currentTarget.value)} name="password" type="password" placeholder="senha: admin" />
                <div className="h-0.5 rounded-full bg-pink-200"></div>
                {error && (
                    <>
                        <p className="text-center text-red-800">{error}</p>
                        <div className="h-0.5 rounded-full bg-pink-200"></div>
                    </>
                )}
                <div className="coluna">
                    <button type="submit">Entrar</button>
                    <button type="button">Cadastrar</button>
                </div>
                <p className="text-center text-sm text-pink-800 hover:text-pink-600 cursor-pointer">Esqueci minha senha</p>
            </form>
        </div>
    )
}