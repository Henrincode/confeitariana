'use client'

import { createClientCategory } from "@/server/actions/client.actions"
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
            <form action={formCreateCategory} className="flex flex-col w-fit mx-auto bg-amber-300">
                <p>Categorias</p>
                <input type="text" name="name" placeholder="Escreva um nome" />
                <select name="category" id="category">
                    {categoryes.map((c: any, i: number) => <option key={i} value={c.id_client_category}>{c.name}</option>)}
                </select>
                <button>Cadastrar</button>
                {stateCreatCategory.error && <p className="text-center">{stateCreatCategory.error}</p>}
            </form>
        </>
    )
}
