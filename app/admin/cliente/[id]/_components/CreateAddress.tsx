'use client'

import { createClientAddress, updateClientAddress } from "@/server/actions/client.action"
import { Client, ClientAddress } from "@/types/client.types"
import { useEffect, useState } from "react"

interface Params {
    closeModal: Function
    client: Client
    address: ClientAddress | null
}

export default function CreateAddress({ closeModal, client, address }: Params) {

    const [errors, setErrors] = useState<Record<string, string[]> | null>()

    const [name, setName] = useState<string>('')
    const [zip, setZip] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [district, setDistrict] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')

    const [condominium, setCondominium] = useState<string>('')
    const [buildingBlock, setBuildingBlock] = useState<string>('')
    const [unitNumber, setUnitNumber] = useState<string>('')
    const [internalStreet, setInternalStreet] = useState<string>('')
    const [details, setDetails] = useState<string>('')

    useEffect(() => {
        formDefault()
    }, [])

    async function formDefault() {
        setErrors(null);

        if (address) {
            // Modo Edição: Preenche com os dados do endereço
            setName(address.name || '');
            setZip(address.zip || '');
            setNumber(address.number || '');
            setStreet(address.street || '');
            setDistrict(address.district || '');
            setCity(address.city || '');
            setState(address.state || '');
            setCondominium(address.condominium || '');
            setBuildingBlock(address.building_block || '');
            setUnitNumber(address.unit_number || '');
            setInternalStreet(address.internal_street || '');
            setDetails(address.details || '');
        } else {
            // Modo Criação: Limpa todos os campos (Reset)a o ID do cliente pronto
            setName('');
            setZip('');
            setNumber('');
            setStreet('');
            setDistrict('');
            setCity('');
            setState('');
            setCondominium('');
            setBuildingBlock('');
            setUnitNumber('');
            setInternalStreet('');
            setDetails('');
        }
    }

    function removeError(error: string) {
        const list = errors
        if (!list) return
        delete list[error]
        setErrors(list)
    }

    async function submit(formData: FormData) {
        // 1. Se existir 'address', chama update, senão chama create.
        const action = address ? updateClientAddress : createClientAddress;

        // 2. Executa a ação
        const response = await action(formData);

        // 3. Tratamento de erro (validação do Zod no server)
        if (!response.success) {
            setErrors(response.errors);
            return;
        }

        // 4. Sucesso! Fecha o modal
        closeModal();
    }

        async function reqZip(z: string) {
            if(z.length > 8) return
            setZip(z)
            if (z.length === 8) {
                const response = await fetch(`https://viacep.com.br/ws/${z}/json/`)
                if(!response.ok) {console.log('errou');return}
                const data = await response.json()

                setStreet(data.logradouro);
                setDistrict(data.bairro);
                setCity(data.localidade);
                setState(data.estado);
            }
        }

    return (
        <div onMouseDown={(e) => e.stopPropagation()} id="modalChild" className="flex flex-col gap-4 max-w-200 mx-auto p-2 rounded-2xl border-4 border-white bg-pink-400">
            <form action={submit} className="flex flex-col gap-4">
                <div>
                    <input hidden name="id_client_fk" type="text" defaultValue={client.id_client} />
                    <input hidden name="id_client_address" type="text" defaultValue={address?.id_client_address || ''} />
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

                    [&_.error]:ring-2
                    [&_.error]:ring-red-500
                    [&_.error]:bg-red-300
                ">
                        <div className="col col-1">
                            <label htmlFor="name" className="f-label">Nome</label>
                            <input
                                onInput={(e) => setName(e.currentTarget.value)} value={name}
                                name="name" id="name" type="text" placeholder="ex: Casa, Trabalho" className={`${errors?.name && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="zip" className="f-label">CEP</label>
                            <input
                                onInput={(e) => reqZip(e.currentTarget.value)} value={zip}
                                name="zip" id="zip" type="number" className={`${errors?.zip && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="state" className="f-label">Estado</label>
                            <input
                                onInput={(e) => setState(e.currentTarget.value)} value={state}
                                name="state" id="state" type="text" className={`${errors?.state && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="city" className="f-label">Cidade</label>
                            <input
                                onInput={(e) => setCity(e.currentTarget.value)} value={city}
                                name="city" id="city" type="text" className={`${errors?.city && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-2">
                            <label htmlFor="street" className="f-label">Rua</label>
                            <input
                                onInput={(e) => setStreet(e.currentTarget.value)} value={street}
                                name="street" id="street" type="text" className={`${errors?.street && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="number" className="f-label">Número</label>
                            <input
                                onInput={(e) => setNumber(e.currentTarget.value)} value={number}
                                name="number" id="number" type="number" min={0} className={`${errors?.number && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="district" className="f-label">Bairro</label>
                            <input
                                onInput={(e) => setDistrict(e.currentTarget.value)} value={district}
                                name="district" id="district" type="text" className={`${errors?.district && 'error'} campo`}
                            />
                        </div>

                        {/* Condomínio */}
                        <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                            <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Condomínio</div>
                        </div>

                        <div className="col col-1">
                            <label htmlFor="condominium" className="f-label">Nome</label>
                            <input
                                onInput={(e) => setCondominium(e.currentTarget.value)} value={condominium}
                                name="condominium" id="condominium" type="text" placeholder="ex: Spazio Beach" className={`${errors?.condominium && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="building_block" className="f-label">Bloco</label>
                            <input
                                onInput={(e) => setBuildingBlock(e.currentTarget.value)} value={buildingBlock}
                                name="building_block" id="building_block" type="text" placeholder="ex: 1, 2, A, B" className={`${errors?.building_block && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="unit_number" className="f-label">Número</label>
                            <input
                                onInput={(e) => setUnitNumber(e.currentTarget.value)} value={unitNumber}
                                name="unit_number" id="unit_number" type="text" placeholder="ex: 1, 2, 2B" className={`${errors?.unit_number && 'error'} campo`}
                            />
                        </div>
                        <div className="col col-1">
                            <label htmlFor="internal_street" className="f-label">Rua interna</label>
                            <input
                                onInput={(e) => setInternalStreet(e.currentTarget.value)} value={internalStreet}
                                name="internal_street" id="internal_street" type="text" placeholder="ex: Av. 2, Rua 4" className={`${errors?.internal_street && 'error'} campo`}
                            />
                        </div>

                        {/* detalhes */}
                        <div className="col col-4 mt-6 rounded-bl-md border-b-2 border-pink-300 overflow-hidden">
                            <div className="w-fit px-2 py-1 rounded-t-xl text-white bg-pink-300">Detalhes do endereço</div>
                        </div>

                        <textarea
                            onInput={(e) => setDetails(e.currentTarget.value)} value={details}
                            className="col-4 campo scrollbar-clean resize-none" name="details" rows={7} placeholder="ex: Ao lado da igreja ABC, esquina com a rua abc, deixar na portaria."
                        >
                        </textarea>
                    </div>
                </div>


                <div className="h-1 rounded-full bg-pink-50/50"></div>

                {errors && (
                    <div className="flex flex-col gap-1 max-w-100 w-full mx-auto bg-red-100 p-3 rounded-xl">
                        {Object.entries(errors).map(([field, messages]) => (
                            <div key={field} className="text-xs text-red-600">
                                <strong>{
                                    field === 'name' && 'nome' || field === 'zip' && 'CEP' || field
                                }:</strong> {messages.join(", ")}
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
                    <button type="submit">
                        {address ? 'Atualizar' : 'Cadastrar'}
                    </button>
                    <button onClick={formDefault} type="button">Desfazer</button>
                    <button onClick={() => closeModal()} type="button">Cancelar</button>
                </div>

            </form>


        </div>
    )
}