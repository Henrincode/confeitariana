import clientService from "@/server/services/client.service";
import ClientView from "./ClientView";

export default async function CreateClientPage() {
    const clientTypes = await clientService.findTypes()
    return (
        <ClientView types={clientTypes}/>
    )
}