import clientService from "@/server/services/client.service"
import Link from "next/link"

export default async function ClientsPage() {
    const clients = await clientService.find()
    return(
        <ul className="box flex flex-row justify-center gap-2 mt-4">
                {clients.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                    <li key={i}>
                        <Link href={`/admin/cliente/${c.id_client}`} className="flex flex-row items-center cursor-pointer select-none group">
                            <img
                                src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.name}`}
                                alt="avatar" className="z-1 w-10 rounded-full"
                            />
                            <div className="px-2 py-1 pl-6 -ml-5 rounded-r-2xl bg-white group-hover:bg-pink-300">
                                {c.name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
    )
}