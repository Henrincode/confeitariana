'use client'

import { FaBoxOpen } from "react-icons/fa"
import Modals from ".."

interface Props {
    closeModal: () => void
}

export default function ModalProductCategories({ closeModal }: Props) {
    return (
        <Modals closeModal={closeModal}>
            <div onMouseDown={(e) => e.stopPropagation()} className="max-w-xl w-full px-2 pb-4 mx-auto drop-shadow-x drop-shadow-black/30">

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
                    {/* formulário */}


                    {/* 
                        falta a chave amount que por padrão é 1
                    */}
                </div>
            </div>
        </Modals>
    )
}