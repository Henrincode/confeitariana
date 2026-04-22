'use client'

import ModalCreateOrUpdateProduct from "@/components/modals/products/CreateOrUpdate"
import { deleteProduct } from "@/server/actions/products.action"
import { Product } from "@/types/product.types"
import Image from "next/image"
import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { FaCamera } from "react-icons/fa"
import { MdEditNote, MdOutlineNoPhotography } from "react-icons/md"

interface Params {
    products: Product[]
}

export default function ViewProducts({ products }: Params) {

    const [search, setSearch] = useState('')
    const [modal, setModal] = useState<Product | undefined>(undefined)
    const [productToUpdate, setProductToUpdate] = useState<number | undefined>()

    function closeModal() {
        setModal(undefined)
        // setProductToUpdate(undefined)
    }

    async function clickDelete(id: number) {
        if (!id) return

        setProductToUpdate(id)

        try {
            const productDeleted = await deleteProduct(id)
            setProductToUpdate(undefined)
        } catch {
            setProductToUpdate(undefined)
            return
        }
    }

    return (
        <>
            <div className="box flex flex-col items-center mb-4">
                <input
                    onInput={(e) => setSearch(e.currentTarget.value)} value={search}
                    type="text" placeholder="🔍 Buscar"
                    className="
                    w-full max-w-100
                    py-2 px-4
                    border border-gray-400 rounded-full outline-none
                    text-2xl text-gray-700
                    bg-amber-50
            "/>
            </div>

            {/* rolagem x da table */}
            <div className="overflow-x-auto">
                <div className="box">
                    <table className="
                        w-full
                        border-separate border-spacing-2

                        **:whitespace-nowrap

                        [&_td]:overflow-hidden
                        [&_td]:font-light
                        [&_td]:text-xl
                        [&_td]:text-gray-800
                        [&_td]:rounded-md
                    ">
                        <thead className="bg-pink-400">
                            <tr className="*:py-2 *:px-4 *:rounded-md *:font-normal text-white">
                                <th className="w-20"><FaCamera /></th>
                                <th className="w-full">Nome</th>
                                <th>Categoria</th>
                                <th>Marca</th>
                                <th>Custo</th>
                                <th>Preço</th>
                                <th>Desconto</th>
                                <th>Preço final</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.filter(p =>
                                (
                                    p.name.toLowerCase().includes(search.toLowerCase())
                                    || p.category.toLowerCase().includes(search.toLowerCase())
                                    || p.brand.name.toLowerCase().includes(search.toLowerCase())
                                    || p.price_cost.toString().toLowerCase().includes(search.toLowerCase())
                                    || p.price_discount.toString().toLowerCase().includes(search.toLowerCase())
                                    || p.price_original.toString().toLowerCase().includes(search.toLowerCase())
                                )
                                && !p.deleted_at
                            ).map(p => (
                                <tr onClick={() => setModal(p)} key={p.id_product} className={`${productToUpdate === p.id_product && "animate-[pulse_300ms_infinite]"} bg-pink-200 hover:bg-pink-300 cursor-pointer`}>
                                    <td className="relative h-12">
                                        {p.image_url
                                            ? <Image src={p.image_url} width={50} height={50} alt="" className="size-full aspect-video object-cover" />
                                            : <MdOutlineNoPhotography className="absolute top-1/2 left-1/2 -translate-1/2" />
                                        }
                                    </td>
                                    <td className="px-2">{p.name}</td>
                                    <td className="px-2 text-center">{p.category}</td>
                                    <td className="px-2 text-center">{p.brand.name}</td>
                                    <td className="px-2 text-right">R${p.price_cost}</td>
                                    <td className="px-2 text-right">R${p.price_original}</td>
                                    <td className="px-2 text-right">R${p.price_discount}</td>
                                    <td className="px-2 text-right">R${p.price_original - p.price_discount}</td>
                                    <td onClick={(e) => { e.stopPropagation(); productToUpdate !== p.id_product && clickDelete(p.id_product) }} className="group cursor-pointer">
                                        <div className=" flex flex-row justify-center items-center gap-1 ">
                                            {/* <MdEditNote className="hover:text-green-700" /> */}
                                            <AiFillDelete className="group-hover:text-red-500" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modal && <ModalCreateOrUpdateProduct closeModal={closeModal} product={modal} />}
        </>
    )
}