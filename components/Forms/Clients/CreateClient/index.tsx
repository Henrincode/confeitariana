'use client'

import { createClient } from "@/server/actions/client.action"
import Link from "next/link"
import { useActionState } from "react"

interface State {
    success?: boolean
    error?: string
}

const initialState: State = {}

export default function FormCreateClient({ classBody, classForm, clients, categories }: any) {
    const [stateCreateClient, formCreateClient] = useActionState(createClient, initialState)
    return (
        <form action={formCreateClient} className={classBody}>
            <div className={`
            ${classForm}
            grid
            grid-cols-4
            items-center
            gap-2
            p-2

            [&_.col]:flex
            [&_.col]:flex-col
            [&_.col]:col-span-4
            [&_.col-1]:sm:col-span-1
            [&_.col-3]:sm:col-span-3

            [&_label]:pl-2
            [&_label]:text-white

            [&_.campo]:w-full
            [&_.campo]:h-full
            [&_.campo]:p-2
            [&_.campo]:rounded-2xl
            [&_.campo]:bg-pink-50
        `}>
                <div className="col col-3">
                    <label htmlFor="name">Nome</label>
                    <input name="name" id="name" type="text" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="categories">Categoria</label>
                    <select name="category" id="categories" className="campo">
                        {categories.map((c: any, i: number) => (
                            <option key={i} value={c.id_client_category}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-1">
                    <label htmlFor="email">E-Mail</label>
                    <input name="email" id="email" type="email" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="phone">Telefone</label>
                    <input name="phone" id="phone" type="number" min={0} className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <input name="whatsapp" id="whatsapp" type="number" min={0} className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="birth_date">Aniversário</label>
                    <input name="birth_date" id="birth_date" type="date" className="campo" />
                </div>
                <div className="col">
                    <label htmlFor="details">Detalhes</label>
                    <textarea name="details" id="details" rows={4} className="campo resize-none"></textarea>
                </div>
            </div>
            <div className="
                flex
                flex-row
                justify-center
                sm:justify-start
                gap-2
                sm:pl-5

                [&_.button]:block
                [&_.button]:px-2
                [&_.button]:pb-2
                [&_.button]:rounded-b-2xl
                [&_.button]:text-white
                [&_.button]:bg-pink-400
                [&_.button]:hover:bg-linear-to-t
                [&_.button]:hover:from-pink-800
                [&_.button]:hover:to-pink-400
                [&_.button]:cursor-pointer
            ">
                <button className="button bg-green-400">Cadastrar</button>
                <Link href='/admin/clientes' className="button bg-amber-400">Cancelar</Link>
            </div>
            <ul className="flex flex-col gap-2 mt-4">
                {clients.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                    <li key={i}>
                        <div className="flex flex-row items-center gap-2">
                            <img
                                src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.name}`}
                                alt="avatar" className="w-10 rounded-full"
                            />
                            {c.name}
                        </div>
                    </li>
                ))}
            </ul>
        </form>
    )
}