'use client'

import imageCompression from 'browser-image-compression';
import { uploadClientImage } from "@/server/actions/client.action";
import { useActionState, startTransition, useState, useEffect } from "react"; // 1. Importe o startTransition
import Image from 'next/image';

export default function UpdateImage({ name, image, clientId }: { name: string, image: string, clientId: number }) {

    const [pending, setPending] = useState<boolean>()

    const [imageUrl, setImageUrl] = useState('')
    const [fileUpload, setFileUpload] = useState<File>()
    const [error, setError] = useState('')

    const [newComp, setNewComp] = useState(1)

    // useEffect(() => {
    //     if (image && !imageUrl) setImageUrl(image)
    // }, [])

    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {

        const imageFile = e.currentTarget.files?.[0];
        if (!imageFile) return;

        setPending(true)

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
        };

        try {
            // 1. Comprime o arquivo (retorna um Blob/File sem o nome original)
            const compressedBlob = await imageCompression(imageFile, options);

            // 2. Converte o Blob em um novo objeto File
            // Passa o array com o blob, o nome original e o tipo
            const finalFile = new File([compressedBlob], imageFile.name, {
                type: imageFile.type,
                lastModified: Date.now(),
            });

            // 3. Salva um File real, com .name e .size
            setFileUpload(finalFile);

            const data = { id_client: clientId, file: finalFile }

            const response = await uploadClientImage(data)
            console.log('data? ', data)
            console.log('deu certo? ', response)
            if (!response.success) setError(response.message)

            // 4. Cria URL para preview (funciona igual com File ou Blob)
            // if (response.success) {
            //     const url = URL.createObjectURL(finalFile)
            //     setImageUrl(url)
            //     setNewComp(c => c + 1)
            // }

        } catch (error: any) {
            console.error("Erro na compressão:", error);
            setError('Erro desconhecido')
        }

        setTimeout(() => {
            setPending(false)
        }, 1500);
    }

    return (
        <form>
            <label
                htmlFor="updateImage"
                className={`relative cursor-pointer block group ${pending ? 'opacity-50 pointer-events-none' : ''}`}
            >
                <Image
                    src={image || `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${clientId}`}
                    alt='avatar'
                    width={300}
                    height={300}
                    className={`w-full sm:w-50 border-4 shadow-lg shadow-black/30 border-white/70 bg-white/50 rounded-full aspect-square object-cover transition-all ${pending ? 'scale-95 blur-[2px]' : 'group-hover:brightness-90'}`}
                />

                {/* Overlay de carregamento opcional */}
                {pending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <input
                    id="updateImage"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={renderImage}
                    disabled={pending}
                />
            </label>

            {error && (
                <p className="text-red-500 text-xs mt-2 text-center font-semibold">{error}</p>
            )}
        </form>
    );
}