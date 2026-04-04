'use client'

import { createProduct } from "@/server/actions/products.action"
import { Brand } from "@/types/brand.types"
import { ProductCategory } from "@/types/product.types"
import { Unit } from "@/types/unit.types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaBoxOpen } from "react-icons/fa"

interface Params {
    categories: ProductCategory[]
    brands: Brand[]
    units: Unit[]
}

export default function ViewCreateProduct({ categories, brands, units }: Params) {

    const router = useRouter()

    const [img, setImg] = useState('')

    async function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const formdata = new FormData(e.currentTarget)
        const data = await createProduct(formdata)

        if (!data.success) return

        router.push('/admin/produtos')

    }

    function convertImage() {
        setImg('https://www.receiteria.com.br/wp-content/uploads/bolo-simples-de-chocolate.jpeg')
    }

    return (
        <div className="max-w-xl px-2 pb-4 mx-auto drop-shadow-2xl drop-shadow-black/30">

            {/* título */}
            <div className="
                flex flex-row justify-center items-center gap-2
                py-5 px-2 rounded-t-xl
                font-semibold text-2xl italic
                text-white bg-pink-400
            "><FaBoxOpen /> Cadastrar produto</div>

            {/* corpo */}
            <div className="
                p-2 rounded-b
                bg-white
            ">
                {/* formulário */}
                <form onSubmit={submit} className="
                    grid grid-cols-2 gap-2
                
                    [&_.item]:flex
                    [&_.item]:flex-col

                    [&_.label]:ml-2
                    [&_.label]:text-sm
                    [&_.label]:text-gray-500

                    [&_.input]:p-2
                    [&_.input]:border
                    [&_.input]:outline-none
                    [&_.input]:rounded
                    [&_.input]:border-pink-700/20
                    [&_.input]:text-gray-700
                    [&_.input]:bg-pink-100
                    [&_.input]:hover:bg-pink-200
                ">
                    {/* foto */}
                    <label htmlFor="image_url" className="input relative col-span-2 flex justify-center items-center w-full aspect-video cursor-pointer">
                        {img
                            ? <img src={img} className="absolute top-0 left-0 size-full object-cover object-center" />
                            : 'Enviar imagem'
                        }
                        {/* <input onChange={convertImage} hidden id="image_url" name="image_url" type="file" /> */}
                    </label>

                    {/* nome */}
                    <div className="item col-span-2">
                        <label htmlFor="name" className="label">Nome</label>
                        <input id="name" name="name" type="text" className="input" placeholder="Nome do produto" />
                    </div>

                    {/* categoria */}
                    <div className="item">
                        <label htmlFor="id_product_category_fk" className="label">Categoria</label>
                        <select
                            name="id_product_category_fk" id="id_product_category_fk"
                            className="input"
                        >
                            {categories?.map(c => (
                                <option key={c.id_product_category} value={c.id_product_category}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* marca */}
                    <div className="item">
                        <label htmlFor="id_brand_fk" className="label">Marca</label>
                        <select
                            name="id_brand_fk" id="id_brand_fk"
                            className="input"
                        >
                            {brands?.map(b => (
                                <option key={b.id_brand} value={b.id_brand}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Preço original */}
                    <div className="item">
                        <label htmlFor="price_original" className="label">Preço original</label>
                        <input id="price_original" name="price_original" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00" />
                    </div>

                    {/* Preço desconto */}
                    <div className="item">
                        <label htmlFor="price_discount" className="label">Preço desconto</label>
                        <input id="price_discount" name="price_discount" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00" />
                    </div>

                    {/* Preço de custo */}
                    <div className="item">
                        <label htmlFor="price_cost" className="label">Preço de custo</label>
                        <input id="price_cost" name="price_cost" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00" />
                    </div>

                    {/* Tipo de unidade */}
                    <div className="item">
                        <label htmlFor="id_unit_fk" className="label">Tipo unidade</label>
                        <select
                            name="id_unit_fk" id="id_unit_fk"
                            className="input"
                        >
                            {units.map(u => (
                                <option key={u.id_unit} value={u.id_unit}>{u.name} ({u.short_name})</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <div className="h-1 rounded-full bg-pink-300"></div>
                        <div className="flex flex-row justify-center mt-2">
                            <button
                                className="
                                p-2 rounded-lg
                                text-white bg-pink-500 hover:bg-pink-400
                                transition-all cursor-pointer
                            ">Cadastrar</button>
                        </div>
                    </div>

                </form>


                {/* 
                    falta a chave amount que por padrão é 1
                 */}
            </div>
        </div>
    )
}