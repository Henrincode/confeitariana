'use client'

import imageCompression from 'browser-image-compression';
import { updateClientImage } from "@/server/actions/client.action";
import { useActionState, startTransition, useState } from "react"; // 1. Importe o startTransition
import Image from 'next/image';

interface State {
    success?: boolean
    error?: string
}

const initialState: State = {}

export default function UpdateImage({ name, image, clientId }: { name: string, image: string, clientId: number }) {
    // Nota: Em React 19 / Next 15, useActionState retorna [state, action, isPending]
    const [stateImage, formImage, isPending] = useActionState(updateClientImage, initialState)

    const clickUpdateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = event.target.files?.[0]
        if (!imageFile) return

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
        }

        try {
            // 1. Compacta a imagem
            const compressedFile = await imageCompression(imageFile, options)

            // 2. Cria o FormData com o arquivo otimizado
            const formData = new FormData()
            formData.append('image_url', compressedFile, compressedFile.name)
            formData.append('id_client', clientId.toString())

            // 3. A MÁGICA: Dispara a Action dentro de uma transition
            // Isso remove o erro do console e ativa o estado isPending
            startTransition(() => {
                formImage(formData)
            })

        } catch (error) {
            console.error("Erro ao comprimir imagem:", error)
        }
    }

    return (
        <form>
            <label
                htmlFor="updateImage"
                className={`relative cursor-pointer block group ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            >
                {image ? (
                    <Image
                        src={image}
                        alt='avatar'
                        width={200}
                        height={200}
                        className={`w-full sm:w-50 border-4 shadow-lg shadow-black/30 border-white/70 bg-white/50 rounded-full aspect-square object-cover transition-all ${isPending ? 'scale-95 blur-[2px]' : 'group-hover:brightness-90'}`}
                    />
                ) : (
                    <img
                        src={`https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${name}`}
                        alt="avatar"
                        className={`w-full sm:w-50 border-4 shadow-lg shadow-black/30 border-white/70 bg-white/50 rounded-full aspect-square object-cover transition-all ${isPending ? 'scale-95 blur-[2px]' : 'group-hover:brightness-90'}`}
                    />
                )}

                {/* Overlay de carregamento opcional */}
                {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <input
                    id="updateImage"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={clickUpdateImage}
                    disabled={isPending}
                />
            </label>

            {stateImage?.error && (
                <p className="text-red-500 text-xs mt-2 text-center font-semibold">{stateImage.error}</p>
            )}
        </form>
    );
}