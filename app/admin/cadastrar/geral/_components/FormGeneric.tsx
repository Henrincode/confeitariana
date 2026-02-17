'use client'

import { useState } from "react"

interface ActionState {
    success?: boolean
    error?: string
}

const initialState: ActionState = {}

export default function FormGeneric({ tittle, data, data_id, createAction, updateAction, deleteAction }: any) {

    // select delete data
    const [inputCreateData, setInputCreateData] = useState('')
    const [inputDeletData, setInputDeletData] = useState(data[0][data_id])
    const [inputUpdateData, setInputUpdateData] = useState(data[0][data_id])
    const [newDataName, setNewDataName] = useState('')

    const [codErro, setCodErro] = useState('')

    async function clickCreateData() {
        const data = await createAction(inputCreateData)
        setCodErro('')
        if (data.success) {
            setInputCreateData('')
        } else {
            setCodErro(data.error)
        }
    }

    async function clickDeleteData() {
        const result = await deleteAction(inputDeletData)
        setCodErro('')
        if (result.success) {
            setInputDeletData(data[0][data_id])
            setInputUpdateData(data[0][data_id])
        } else {
            const msg = result.error === '23503' ? 'Categoria não esta limpa' : 'Erro desconhecido'
            setCodErro(msg)
        }
    }

    async function clickUpdateData() {
        const data = {
            [data_id]: Number(inputUpdateData),
            name: newDataName
        }

        if (newDataName) await updateAction(data)

        setNewDataName('')

    }

    return (
        <>
            <div className="
                flex
                flex-col
                items-center
                gap-2

                w-full
                lg:w-fit
                p-2
                rounded-2xl
                **:rounded-2xl
                
                text-white
                bg-pink-400

                [&_.h-line]:self-stretch
                [&_.h-line]:w-full
                [&_.h-line]:lg:w-1
                [&_.h-line]:h-1
                [&_.h-line]:lg:h-auto
                [&_.h-line]:rounded-full
                [&_.h-line]:bg-white/20

                [&_.campo]:w-full
                [&_.campo]:lg:w-50
                [&_.campo]:px-2
                [&_.campo]:text-gray-700
                [&_.campo]:bg-pink-50

                [&_button]:w-full
                [&_button]:px-2
                [&_button]:py-1
                [&_button]:text-sm
                [&_button]:text-gray-800
                [&_button]:hover:text-white
                [&_button]:bg-pink-300
                [&_button]:hover:bg-pink-500
                [&_button]:cursor-pointer
            ">
                <p className="text-2xl">{tittle}</p>

                <div className="w-full h-1 rounded-full bg-white/20"></div>

                <div className="flex flex-col lg:flex-row flex-wrap gap-2 w-full">

                    {/* creat */}
                    <form action={clickCreateData} className="flex flex-col items-center gap-2">
                        <input onChange={(e) => setInputCreateData(e.target.value)} value={inputCreateData}
                            type="text" name="name" placeholder="Escreva um nome" className="campo"
                        />
                        <button>Cadastrar</button>
                    </form>

                    <div className="h-line"></div>

                    {/* delete */}
                    <div className="flex flex-col items-center gap-2">
                        <select onChange={(e) => setInputDeletData(e.target.value)} value={inputDeletData} name="category" id="category" className="campo">
                            {data.map((c: any, i: number) => <option key={i} value={c[data_id]}>{c.name}</option>)}
                        </select>
                        <button onClick={clickDeleteData} type="button">Apagar</button>
                    </div>

                    <div className="h-line"></div>

                    {/* edit */}
                    <div className="flex flex-col gap-2">
                        {/* select */}
                        <div className="flex flex-row gap-2">
                            <select onChange={(e) => setInputUpdateData(e.target.value)} name="category" id="category" value={inputUpdateData} className="campo">
                                {data.map((c: any, i: number) => <option key={i} value={c[data_id]}>{c.name}</option>)}
                            </select>
                            {/* edit */}
                            <input onChange={(e) => setNewDataName(e.target.value)} value={newDataName}
                                type="text" placeholder={data.find((c: any) => c[data_id] === Number(inputUpdateData))?.name} className="campo" />
                        </div>
                        {/* update */}
                        <button onClick={clickUpdateData} type="button" className="button">Renomear</button>
                    </div>
                </div>
                {codErro && (<p>{codErro}</p>)}
            </div>
        </>
    )
}
