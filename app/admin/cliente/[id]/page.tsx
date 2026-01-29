import clientService from "@/server/services/client.service"
import Link from "next/link"

interface Props {
    params: Promise<{ id: string }>
}

export default async function ClientePage({ params }: Props) {
    const { id: idString } = await params
    const id = Number(idString)
    const client = await clientService.findById(id)
    return (
        <div className="box outline-1">
            <div id="clientePerfil" className="flex flex-row justify-between">
                <p>Perfil de cliente</p>
                <Link href="../clientes">Voltar</Link>
            </div>
        </div>
    )
}