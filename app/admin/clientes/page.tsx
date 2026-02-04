import clientService from "@/server/services/client.service"
import Link from "next/link"
import Image from "next/image"

export default async function ClientsPage() {
    const clients = await clientService.find()
    return (
        // <ul className="box flex flex-col sm:flex-row justify-center sm:flex-wrap gap-4 sm:gap-8 mt-4">
        <ul className="box flex flex-col justify-center sm:grid sm:grid-cols-3 gap-4 sm:gap-8 mt-4">
            {clients.sort((a: any, b: any) => a.name.localeCompare(b.name)).map((c: any, i: number) => (
                <li key={i} className="col-span-1 ">
                    <Link href={`/admin/cliente/${c.id_client}`} className="flex flex-row items-center cursor-pointer select-none group">
                        {c.image_url
                            ? (
                                <Image
                                    src={c.image_url}
                                    alt='avatar'
                                    width={120}
                                    height={120}
                                    className="z-1 w-20 sm:w-30 border-8 border-white group-hover:border-pink-300 rounded-full aspect-square object-cover"
                                />
                            )
                            : (
                                <img
                                    src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${c.name}`}
                                    alt="avatar" className="z-1 w-20 sm:w-30 border-8 border-white group-hover:border-pink-300 rounded-full aspect-square object-cover"
                                />
                            )}
                        <div className="sm:flex-1 sm:flex sm:flex-row sm:items-center sm:min-h-16 px-2 py-1 pl-8 -ml-5 sm:text-xl rounded-r-2xl text-gray-700 bg-white group-hover:bg-pink-300">
                            {c.name}
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}