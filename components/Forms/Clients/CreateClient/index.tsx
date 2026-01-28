'use client'

import { createClient } from "@/server/actions/client.action"
import Link from "next/link"
import { useActionState, useState } from "react"

interface State {
    success?: boolean
    error?: string
}

const initialState: State = {}

export default function FormCreateClient({ classBody, classForm, clients, categories }: any) {
    const [moreAddress, setMoreAddress] = useState(false)
    const [stateCreateClient, formCreateClient] = useActionState(createClient, initialState)

    function formMoreAddress(e: React.ChangeEvent<HTMLInputElement>) {

    }
    return (
        <form action={formCreateClient} className={classBody}>
            <ul className="flex flex-row justify-center gap-2 mt-4">
                {clients.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                    <li key={i}>
                        <div className="flex flex-row items-center cursor-pointer select-none group">
                            <img
                                src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.name}`}
                                alt="avatar" className="z-1 w-10 rounded-full"
                            />
                            <div className="px-2 py-1 pl-6 -ml-5 rounded-r-2xl bg-white group-hover:bg-pink-300">
                                {c.name}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={`
            ${classForm}
            grid
            grid-cols-4
            items-center
            gap-2
            p-2
            mt-4

            [&_.col]:flex
            [&_.col]:flex-col
            [&_.col]:col-span-4
            [&_.col-1]:sm:col-span-1
            [&_.col-2]:sm:col-span-2
            [&_.col-3]:sm:col-span-3
            [&_.col-4]:sm:col-span-4

            [&_.f-label]:pl-2
            [&_.f-label]:text-white

            [&_.campo]:w-full
            [&_.campo]:h-full
            [&_.campo]:p-2
            [&_.campo]:rounded-2xl
            [&_.campo]:bg-pink-50
        `}>
                <div className="col col-3">
                    <label htmlFor="name" className="f-label">Nome</label>
                    <input name="name" id="name" type="text" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="categories" className="f-label">Categoria</label>
                    <select name="category" id="categories" className="campo">
                        {categories.map((c: any, i: number) => (
                            <option key={i} value={c.id_client_category}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-1">
                    <label htmlFor="email" className="f-label">E-Mail</label>
                    <input name="email" id="email" type="email" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="phone" className="f-label">Telefone</label>
                    <input name="phone" id="phone" type="number" min={0} className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="whatsapp" className="f-label">Whatsapp</label>
                    <input name="whatsapp" id="whatsapp" type="number" min={0} className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="birth_date" className="f-label">Aniversário</label>
                    <input name="birth_date" id="birth_date" type="date" className="campo" />
                </div>
                <div className="col">
                    <label htmlFor="details" className="f-label">Detalhes</label>
                    <textarea name="details" id="details" rows={4} className="campo resize-none"></textarea>
                </div>
                <div className="col-4">
                    <label htmlFor="moreAddress" className="block w-fit px-2 py-1 mx-auto rounded-2xl text-pink-800 bg-white cursor-pointer select-none">Cadastrar endereço</label>
                    <input id="moreAddress" hidden type="checkbox" onChange={(e) => setMoreAddress(e.target.checked)} />
                </div>

                <div className={`col-4 grid duration-300 overflow-hidden ${moreAddress ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <p className="h-1000 bg-amber-50">Selecionado</p>
                    </div>
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
                [&_.button]:hover:from-pink-600
                [&_.button]:hover:to-pink-400
                [&_.button]:cursor-pointer
            ">
                <button className="button bg-green-400">Cadastrar</button>
                <Link href='/admin/clientes' className="button bg-amber-400">Cancelar</Link>
            </div>

        </form>
    )
}