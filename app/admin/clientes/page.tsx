import clientService from "@/server/services/client.service"
import ClientView from "./ClientView"

export default async function ClientsPage() {
    const clients = await clientService.find()
    return (
        clients.length
            ? <ClientView clients={clients} />
            : <div
                className="
                size-fit mx-auto text-5xl text-gray-500
            ">
                Nenhum cliente cadastrado
            </div>
    )
}