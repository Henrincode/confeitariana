'use client'

import { createClientCategory } from "@/server/actions/client.action"
import { useActionState } from "react"

interface ActionState {
    error?: string
    success?: boolean
}

const initialState: ActionState = {}

export default function FormClientCat({ categoryes }: any) {
    const [stateCreatCategory, formCreateCategory] = useActionState(createClientCategory, initialState)

    return (
        <>
            <form action={formCreateCategory} className="
                flex
                flex-col
                items-center
                gap-2
                max-w-50
                mx-auto
                p-2
                **:rounded-2xl
                bg-amber-300

                [&_.campo]:w-full
                [&_.campo]:px-2
                [&_.campo]
                [&_.campo]:bg-pink-50

                [&_button]:px-2
                [&_button]:bg-pink-400
            ">
                <p>Categorias</p>
                <input type="text" name="name" placeholder="Escreva um nome" className="campo" />
                <select name="category" id="category" className="campo">
                    {categoryes.map((c: any, i: number) => <option key={i} value={c.id_client_category}>{c.name}</option>)}
                </select>
                <button>Cadastrar</button>
                {stateCreatCategory.error && <p className="text-center">{stateCreatCategory.error}</p>}
            </form>
        </>
    )
}
