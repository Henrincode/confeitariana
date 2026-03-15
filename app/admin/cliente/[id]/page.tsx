import clientService from "@/server/services/client.service"
import ClientView from "./ClientView"


interface Props {
    params: Promise<{ id: string }>
}

export default async function ClientePage({ params }: Props) {
    const { id: idString } = await params
    const id = Number(idString)
    const client = await clientService.findById(id)
    const clientAddresses = await clientService.findAddressesByClient(id)
    return (
        <>
            {client
                ? <ClientView idPage={id} client={client} clientAddresses={clientAddresses} />
                : <div className="pt-10 text-4xl text-center text-gray-700">Cliente não encontrado</div>
            }
        </>
    )
}