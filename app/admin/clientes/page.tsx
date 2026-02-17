import clientService from "@/server/services/client.service"
import ClientView from "./ClientView"

export default async function ClientsPage() {
    const clients = await clientService.find()
    return (
        <ClientView clients={clients} />
    )
}