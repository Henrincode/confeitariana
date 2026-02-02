import clientService from "@/server/services/client.service"
import Link from "next/link"
import { CgDetailsMore } from "react-icons/cg"
import { FaAddressCard, FaEdit, FaUserCircle } from "react-icons/fa"
import { RiContactsBookFill } from "react-icons/ri"
import UpdateImage from "./_components/updateImage"

interface Props {
    params: Promise<{ id: string }>
}

export default async function ClientePage({ params }: Props) {
    const { id: idString } = await params
    const id = Number(idString)
    const client = await clientService.findById(id)
    return (
        <div id="clientePerfil" className="box pb-10">

            <div className="rounded-t-4xl rounded-b-xl shadow-2xl shadow-black/50 overflow-hidden" >
                <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-10 p-5 sm:p-10 bg-pink-400">
                    <UpdateImage clientId={client.id_client} name={client.name} image={client.image_url} />
                    <div id="name" className="flex-1 flex flex-col items-center sm:items-start">
                        <div className="flex flex-col items-center sm:items-start flex-wrap gap-2 text-white">
                            <div className="px-2 py-1 rounded-full font-semibold text-sm text-white bg-pink-500">{client.category}</div>
                            <div className="text-3xl sm:text-6xl text-center sm:text-start text-shadow-lg text-shadow-black/20">{client.name}</div>
                        </div>
                        {/* <div className="hidden sm:flex flex-row items-center gap-2 sm:text-2xl text-pink-900">
                            <FaFingerprint /> id: {client.id_client}
                        </div> */}
                    </div>
                    <Link href={`./${id}/editar`} className="sm:absolute sm:top-5 sm:right-5 flex sm:self-start flex-row items-center gap-2 px-6 py-1 rounded-full text-xl text-white bg-pink-500">
                        <FaEdit /> Editar
                    </Link>
                </div>

                <div className="bg-white">

                    {/* Dados */}
                    <div className="
                        grid
                        grid-cols-3
                        gap-10
                        px-5
                        py-5
                        pb-5
                        sm:px-10
                        sm:py-5
                        sm:pb-10

                        [&_.col-1]:col-span-3
                        [&_.col-1]:sm:col-span-1
                        [&_.col-2]:col-span-3
                        [&_.col-2]:sm:col-span-2
                        [&_.col-3]:col-span-3
                        [&_.col-3]:sm:col-span-3

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
                        <div className="col-1">
                            <div className="list-tittle"><FaUserCircle /> Dados Pessoais</div>
                            <ul>
                                <li>
                                    <div className="list-subtittle">NOME{client.contact_name && " DA EMPRESA"}</div>
                                    <div className="list-info">{client.name}</div>
                                </li>
                                {client.contact_name && (
                                    <li>
                                        <div className="list-subtittle">CONTATO</div>
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
                        <div className="col-1">
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
                            <div className={`${client.details || 'flex flex-row justify-center items-center'} min-h-20 p-2 border-2 rounded-xl font-light text-sm sm:text-xl text-gray-600 border-pink-500/50 bg-pink-50 whitespace-pre-line`}>
                                {client.details ? client.details : "Nada informado."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}