import clientService from "@/server/services/client.service"

export default async function ClientsPage() {
    const clients = await clientService.find()
    return(
        <ul>
            {clients.map((c: any, i: number) => (
                <li key={i}>{c.name}</li>
            ))}
        </ul>
    )
}