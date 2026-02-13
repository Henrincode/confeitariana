'use client'

import { updateClient } from "@/server/actions/client.action"
import { useActionState, useEffect } from "react"

interface State {
    success?: boolean
    error?: string
}

export default function UpdateProfile({ closeModal, client }: { closeModal: Function, client: any }) {
    const birth_date = client.birth_date && new Date(client.birth_date).toISOString().split('T')[0] || ''

    const initialState: State = {}

    const [formState, formAction] = useActionState(updateClient, initialState)

    useEffect(() => {
        if (formState.success) closeModal()
    }, [formState.success])

    return (
        <div onMouseDown={(e) => e.stopPropagation()} id="modalChild" className="flex flex-col gap-4 max-w-200 mx-auto p-2 rounded-2xl border-4 border-white bg-pink-400">
            <form action={formAction} className="flex flex-col gap-4">
                <div>
                    <input hidden name="id_client" type="text" defaultValue={client.id_client} />
                    <input hidden name="id_client_category_fk" type="text" defaultValue={client.id_client_category_fk} />
                    <input hidden name="image_url" type="text" defaultValue={client.image_url || null} />
                    <div className="
                    grid
                    grid-cols-4
                    items-start
                    gap-2

                    [&_.col]:flex
                    [&_.col]:flex-col
                    [&_.col-1]:col-span-4
                    [&_.col-1]:sm:col-span-1
                    [&_.col-2]:col-span-4
                    [&_.col-2]:sm:col-span-2
                    [&_.col-3]:col-span-4
                    [&_.col-3]:sm:col-span-3
                    [&_.col-4]:col-span-4
                    [&_.col-4]:sm:col-span-4

                    [&_.f-label]:w-fit
                    [&_.f-label]:pl-2
                    [&_.f-label]:text-sm
                    [&_.f-label]:text-white

                    [&_.campo]:w-full
                    [&_.campo]:h-fit
                    [&_.campo]:p-2
                    [&_.campo]:rounded-2xl
                    [&_.campo]:hover:outline-2
                    [&_.campo]:focus:outline-2
                    [&_.campo]:outline-pink-500
                    [&_.campo]:text-gray-600
                    [&_.campo]:bg-white
                    [&_.campo]:hover:bg-pink-100
                ">
                        <div className="col col-2">
                            <label className="f-label" htmlFor="f-name">Nome</label>
                            <input id="f-name" className="campo" name="name" type="text" defaultValue={client.name} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-email">E-Mail</label>
                            <input id="f-email" className="campo" name="email" type="text" defaultValue={client.email} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-cpf">CPF</label>
                            <input id="f-cpf" className="campo" name="cpf" type="text" defaultValue={client.cpf} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-cnpj">CNPJ</label>
                            <input id="f-cnpj" className="campo" name="cnpj" type="text" defaultValue={client.cnpj} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-phone">Telefone</label>
                            <input id="f-phone" className="campo" name="phone" type="number" defaultValue={client.phone} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="whatsapp">Whatsapp</label>
                            <input id="f-whatsapp" className="campo" name="whatsapp" type="number" defaultValue={client.whatsapp} />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-birthday">Aniversário {birth_date}</label>
                            <input id="f-birthday" className="campo" name="birth_date" type="date" defaultValue={birth_date} />
                        </div>

                        <div className="col-4 flex flex-col">
                            <label className="f-label" htmlFor="f-details">Detalhes</label>
                            <textarea className="campo resize-none scrollbar-clean" name="details" id="details" rows={10} defaultValue={client.details}></textarea>
                        </div>
                    </div>
                </div>


                <div className="h-1 rounded-full bg-pink-50/50"></div>

                <div className="
                    flex
                    flex-row
                    justify-center
                    gap-4
                    mb-2

                    [&_button]:px-2
                    [&_button]:py-1
                    [&_button]:border-2
                    [&_button]:border-white/80
                    [&_button]:rounded-xl
                    [&_button]:text-sm
                    [&_button]:text-white
                    [&_button]:bg-pink-500
                    [&_button]:hover:bg-pink-800
                    [&_button]:cursor-pointer
                    [&_button]:transition-all
                ">
                    <button type="submit">Atualizar</button>
                    <button onClick={() => closeModal()} type="button">Cancelar</button>
                </div>

            </form>


        </div>
    )
}