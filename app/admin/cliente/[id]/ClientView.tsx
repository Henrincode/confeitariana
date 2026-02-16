'use client'

import { useEffect, useState } from "react"
import { CgDetailsMore } from "react-icons/cg"
import { FaAddressCard, FaEdit, FaUserCircle } from "react-icons/fa"
import { RiContactsBookFill } from "react-icons/ri"
import { MdDelete } from "react-icons/md"
import UpdateImage from "./_components/UpdateImage"
import UpdateProfile from "./_components/UpdateProfile"
import DeleteProfile from "./_components/DeleteProfile"
import CreateAddress from "./_components/CreateAddress"

export default function ClientView({ idPage, client }: any) {
    const [editing, setEditing] = useState('a')
    const [value, setValue] = useState('')
    const [botao, setBotao] = useState('b')
    const [modal, setModal] = useState('')

    // Modal
    function openModal(typeModal: string) {
        setModal(typeModal);
    }

    function closeModal() {
        setModal('');
    }

    useEffect(() => {
        if (modal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Limpeza ao desmontar o componente
        return () => document.body.classList.remove('overflow-hidden');
    }, [modal]); // Ele "observa" o estado modal

    return (
        <div id="clientePerfil" className="box pb-10">
            {modal && (
                <div onMouseDown={closeModal} id="modal" className="fixed flex z-10 top-0 left-0 justify-center items-center h-dvh w-full bg-black/30 backdrop-blur-xl">
                    <div className="overflow-auto px-3 py-10 w-full max-h-dvh">
                        {modal === 'delete' && <DeleteProfile closeModal={closeModal} client={client} />}
                        {modal === 'profile' && <UpdateProfile closeModal={closeModal} client={client} />}
                        {modal === 'address' && <CreateAddress closeModal={closeModal} client={client} />}
                    </div>
                </div>
            )}

            <div className="rounded-t-4xl rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden" >
                <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-10 p-5 pb-10 sm:p-10 bg-pink-400">

                    <UpdateImage clientId={client.id_client} name={client.name} image={client.image_url} />

                    <div onClick={() => openModal('delete')} className="
                        absolute
                        top-3
                        right-3
                        md:top-10
                        md:right-10

                        flex
                        flex-row
                        items-center
                        px-4
                        py-1
                        border-2
                        md:border-4
                        rounded-full
                        text-xl
                        whitespace-nowrap

                        border-amber-100
                        text-white
                        bg-pink-500
                        hover:bg-pink-800

                        cursor-pointer
                        transition-all
                        select-none
                    ">
                        <MdDelete /> <span className="hidden md:block">apagar</span>
                    </div>

                    <div id="name" className="flex-1 flex flex-col items-center sm:items-start">
                        <div className="flex flex-col items-center sm:items-start flex-wrap gap-2 text-white">
                            <div className="px-2 py-1 border-2 border-amber-100 rounded-full font-semibold text-sm text-white bg-pink-500">{client.category}</div>
                            <div className="text-3xl sm:text-6xl text-center sm:text-start text-shadow-lg text-shadow-black/20">{client.name}</div>
                        </div>
                    </div>
                    {/* <div className="sm:absolute sm:top-5 sm:right-5 flex sm:self-start flex-row items-center gap-2 px-6 py-1 rounded-full text-xl text-white bg-pink-500"> */}




                    <div onClick={() => openModal('profile')} className="
                        absolute
                        left-1/2
                        bottom-0
                        -translate-x-1/2
                        translate-y-1/2

                        flex
                        flex-row
                        items-center
                        gap-2
                        px-4
                        py-1
                        border-4
                        rounded-full
                        text-xl
                        whitespace-nowrap

                        text-white
                        bg-pink-500
                        hover:bg-pink-800

                        cursor-pointer
                        transition-all
                        select-none
                    ">
                        <FaEdit /> Editar perfil
                    </div>
                </div>

                <div className="bg-white">

                    {/* Dados */}
                    <div className="
                        grid
                        grid-cols-3
                        gap-10
                        px-5
                        py-8
                        pb-5
                        sm:px-10
                        sm:py-8
                        sm:pb-10

                        [&_.col-1]:col-span-3
                        [&_.col-1]:md:col-span-1
                        [&_.col-2]:col-span-3
                        [&_.col-2]:md:col-span-2
                        [&_.col-3]:col-span-3
                        [&_.col-3]:md:col-span-3

                        [&_ul]:flex
                        [&_ul]:flex-col
                        [&_ul]:gap-4

                        [&_.list-tittle]:flex
                        [&_.list-tittle]:flex-row
                        [&_.list-tittle]:items-center
                        [&_.list-tittle]:gap-2
                        [&_.list-tittle]:pb-2
                        [&_.list-tittle]:mb-2
                        [&_.list-tittle]:border-b
                        [&_.list-tittle]:font-semibold
                        [&_.list-tittle]:border-pink-200
                        [&_.list-tittle]:text-pink-800

                        [&_.list-subtittle]:font-semibold
                        [&_.list-subtittle]:text-pink-500
                        [&_.list-subtittle]:

                        [&_.list-info]:text-gray-700

                        [&_input.list-info]:w-full
                        [&_input.list-info]:p-2
                        [&_input.list-info]:rounded-lg
                        [&_input.list-info]:outline-2
                        [&_input.list-info]:outline-pink-500
                        [&_input.list-info]:bg-white
                        [&_input.list-info]:hover:bg-pink-100
                    ">

                        {/* Dados Pessoais */}
                        <div className="col-1 group">


                            <div className="list-tittle justify-between flex-wrap-reverse sm:flex-wrap">
                                <div className="flex flex-row items-center gap-2"><FaUserCircle /> Dados Pessoais</div>

                            </div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">NOME{client.contact_name && " DA EMPRESA"}</div>
                                    <div onClick={() => { setEditing('name'); setValue(client.name || '') }} className="list-info">{client.name}</div>

                                </li>
                                {client.id_client_category_fk > 1 && (
                                    <li>
                                        <div className="list-subtittle">CONTATO</div>
                                        <div className="list-info">{client.contact_name || 'Não informado'}</div>
                                    </li>
                                )}
                                <li>
                                    <div className="list-subtittle">DATA DE NASCIMENTO</div>
                                    <div className="list-info">{client.birth_date ? new Date(client.birth_date).toLocaleDateString(navigator.language, { timeZone: 'UTC' }) : 'Não informado'}</div>
                                </li>
                            </ul>

                        </div>

                        {/* Documentação */}
                        <div className="col-1">
                            <div className="list-tittle"><FaAddressCard /> Documentos</div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">CPF</div>
                                    <div onClick={() => { setEditing('cpf'); setValue(client.cpf || '') }} className="list-info">{client.cpf ? client.cpf : 'Não informado'}</div>
                                </li>
                                <li>
                                    <div className="list-subtittle">CNPJ</div>
                                    <div className="list-info">{client.cnpj ? client.cnpj : 'Não informado'}</div>
                                </li>
                                <li>
                                    <div className="list-subtittle">Conta criada</div>
                                    <div className="list-info">{new Date(client.created_at).toLocaleDateString(navigator.language, { timeZone: 'UTC' })}</div>
                                </li>
                            </ul>
                        </div>

                        {/* Contatos */}
                        <div className="col-1">
                            <div className="list-tittle"><RiContactsBookFill /> Contatos</div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">E-MAIL</div>
                                    <div className="list-info">{client.email ? client.email : 'Não informado'}</div>
                                </li>
                                <li>
                                    <div className="list-subtittle">TELEFONE</div>
                                    <div className="list-info">{client.phone ? client.phone : 'Não informado'}</div>
                                </li>
                                <li>
                                    <div className="list-subtittle">WHATSAPP</div>
                                    <div className="list-info">{client.whatsapp ? client.whatsapp : 'Não informado'}</div>
                                </li>
                            </ul>
                        </div>

                        {/* Detalhes */}
                        <div className="col-3">
                            <div className="list-tittle"><CgDetailsMore /> Detalhes</div>
                            <div className={`${client.details || 'flex flex-row justify-center items-center'} min-h-20 p-2 mt-4 border-2 rounded-xl font-light text-sm sm:text-xl text-gray-600 border-pink-500/50 bg-pink-50 whitespace-pre-line`}>
                                {client.details ? client.details : "Nada informado."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* address */}
            <div className=" p-5 sm:px-10 mt-10 rounded-xl shadow-2xl shadow-black/50 bg-white">
                <div className="mb-4">Endereço</div>
                <ul className={`${client.addresses.length ? "grid grid-cols-1 md:grid-cols-4" : "flex justify-center mb-4"} gap-4`}>
                    {client.addresses.map((a: any, i: number) => (
                        <li key={i} className="p-2 rounded-lg ring-2 text-gray-600 ring-pink-500/50 bg-pink-50">
                            {a.name} <br /> {a.number && `${a.number}, `}{a.street}
                        </li>
                    ))}
                    {client.addresses.length < 4 && (
                        <div className="flex justify-center items-center">
                            <div onClick={() => openModal('address')} className="px-2 py-1 rounded-full ring-2 font-semibold text-sm ring-pink-800/80 text-white bg-pink-400">
                                Adicionar {`${client.addresses.length + 1} de 4`}
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}