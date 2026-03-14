import clientService from "@/server/services/client.service";
import ClientTeste from "./ClientView";

export default async function teste() {

    const client = await clientService.findById(120)

    if(!client) {
        return (
            <div className="text-center text-8xl">
                Cliente não encontrado
            </div>
        )
    }

    return (
        <ClientTeste client={client}/>
    )
}