'use client'

import { createClientAddress, updateClient } from "@/server/actions/client.action"
import { useActionState, useEffect } from "react"

interface State {
    success?: boolean
    error?: string
}

export default function CreateAddress({ closeModal, client }: { closeModal: Function, client: any }) {
    const birth_date = client.birth_date && new Date(client.birth_date).toISOString().split('T')[0] || ''

    const initialState: State = {}

    const [formState, formAction] = useActionState(createClientAddress, initialState)

    useEffect(() => {
        if(formState.success) closeModal()
        
    },[formState.success])
    
    return (
        <div onMouseDown={(e) => e.stopPropagation()} id="modalChild" className="flex flex-col gap-4 max-w-200 mx-auto p-2 rounded-2xl border-4 border-white bg-pink-400">
            <form action={formAction} className="flex flex-col gap-4">
                <div>
                    <input hidden name="id_client_fk" type="text" defaultValue={client.id_client} />
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
                        <div className="col col-1">
                                <label htmlFor="name" className="f-label">Nome</label>
                                <input name="name" id="name" type="text" placeholder="ex: Casa, Trabalho" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="zip" className="f-label">CEP</label>
                                <input name="zip" id="zip" type="number" min={0} className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="state" className="f-label">Estado</label>
                                <input name="state" id="state" type="text" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="city" className="f-label">Cidade</label>
                                <input name="city" id="city" type="text" className="campo" />
                            </div>
                            <div className="col col-2">
                                <label htmlFor="street" className="f-label">Rua</label>
                                <input name="street" id="street" type="text" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="number" className="f-label">Número</label>
                                <input name="number" id="number" type="number" min={0} className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="district" className="f-label">Bairro</label>
                                <input name="district" id="district" type="text" className="campo" />
                            </div>

                            {/* Condomínio */}
                            <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                                <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Condomínio</div>
                            </div>

                            <div className="col col-1">
                                <label htmlFor="condominium" className="f-label">Nome</label>
                                <input name="condominium" id="condominium" type="text" placeholder="ex: Spazio Beach" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="building_block" className="f-label">Bloco</label>
                                <input name="building_block" id="building_block" type="text" placeholder="ex: 1, 2, A, B" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="unit_number" className="f-label">Número</label>
                                <input name="unit_number" id="unit_number" type="text" placeholder="ex: 1, 2, 2B" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="street" className="f-label">Rua interna</label>
                                <input name="street" id="street" type="text" placeholder="ex: Av. 2, Rua 4" className="campo" />
                            </div>

                            {/* detalhes */}
                            <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                                <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Detalhes do endereço</div>
                            </div>

                            <textarea className="col-4 campo scrollbar-clean resize-none" name="details" rows={7} placeholder="ex: Ao lado da igreja ABC, esquina com a rua abc, deixar na portaria."></textarea>
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
                    <button type="submit">Criar</button>
                    <button onClick={() => closeModal()} type="button">Cancelar</button>
                </div>

            </form>


        </div>
    )
}