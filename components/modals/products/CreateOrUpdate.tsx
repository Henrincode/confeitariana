'use client'

import { UpdateProduct } from "@/schemas/product.schema"
import { findBrands } from "@/server/actions/brand.action"
import { createProduct, findProductCategories, updateProduct, uploadProductImage } from "@/server/actions/products.action"
import { findUnits } from "@/server/actions/unit.action"
import { Brand } from "@/types/brand.types"
import { Product, ProductCategory, ProductDB } from "@/types/product.types"
import { Unit } from "@/types/unit.types"
import imageCompression from "browser-image-compression"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaBoxOpen } from "react-icons/fa"
import Modals from ".."

interface Params {
    closeModal: () => void
    product?: Product
}

export default function ModalCreateOrUpdateProduct({ closeModal, product }: Params) {

    useEffect(() => {
        loadModal()
    }, [])

    const router = useRouter()

    const [categories, setCategories] = useState<ProductCategory[]>()
    const [brands, setBrands] = useState<Brand[]>()
    const [units, setUnits] = useState<Unit[]>()

    const [imageUrl, setImageUrl] = useState('')
    const [fileUpload, setFileUpload] = useState<File>()

    const [formName, setFormName] = useState('')
    const [formCategory, setFormCategory] = useState<string>()
    const [formBrand, setFormBrand] = useState<string>()
    const [formPriceOriginal, setFormPriceOriginal] = useState('')
    const [formPriceDiscount, setFormPriceDiscount] = useState('')
    const [formPriceCost, setFormPriceCost] = useState('')
    const [formUnit, setFormUnit] = useState<string>()

    async function loadModal() {

        setFileUpload(undefined)

        const unitsDB = await findUnits()
        const brandsDB = await findBrands()
        const categoriesDB = await findProductCategories()

        unitsDB.success ? setCategories(categoriesDB.data) : setCategories([])
        brandsDB.success ? setBrands(brandsDB.data) : setBrands([])
        categoriesDB ? setUnits(unitsDB.data) : setUnits([])

        if (product) {
            setFormUnit(String(product.id_unit_fk))
            setFormBrand(String(product.id_brand_fk))
            setFormCategory(String(product.id_product_category_fk))

            setFormName(product.name)
            setFormPriceOriginal(String(product.price_original > 0 ? product.price_original : ''))
            setFormPriceDiscount(String(product.price_discount > 0 ? product.price_discount : ''))
            setFormPriceCost(String(product.price_cost > 0 ? product.price_cost : ''))

            setImageUrl(product.image_url ?? '')

        } else {
            setFormUnit(String(unitsDB.data?.[0]?.id_unit))
            setFormBrand(String(brandsDB.data?.[0]?.id_brand))
            setFormCategory(String(categoriesDB.data?.[0]?.id_product_category))
        }
    }

    // capturar o arquivo do input, comprimir e enviar o obj para um hook
    async function renderImage(e: React.ChangeEvent<HTMLInputElement>) {

        // captura o arquivo do input
        const imageFile = e.currentTarget.files?.[0]
        if (!imageFile) return

        // configuração da compressão, useWebWorker não trava o component
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1000,
            useWebWorker: true,
        }

        try {
            // comprime o arquivo
            const compressedBlob = await imageCompression(imageFile, options)

            // cria url para preview
            const url = URL.createObjectURL(compressedBlob)
            setImageUrl(url)

            // cria obj para tratar no backend
            const finalFile = new File([compressedBlob], imageFile.name, {
                type: imageFile.type,
                lastModified: Date.now(),
            });

            // salva no hook
            setFileUpload(finalFile)

        } catch (error) {
            console.error("Erro:", error)
        }
    }

    async function submit(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault()

        const formdata = new FormData(e.currentTarget)
        formdata.delete('image_url')

        let data

        if (product) {

            const updatedProduct: UpdateProduct = {
                id_product: product.id_product,
                id_product_category_fk: Number(formCategory),
                id_brand_fk: Number(formBrand),
                id_unit_fk: Number(formUnit),
                name: formName,
                price_original: Number(formPriceOriginal),
                price_discount: Number(formPriceDiscount),
                price_cost: Number(formPriceCost)
            }

            data = await updateProduct(updatedProduct)
        } else {

            data = await createProduct(formdata)
        }

        if (!data?.success) return

        if (fileUpload) {
            const productImage = {
                id_product: product ? product.id_product : data.data.id_product,
                file: fileUpload
            }
            await uploadProductImage(productImage)
        }

        // router.push('/admin/produtos')
        closeModal()
    }

    return (
        <Modals closeModal={closeModal}>
            <div onMouseDown={(e) => e.stopPropagation()} className="max-w-xl px-2 pb-4 mx-auto drop-shadow-2xl drop-shadow-black/30">

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
                        [&_.input]:ring
                        [&_.input]:ring-inset
                        [&_.input]:outline-none
                        [&_.input]:rounded-lg
                        [&_.input]:ring-pink-700/20
                        [&_.input]:text-gray-700
                        [&_.input]:bg-pink-100
                        [&_.input]:hover:bg-pink-200
                    ">
                        {/* foto */}
                        <label htmlFor="image_url" className="input overflow-hidden relative col-span-2 flex justify-center items-center w-full aspect-video cursor-pointer">
                            {imageUrl
                                ? <img src={imageUrl} className="absolute top-0 left-0 size-full object-cover object-center" />
                                : 'Enviar imagem'
                            }
                            <input onChange={renderImage} hidden id="image_url" name="image_url" type="file" />
                        </label>

                        {/* nome */}
                        <div className="item col-span-2">
                            <label htmlFor="name" className="label">Nome</label>
                            <input
                                onInput={(e) => setFormName(e.currentTarget.value)} value={formName}
                                id="name" name="name" type="text" className="input" placeholder="Nome do produto"
                            />
                        </div>

                        {/* categoria */}
                        <div className="item">
                            <label htmlFor="id_product_category_fk" className="label">Categoria</label>
                            <select
                                onInput={(e) => setFormCategory(e.currentTarget.value)} value={formCategory}
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
                                onInput={(e) => setFormBrand(e.currentTarget.value)} value={formBrand}
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
                            <input
                                onInput={(e) => setFormPriceOriginal(e.currentTarget.value)} value={formPriceOriginal}
                                id="price_original" name="price_original" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00"
                            />
                        </div>

                        {/* Preço desconto */}
                        <div className="item">
                            <label htmlFor="price_discount" className="label">Preço desconto</label>
                            <input
                                onInput={(e) => setFormPriceDiscount(e.currentTarget.value)} value={formPriceDiscount}
                                id="price_discount" name="price_discount" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00"
                            />
                        </div>

                        {/* Preço de custo */}
                        <div className="item">
                            <label htmlFor="price_cost" className="label">Preço de custo</label>
                            <input
                                onInput={(e) => setFormPriceCost(e.currentTarget.value)} value={formPriceCost}
                                id="price_cost" name="price_cost" type="number" min={0} step={0.01} className="input" placeholder="R$ 0,00"
                            />
                        </div>

                        {/* Tipo de unidade */}
                        <div className="item">
                            <label htmlFor="id_unit_fk" className="label">Tipo unidade</label>
                            <select
                                onInput={(e) => setFormUnit(e.currentTarget.value)} value={formUnit}
                                name="id_unit_fk" id="id_unit_fk"
                                className="input"
                            >
                                {units?.map(u => (
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
                                ">{product ? "Alterar" : "Cadastrar"}</button>
                            </div>
                        </div>

                    </form>


                    {/* 
                        falta a chave amount que por padrão é 1
                    */}
                </div>
            </div>
        </Modals>
    )
}