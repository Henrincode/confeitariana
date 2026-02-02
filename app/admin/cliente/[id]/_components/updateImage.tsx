'use client'

import { updateClientImage } from "@/server/actions/client.action"
import { useActionState, useTransition } from "react"

interface State {
    success?: boolean
    error?: string
}

const initialState: State = {}

// Adicionei o clientId nas props para podermos enviar no FormData
export default function UpdateImage({ name, image, clientId }: { name: string, image: string, clientId: number }) {
    // stateUpdateImage: o retorno da sua action
    // formUpdateImage: a função que você coloca no action do form
    const [stateUpdateImage, formUpdateImage] = useActionState(updateClientImage, initialState)

    return (
        <form action={formUpdateImage}>
            {/* Campo escondido para enviar o ID do cliente automaticamente */}
            <input type="hidden" name="id_client" value={clientId} />

            <label htmlFor="updateImage" className="cursor-pointer group relative block">
                <img
                    src={image ? image : `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`}
                    alt="avatar" 
                    className="sm:w-50 border-4 shadow-lg shadow-black/30 border-white/70 rounded-full transition group-hover:opacity-75"
                />
                
                <input 
                    id="updateImage" 
                    name="image_url" // Deve ser o mesmo nome que você usa no formData.get('image_url')
                    type="file" 
                    accept="image/*"
                    hidden 
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            e.target.form?.requestSubmit(); // Isso dispara o formUpdateImage automaticamente
                        }
                    }} 
                />
            </label>

            {/* Feedback de erro, se houver */}
            {stateUpdateImage?.error && (
                <p className="text-red-500 text-xs mt-2 text-center">{stateUpdateImage.error}</p>
            )}
        </form>
    )
}