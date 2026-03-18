'use client'

import { createClient } from "@/server/actions/client.action"
import { ClientType } from "@/types/client.types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Params {
    types: ClientType[]
}

export default function ClientView({ types }: Params) {

    const router = useRouter()

    const [error, setError] = useState(false)

    const [name, setName] = useState('')
    const [selectType, setSelectType] = useState<string>('')
    const [contactName, setContactName] = useState<string>('')

    async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name.length < 3 || (selectType !== '1' && contactName.length < 3)) {
        setError(true)
        return
    }

    // Transforma o elemento e formData
    const formData = new FormData(e.currentTarget);
    const response = await createClient(formData);

    if (response.success) {
        router.push(`/admin/cliente/${response.data.id_client}`);
    }
}

    return (
        <form onSubmit={submit} className="box flex flex-col items-center gap-6">

            <div className="max-w-100 w-full">
                <p className="text-center text-gray-600">Nome da pessoa / entidade</p>
                <input onInput={(e) => setName(e.currentTarget.value)} value={name} type="text" placeholder="Insira o nome"
                    name="name" className="max-w-100 w-full p-2 rounded-full text-2xl text-center bg-pink-300 text-gray-800"
                />
            </div>

            <div className="max-w-100 w-full">
                <p className="text-center text-gray-600">Esta cadastrando? {selectType}</p>

                <select onChange={(e) => setSelectType(e.currentTarget.value)} value={selectType}
                    name="id_client_type_fk" className="max-w-100 w-full p-2 rounded-full text-2xl text-center bg-pink-300 text-gray-800"
                >
                    <option hidden disabled value=''>Tipo de pessoa</option>

                    {types.map(t => <option key={t.id_client_type} value={String(t.id_client_type)}>{t.name}</option>)}
                </select>
            </div>

            {Number(selectType) > 1 && (
                <div className="max-w-100 w-full">
                    <p className="text-center text-gray-600">Nome do/a responsável (não obrigatório)</p>
                    <input onInput={(e) => setContactName(e.currentTarget.value)} value={contactName} type="text" placeholder="Insira o nome"
                        name="contact_name" className="max-w-100 w-full p-2 rounded-full text-2xl text-center bg-pink-300 text-gray-800"
                    />
                </div>
            )}

            <button
                type="submit"
                disabled={name.length < 3 || selectType === '' || (Number(selectType) > 1 && contactName.length < 3)}
                className={`${(name.length < 3 || selectType === '' || (Number(selectType) > 1 && contactName.length < 3)) ? 'opacity-50' : 'hover:bg-pink-600'} p-2 rounded-lg bg-pink-500 text-white cursor-pointer transition-all`}
            >
                Cadastrar
            </button>

            {/* <button type="submit" disabled={
                contactName
                    ? (name.length < 3 || selectType === '' && contactName === '' || contactName.length < 3)
                    : (name.length < 3 || selectType === '')
            }
                className={`${(name.length < 3 || selectType === '' && contactName === '' || contactName.length < 3) && 'opacity-50'} p-2 rounded-lg bg-pink-500 text-white`}
            >
                Cadastrar
            </button> */}

            {error && (
                <p className="text-red-500">
                    Nome precisa ter ao menos 3 letras
                </p>
            )}
        </form>
    )
}   