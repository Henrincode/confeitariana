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
    const [isPeople, setIsPeople] = useState(!clients.contact_name)
    const [address, setAddress] = useState(false)
    const [stateCreateClient, formCreateClient] = useActionState(createClient, initialState)

    return (
        <form action={formCreateClient} className={classBody}>
            {/* <ul className="flex flex-row justify-center flex-wrap gap-2 mt-4">
                {clients.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                    <li key={i}>
                        <Link className="flex flex-row items-center cursor-pointer select-none group" href={`/admin/cliente/${c.id_client}`}>
                            <img
                                src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.name}`}
                                alt="avatar" className="z-1 w-10 rounded-full"
                            />
                            <div className="px-2 py-1 pl-6 -ml-5 rounded-r-2xl bg-white group-hover:bg-pink-300">
                                {c.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul> */}

            <div className="flex flex-row gap-4 w-fit px-2 pt-2 mx-auto sm:ml-5 mt-6 rounded-t-2xl text-white bg-pink-400">
                <div>
                    <input id="radio-pessoa" name="teste" type="radio" checked={isPeople} onChange={(e) => e.target.checked && setIsPeople(true)} className="accent-pink-600" /> <label htmlFor="radio-pessoa">Pessoa</label>
                </div>
                <div>
                    <input id="radio-empresa" name="teste" type="radio" checked={!isPeople}
                        onChange={(e) => e.target.checked && setIsPeople(false)} className="accent-pink-600" /> <label htmlFor="radio-empresa">Empresa</label>
                </div>
            </div>

            <div className={`
                ${classForm}
                grid
                grid-cols-4
                items-center
                gap-2
                p-2

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

                [&_.f-label]:pl-2
                [&_.f-label]:text-sm
                [&_.f-label]:text-white

                [&_.campo]:w-full
                [&_.campo]:h-full
                [&_.campo]:p-2
                [&_.campo]:rounded-2xl
                [&_.campo]:hover:outline-2
                [&_.campo]:focus:outline-2
                [&_.campo]:outline-pink-500
                [&_.campo]:text-gray-600
                [&_.campo]:bg-white
                [&_.campo]:hover:bg-pink-100
            `}>
                <div className={`col ${isPeople ? 'col-3' : 'col-2'}`}>
                    <label htmlFor="name" className="f-label">{isPeople ? 'Nome' : 'Nome da empresa'}</label>
                    <input name="name" id="name" type="text" className="campo" />
                </div>
                {isPeople || (
                    <div className="col col-1">
                        <label htmlFor="contact_name" className="f-label">Responsável</label>
                        <input name="contact_name" id="contact_name" type="text" className="campo" />
                    </div>
                )}
                <div className="col-4 sm:hidden h-2 mt-2 rounded-full bg-pink-300"></div>
                <div className="col col-1">
                    <label htmlFor="categories" className="f-label">Categoria</label>
                    <select name="category" id="categories" className="campo">
                        {categories.map((c: any, i: number) => (
                            <option key={i} value={c.id_client_category}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-2">
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
                <div className="col col-2">
                    <label htmlFor="cnpj" className="f-label">CNPJ</label>
                    <input name="cnpj" id="cnpj" type="text" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="cpf" className="f-label">CPF</label>
                    <input name="cpf" id="cpf" type="text" className="campo" />
                </div>
                <div className="col col-1">
                    <label htmlFor="birth_date" className="f-label">Aniversário</label>
                    <input name="birth_date" id="birth_date" type="date" className="campo" />
                </div>
                <div className="col col-4">
                    <label htmlFor="details" className="f-label">Detalhes</label>
                    <textarea name="details" id="details" rows={7} placeholder="ex: Alérgico a tal produto, não fica em casa a tarde, esposa de fulano." className="campo resize-none"></textarea>
                </div>

                {/* Endereço */}
                <div className="col col-4 mt-2">
                    <label htmlFor="createAddress" className="block w-fit px-2 py-1 mx-auto rounded-2xl text-pink-800 bg-white cursor-pointer select-none">
                        Cadastrar endereço agora?
                    </label>
                    <input id="createAddress" name="createAddress" hidden type="checkbox" onChange={(e) => setAddress(e.target.checked)} />
                </div>

                <div className={`col-4 grid duration-300 ${address ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden -m-2 p-2">

                        <div className="grid grid-cols-4 items-center gap-2">
                            <div className="col col-1">
                                <label htmlFor="address_name" className="f-label">Nome</label>
                                <input name="address_name" id="address_name" type="text" placeholder="ex: Casa, Trabalho" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="address_zip" className="f-label">CEP</label>
                                <input name="address_zip" id="address_zip" type="number" min={0} className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="address_state" className="f-label">Estado</label>
                                <input name="address_state" id="address_state" type="text" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="address_city" className="f-label">Cidade</label>
                                <input name="address_city" id="address_city" type="text" className="campo" />
                            </div>
                            <div className="col col-2">
                                <label htmlFor="address_street" className="f-label">Rua</label>
                                <input name="address_street" id="address_street" type="text" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="address_number" className="f-label">Número</label>
                                <input name="address_number" id="address_number" type="number" min={0} className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="address_district" className="f-label">Bairro</label>
                                <input name="address_district" id="address_district" type="text" className="campo" />
                            </div>

                            {/* Condomínio */}
                            <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                                <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Condomínio</div>
                            </div>

                            <div className="col col-1">
                                <label htmlFor="cond_name" className="f-label">Nome</label>
                                <input name="cond_name" id="cond_name" type="text" placeholder="ex: Spazio Beach" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="cond_building_block" className="f-label">Bloco</label>
                                <input name="cond_building_block" id="cond_building_block" type="text" placeholder="ex: 1, 2, A, B" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="cond_unit_number" className="f-label">Número</label>
                                <input name="cond_unit_number" id="cond_unit_number" type="text" placeholder="ex: 1, 2, 2B" className="campo" />
                            </div>
                            <div className="col col-1">
                                <label htmlFor="cond_street" className="f-label">Rua interna</label>
                                <input name="cond_street" id="cond_street" type="text" placeholder="ex: Av. 2, Rua 4" className="campo" />
                            </div>

                            {/* detalhes */}
                            <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                                <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Detalhes do endereço</div>
                            </div>

                            <textarea className="col-4 campo resize-none" name="details" rows={7} placeholder="ex: Ao lado da igreja ABC, esquina com a rua abc, deixar na portaria."></textarea>
                        </div>
                    </div>
                </div>
            </div>


            <div className="
                flex
                flex-row
                justify-center
                sm:justify-start
                gap-2
                mt-2
                sm:pl-5aa

                [&_.button]:block
                [&_.button]:px-2
                [&_.button]:py-1
                [&_.button]:rounded-md
                [&_.button]:outline-2
                [&_.button]:outline-pink-700/60
                [&_.button]:hover:outline-pink-700
                [&_.button]:text-pink-900
                [&_.button]:hover:text-pink-700
                [&_.button]:bg-pink-300
                [&_.button]:hover:bg-pink-400
                [&_.button]:cursor-pointer
            ">
                <button className="button bg-green-400">Cadastrar cliente</button>
                <Link href='/admin/clientes' className="button bg-amber-400">Cancelar</Link>
            </div>

        </form>
    )
}