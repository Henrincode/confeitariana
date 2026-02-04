import clientService from "@/server/services/client.service"
import ClientView from "./ClientView"


interface Props {
    params: Promise<{ id: string }>
}

export default async function ClientePage({ params }: Props) {
    const { id: idString } = await params
    const id = Number(idString)
    const client = await clientService.findById(id)
    client.addresses = await clientService.findAddresses(id)
    return (
        <ClientView idPage={id} client={client} />
    )
}