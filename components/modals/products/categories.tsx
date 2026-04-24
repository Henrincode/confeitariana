'use client'

import { FaBoxOpen } from "react-icons/fa"
import Modals from ".."
import { useEffect, useState } from "react"
import { ProductCategory } from "@/types/product.types"
import { findProductCategories } from "@/server/actions/products.action"

interface Props {
    closeModal: () => void
}

export default function ModalProductCategories({ closeModal }: Props) {

    useEffect(() => {
        load()
    }, [])

    const [categoriesDB, setCategoriesDB] = useState<ProductCategory[]>()
    const [btnSelected, setBtnSelected] = useState('create')

    async function load() {
        try {
            const response = await findProductCategories()
            setCategoriesDB(response.data)
        } catch (error) {
            console.log('Erro interno do servidor')
        }
    }

    return (
        <Modals closeModal={closeModal}>
            <div onMouseDown={(e) => e.stopPropagation()} className="max-w-xl mx-auto drop-shadow-x drop-shadow-black/30">

                {/* título */}
                <div className="
                    flex flex-row justify-center items-center gap-2
                    py-5 px-2 rounded-t-xl
                    font-semibold text-2xl italic
                    text-white bg-pink-500
                "><FaBoxOpen /> Categorias</div>

                {/* corpo */}
                <div className="
                    p-2 rounded-b
                    bg-gray-50
                ">
                    {/* areas */}
                    <div className="
                        grid grid-cols-3 gap-2

                        [&_button]:p-2 [&_button]:rounded-lg
                        [&_button]:text-sm
                        [&_button]:text-gray-700 [&_button]:hover:text-white
                        [&_button]:bg-gray-200 [&_button]:hover:bg-gray-400
                        [&_button]:cursor-pointer [&_button]:transition-all

                        [&_.selected]:text-white [&_.selected]:bg-gray-400
                    ">
                        <button
                            onClick={() => setBtnSelected('create')}
                            className={btnSelected === 'create' ? 'selected' : ''}
                        >
                            Criar
                        </button>
                        <button
                            onClick={() => setBtnSelected('edit')}
                            className={btnSelected === 'edit' ? 'selected' : ''}
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => setBtnSelected('delete')}
                            className={btnSelected === 'delete' ? 'selected' : ''}
                        >
                            Apagar
                        </button>
                    </div>

                    {/* line */}
                    <div className="h-0.5 my-2 -mx-2 bg-gray-300"></div>
                    {/* formulários */}

                    {btnSelected === 'create' && (
                        <>
                            <p className="font-semibold text-xl text-gray-600">
                                Criar categorias de produtos
                            </p>
                            <p className="text-gray-500">
                                Escreva o nome da categoria no campo abaixo e clique em criar.
                            </p>
                            <form action="#" className="
                                grid grid-cols-5 items-end gap-4
                                mt-4

                                [&_.label]:pl-2
                                [&_.label]:text-sm
                                [&_.label]:font-semibold
                                [&_.label]:text-gray-500

                                [&_.input]:outline-pink-400
                                [&_.input]:bg-gray-200
                                [&_.input]:border-2
                                [&_.input]:border-gray-400
                                [&_.input]:p-1
                                [&_.input]:rounded-lg
                                [&_.input]:text-gray-800
                            ">

                                <div className="flex flex-col col-span-2">

                                    <label htmlFor="categories" className="label">Categoria pai</label>

                                    <select name="categories" id="categories" className="input">
                                        <option value="0">--</option>
                                        {categoriesDB?.map(c => (
                                            <option key={c.id_product_category} value={c.id_product_category}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label htmlFor="category" className="label">Nova categoria</label>
                                    <input name="category" id="category" type="text" placeholder="Nome da categoria" className="input" />
                                </div>
                                <div className="flex flex-col col-span-1">
                                    <button className="w-full p-1 border-2 rounded-lg text-pink-600 border-pink-400 bg-pink-200 hover:bg-pink-300 cursor-pointer">
                                        Criar
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {btnSelected === 'edit' && (
                        <form action="#">
                            Editar
                        </form>
                    )}

                    {btnSelected === 'delete' && (
                        <form action="#">
                            Apagar
                        </form>
                    )}


                    {/* 
                        falta a chave amount que por padrão é 1
                    */}
                </div>
            </div>
        </Modals >
    )
}