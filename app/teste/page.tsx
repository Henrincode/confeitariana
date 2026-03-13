'use client'

import { CreateClient } from "@/schemas/client.schema"
import { createClient } from "@/server/actions/client.action"
import { useEffect, useState } from "react"

export default function teste() {

    const [load, setLoad] = useState(false)

    async function teste() {
        setLoad(true)
        const client: CreateClient = {
            id_client_category_fk: 1,
            name: 'teste'
        }

        const data = await createClient(client)
        console.log(data)
        setLoad(false)
    }

    return (
        <div className="box flex flex-col items-center">

            {load
                ? <div className="size-20 border-10 rounded-full border-cyan-300 border-t-black/0 animate-spin"></div>
                : <button onMouseDown={teste}>aaaaaa</button>
            }


        </div>
    )
}