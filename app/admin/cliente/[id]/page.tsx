import clientService from "@/server/services/client.service"
import Link from "next/link"
import { FaAddressCard, FaEdit, FaFingerprint, FaUserCircle } from "react-icons/fa"
import { IoMdFingerPrint } from "react-icons/io"
import { IoArrowBack } from "react-icons/io5"
import { RiContactsBookFill } from "react-icons/ri"

interface Props {
    params: Promise<{ id: string }>
}

export default async function ClientePage({ params }: Props) {
    const { id: idString } = await params
    const id = Number(idString)
    const client = await clientService.findById(id)
    return (
        <div id="clientePerfil" className="box">
            {/* <div className="flex flex-row justify-between items-center px-10">
                <p className="text-6xl text-pink-500">Perfil de cliente</p>
                <Link href="../clientes" className="flex flex-row items-center px-2 py-1 rounded-lg text-2xl text-pink-500 bg-pink-200 border border-pink-500/70">
                    <IoArrowBack /> Voltar à lista
                </Link>

            </div> */}

            <div className="mt-6 rounded-t-4xl rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden" >
                <div className="flex flex-row justify-between items-center gap-10 p-10 bg-pink-400">
                    <img
                        src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${client.name}`}
                        alt="avatar" className="w-50 border-4 shadow-lg shadow-black/30 border-white rounded-full"
                    />
                    <div id="nome" className="flex-1">
                        <div className="flex flex-row items-center gap-2 text-6xl text-white">
                            <div className="text-shadow-lg text-shadow-black/20">{client.name}</div>
                            <div className="px-2 py-1 rounded-full font-semibold text-sm text-white bg-pink-500">{client.category}</div>
                        </div>
                        <div className="flex flex-row items-center gap-2 text-2xl text-pink-900">
                            <FaFingerprint /> id: {client.id_client}
                        </div>
                    </div>
                    <Link href={`./${id}/editar`} className="flex self-start flex-row items-center gap-2 px-6 py-1 rounded-full text-xl text-white bg-pink-500">
                        <FaEdit /> Editar
                    </Link>
                </div>

                <div className="bg-white">

                    {/* Dados */}
                    <div className="
                        grid
                        grid-cols-3
                        gap-10
                        px-10
                        py-5

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
                        [&_.list-info]:
                    ">

                        {/* Dados Pessoais */}
                        <div>
                            <div className="list-tittle"><FaUserCircle /> Dados Pessoais</div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">NOME{client.contact_name && " DA EMPRESA"}</div>
                                    <div className="list-info">{client.name}</div>
                                </li>
                                {client.contact_name && (
                                    <li>
                                        <div className="list-subtittle">NOME DO CONTATO</div>
                                        <div className="list-info">{client.contact_name}</div>
                                    </li>
                                )}
                                <li>
                                    <div className="list-subtittle">DATA DE NASCIMENTO</div>
                                    <div className="list-info">{client.birth_date ? new Date(client.birth_date).toLocaleDateString(navigator.language, { timeZone: 'UTC' }) : 'Não informado'}</div>
                                </li>
                            </ul>

                        </div>

                        {/* Documentação */}
                        <div>
                            <div className="list-tittle"><FaAddressCard /> Documentos</div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">CPF</div>
                                    <div className="list-info">{client.cpf ? client.cpf : 'Não informado'}</div>
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
                        <div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}