'use client'

import { Product } from "@/types/product.types"
import Image from "next/image"

interface Params {
    products: Product[]
}

export default function ViewProducts({ products }: Params) {
    return (
        <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p =>
                <div key={p.id_product} className="group relative overflow-hidden aspect-video p-2 rounded-2xl bg-white">
                    <Image
                        src={p.image_url || '#'}
                        alt=""
                        width={310}
                        height={180}
                        className="absolute size-full inset-0 object-cover"
                    />


                    <div className="
                        relative
                        flex flex-col justify-between
                        size-full
                        group-hover:opacity-0 transition-all
                        cursor-pointer
                    ">
                        <div className="
                            mx-auto
                            w-fit
                            py-1 px-3 rounded-xl 
                            text-white bg-gray-700/80 
                        ">
                            {p.name}
                        </div>
                        <div className="flex flex-row justify-between items-end">
                            <div className="flex flex-col items-start gap-2">
                                <div className="py-1 px-3 rounded-xl  text-white bg-gray-700/80">
                                    {p.brand.name}
                                </div>
                                <div className="py-1 px-3 rounded-xl  text-white bg-gray-700/80">
                                    {p.category}
                                </div>
                            </div>
                            {p.price_original > 0 && (
                                <div className="py-1 px-3 rounded-xl text-xl  text-white bg-gray-700/60">R${p.price_original}/{p.unit}</div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}