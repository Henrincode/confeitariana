'use client'

import { uploadClientImage } from "@/server/actions/client.action"
import clientService from "@/server/services/client.service"
import { Client } from "@/types/client.types"
import imageCompression from "browser-image-compression"
import { useEffect, useState } from "react"

const IMG_DEFAULT = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'

export default function ClientTeste({ client }: { client: Client }) {

    const [load, setLoad] = useState(false)
    const [imgUrl, setImageUrl] = useState(client.image_url)
    const [fileUpload, setFileUpload] = useState<File | boolean>(false)

    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {
        const imageFile = e.currentTarget.files?.[0];
        if (!imageFile) return;

        const options = {
            maxSizeMB: 0.2,
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

            // 3. Cria URL para preview (funciona igual com File ou Blob)
            const url = URL.createObjectURL(finalFile);
            setImageUrl(url);

            // 4. Salva um File real, com .name e .size
            setFileUpload(finalFile);

            const data = {id_client: client.id_client, file: finalFile}

            const foi = await uploadClientImage(data)
            console.log('data? ', data)
            console.log('deu certo? ', foi)

        } catch (error) {
            console.error("Erro na compressão:", error);
        }
    }

    return (
        <div className="box flex flex-col items-center">

            <label htmlFor="f-img" className="overflow-hidden rounded-2xl hover:brightness-125 transition-all cursor-pointer">
                <img src={imgUrl || IMG_DEFAULT} alt="" />
            </label>
            <input onChange={renderImage} hidden type="file" name="" id="f-img" />

            <div>{client.id_client}</div>


        </div>
    )
}