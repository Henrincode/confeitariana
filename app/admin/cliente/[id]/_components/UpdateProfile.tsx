'use client'

import { updateClient } from "@/server/actions/client.action"
import { ClientDB } from "@/types/client.types"
import { useActionState, useEffect, useState } from "react"

interface Params {
    closeModal: Function
    client: ClientDB
}

export default function UpdateProfile({ closeModal, client }: Params) {



    const [errors, setErrors] = useState<Record<string, string[]> | null>()

    const [inputName, setInputName] = useState<string>('')
    const [inputContactName, setInputContactName] = useState<string>('')
    const [inputCPF, setInputCPF] = useState<string>('')
    const [inputCNPJ, setInputCNPJ] = useState<string>('')
    const [inputEmail, setInputEmail] = useState<string>('')
    const [inputPhone, setInputPhone] = useState<string>('')
    const [inputWhatsapp, setInputWhatsapp] = useState<string>('')
    const [inputBirtDate, setInputBirtDate] = useState<string>('')
    const [inputDetails, setInputDetails] = useState<string>('')

    useEffect(() => {
        formDefault()
    }, [])

    async function formDefault() {

        setErrors(null)
        
        setInputName(client.name)
        setInputContactName(client.contact_name || '')
        setInputCPF(client.cpf || '')
        setInputCNPJ(client.cnpj || '')
        setInputEmail(client.email || '')
        setInputPhone(client.phone || '')
        setInputWhatsapp(client.whatsapp || '')
        setInputDetails(client.details || '')

        const birth_date = client.birth_date && new Date(client.birth_date).toISOString().split('T')[0] || ''
        setInputBirtDate(birth_date)

    }

    function removeError(error: string) {
        const list = errors
        if (!list) return
        delete list[error]
        setErrors(list)
    }

    async function submit(formData: FormData) {
        const response = await updateClient(formData)
        if (!response.success) {
            setErrors(response.errors)
            return
        }
        closeModal()
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()} id="modalChild" className="flex flex-col gap-4 max-w-200 mx-auto p-2 rounded-2xl border-4 border-white bg-pink-400">
            <form action={submit} className="flex flex-col gap-4">
                <div>
                    <input hidden name="id_client" type="text" defaultValue={client.id_client} />
                    <input hidden name="id_client_category_fk" type="text" defaultValue={client.id_client_type_fk} />
                    {/* <input hidden name="image_url" type="text" defaultValue={client.image_url || null} /> */}
                    <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-4
                    items-start
                    gap-2

                    [&_.col]:flex
                    [&_.col]:flex-col
                    [&_.col-1]:col-span-1
                    [&_.col-1]:sm:col-span-1
                    [&_.col-2]:col-span-1
                    [&_.col-2]:sm:col-span-2
                    [&_.col-3]:col-span-1
                    [&_.col-3]:sm:col-span-3
                    [&_.col-4]:col-span-1
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

                    [&_.error]:ring-2
                    [&_.error]:ring-red-500
                    [&_.error]:bg-red-300
                ">
                        <div className="col col-2">
                            <label className="f-label" htmlFor="f-name">Nome</label>
                            <input
                                onInput={(e) => { setInputName(e.currentTarget.value); removeError('name') }} value={inputName}
                                id="f-name" name="name" type="text" className={`${errors?.name && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-email">E-Mail</label>
                            <input
                                onInput={(e) => { setInputEmail(e.currentTarget.value); removeError('email') }} value={inputEmail}
                                id="f-email" name="email" type="text" className={`${errors?.email && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-cpf">CPF</label>
                            <input
                                onInput={(e) => { setInputCPF(e.currentTarget.value); removeError('cpf') }} value={inputCPF}
                                id="f-cpf" name="cpf" type="text" className={`${errors?.cpf && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-cnpj">CNPJ</label>
                            <input
                                onInput={(e) => { setInputCNPJ(e.currentTarget.value); removeError('cnpj') }} value={inputCNPJ}
                                id="f-cnpj" name="cnpj" type="text" className={`${errors?.cnpj && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-phone">Telefone</label>
                            <input
                                onInput={(e) => { setInputPhone(e.currentTarget.value); removeError('phone') }} value={inputPhone}
                                id="f-phone" name="phone" type="number" className={`${errors?.phone && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="whatsapp">Whatsapp</label>
                            <input
                                onInput={(e) => { setInputWhatsapp(e.currentTarget.value); removeError('whatsapp') }} value={inputWhatsapp}
                                id="f-whatsapp" name="whatsapp" type="number" className={`${errors?.whatsapp && 'error'} campo`}
                            />
                        </div>

                        <div className="col">
                            <label className="f-label" htmlFor="f-birthday">Aniversário</label>
                            <input
                                onInput={(e) => { setInputBirtDate(e.currentTarget.value); removeError('birth_date') }} value={inputBirtDate}
                                id="f-birthday" name="birth_date" type="date" className={`${errors?.birth_date && 'error'} campo`}
                            />
                        </div>

                        <div className="col-4 flex flex-col">
                            <label className="f-label" htmlFor="f-details">Detalhes</label>
                            <textarea
                                onInput={(e) => { setInputDetails(e.currentTarget.value); removeError('details') }} value={inputDetails}
                                id="details" name="details" rows={10} className="campo resize-none scrollbar-clean" ></textarea>
                        </div>
                    </div>
                </div>


                <div className="h-1 rounded-full bg-pink-50/50"></div>

                {errors && (
                    <div className="flex flex-col gap-1 max-w-100 w-full mx-auto bg-red-100 p-3 rounded-xl">
                        {Object.entries(errors).map(([field, messages]) => (
                            <div key={field} className="text-xs text-red-600">
                                <strong>{field}:</strong> {messages.join(", ")}
                            </div>
                        ))}
                    </div>
                )}

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
                    <button onClick={formDefault} type="button">Desfazer</button>
                    <button onClick={() => closeModal()} type="button">Cancelar</button>
                </div>

            </form>


        </div>
    )
}