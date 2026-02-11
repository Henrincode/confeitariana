import { deleteClient } from "@/server/actions/client.action";

export default function UpdateProfile({ closeModal, client }: { closeModal: Function, client: any }) {
    return(
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col w-200 mx-auto bg-white">
            <div>Deseja realmente apagar o usuário {client.name}?</div>
            <div className="flex flex-row gap-4">
                <div onClick={() => deleteClient(client.id_client)}>sim</div>
                <div onClick={() => closeModal()}>não</div>
            </div>
        </div>
    )
}