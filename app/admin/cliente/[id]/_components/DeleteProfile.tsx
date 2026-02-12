import { deleteClient } from "@/server/actions/client.action";

export default function UpdateProfile({ closeModal, client }: { closeModal: Function, client: any }) {
    return (
        <div onClick={(e) => e.stopPropagation()} className="
            flex flex-col items-center gap-4
            max-w-100 p-2 mx-auto rounded-2xl border-4 
            border-white text-white bg-pink-400
        ">
            <div>Deseja realmente apagar o usuário "<span className="text-pink-800">{client.name.split(' ')[0]}</span>"?</div>
            <div className="
                flex flex-row gap-4
                text-sm
                cursor-pointer
                select-none

                [&_.buttom]:px-2 [&_.buttom]:py-1
                [&_.buttom]:border-2 [&_.buttom]:rounded-xl
                [&_.buttom]:text-white [&_.buttom]:border-white
                [&_.buttom]:bg-pink-500 [&_.buttom]:hover:bg-pink-800
            ">
                <div className="buttom" onClick={() => { closeModal(); deleteClient(client.id_client) }}>sim</div>
                <div className="buttom" onClick={() => closeModal()}>não</div>
            </div>
        </div>
    )
}