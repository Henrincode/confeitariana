'use client'

import { useState } from "react"
import { FaBoxOpen } from "react-icons/fa"

export default function ViewCreateProduct() {

    const [img, setImg] = useState('')

    function convertImage() {
        setImg('https://www.receiteria.com.br/wp-content/uploads/bolo-simples-de-chocolate.jpeg')
    }

    return (
        <div className="max-w-sm px-2 pb-4 mx-auto drop-shadow-2xl drop-shadow-black/30">

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
                <form action="" className="
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
                ">
                    {/* foto */}
                    <label htmlFor="image_url" className="relative col-span-2 input w-full aspect-video bg-amber-100">
                        {img
                            ? <img src={img} className="absolute top-0 left-0 size-full object-cover object-center" />
                            : 'Enviar imagem'
                        }
                        <input onChange={convertImage} hidden id="image_url" name="image_url" type="file" />
                    </label>

                    {/* nome */}
                    <div className="item col-span-2">
                        <label htmlFor="name" className="label">Nome</label>
                        <input id="name" name="name" type="text" className="input" />
                    </div>

                    {/* categoria */}
                    <div className="item">
                        <label htmlFor="id_product_category_fk" className="label">Categoria</label>
                        <select
                            name="id_product_category_fk" id="id_product_category_fk"
                            className="input"
                        >
                            <option value="1">Bolo</option>
                            <option value="2" className="ml-2">- Bolo doce</option>
                        </select>
                    </div>

                    {/* marca */}
                    <div className="item">
                        <label htmlFor="id_brand_fk" className="label">Marca</label>
                        <select
                            name="id_brand_fk" id="id_brand_fk"
                            className="input"
                        >
                            <option value="1">Ana</option>
                            <option value="2">Coca-Cola</option>
                        </select>
                    </div>

                    {/* Preço original */}
                    <div className="item">
                        <label htmlFor="price_original" className="label">Preço original</label>
                        <input id="price_original" name="price_original" type="number" min={0} step={0.01} className="input" />
                    </div>

                    {/* Preço desconto */}
                    <div className="item">
                        <label htmlFor="price_discount" className="label">Preço desconto</label>
                        <input id="price_discount" name="price_discount" type="number" min={0} step={0.01} className="input" />
                    </div>

                    {/* Preço de custo */}
                    <div className="item">
                        <label htmlFor="price_cost" className="label">Preço de custo</label>
                        <input id="price_cost" name="price_cost" type="number" min={0} step={0.01} className="input" />
                    </div>

                    {/* Tipo de unidade */}
                    <div className="item">
                        <label htmlFor="id_unit_fk" className="label">Tipo unidade</label>
                        <select
                            name="id_unit_fk" id="id_unit_fk"
                            className="input"
                        >
                            <option value="1">Kg</option>
                            <option value="2">Un</option>
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
                    id_product BIGSERIAL PRIMARY KEY,
                    id_unit_fk BIGINT NOT NULL REFERENCES ana_units(id_unit),
                    image_url TEXT,
                    created_at TIMESTAMPTZ DEFAULT NOW(),
                    deleted_at TIMESTAMPTZ
                 */}
            </div>
        </div>
    )
}