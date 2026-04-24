'use client'

import { FaBoxOpen } from "react-icons/fa"
import Modals from ".."
import { useState } from "react"

interface Props {
    closeModal: () => void
}

export default function ModalProductCategories({ closeModal }: Props) {

    const [btnSelected, setBtnSelected] = useState('create')

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
                        >Editar</button>
                        <button
                            onClick={() => setBtnSelected('delete')}
                            className={btnSelected === 'delete' ? 'selected' : ''}
                        >Apagar</button>
                    </div>
                    {/* formulários */}

                    {btnSelected === 'create' && (
                        <form action="#">
                            <p>Criar categorias de produtos</p>
                            <p>Escreva o nome da categoria no campo abaixo e clique em criar</p>
                        </form>
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
        </Modals>
    )
}