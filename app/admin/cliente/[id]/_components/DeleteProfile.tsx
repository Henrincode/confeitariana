'use client'
import { deleteClient, restoreClient } from "@/server/actions/client.action";
import { Client } from "@/types/client.types";
import { useRouter } from "next/navigation";

interface Params {
    closeModal: Function
    client: Client
}

export default function UpdateProfile({ closeModal, client }: Params) {

    const router = useRouter()

    async function confirm() {
        !client.deleted_at
            ? await deleteClient(client.id_client)
            : await restoreClient(client.id_client)
        router.push('/admin/clientes/')
    }

    return (
        <div onMouseDown={(e) => e.stopPropagation()} className="
            flex flex-col items-center gap-4
            max-w-100 p-2 mx-auto rounded-2xl border-4 
            border-white text-white bg-pink-400
        ">
            <div className="text-center">
                <p>Deseja realmente apagar o usuário</p>
                <p className="text-pink-900 animate-pulse">
                    {client.name.split(' ')[0]}
                </p>
            </div>
            <div className="
                flex flex-row gap-4
                text-sm
                cursor-pointer
                select-none

                [&_.button]:px-2 [&_.button]:py-1 [&_.button]:cursor-pointer
                [&_.button]:border-2 [&_.button]:rounded-xl
                [&_.button]:text-white [&_.button]:border-white
                [&_.button]:bg-pink-500 [&_.button]:hover:bg-pink-800
            ">
                <button type="button" className="button" onClick={confirm}>sim</button>
                <div className="button" onClick={() => closeModal()}>não</div>
            </div>
        </div>
    )
}