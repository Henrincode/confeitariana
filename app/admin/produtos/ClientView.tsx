'use client'

import { Product } from "@/types/product.types"

interface Params {
    products: Product[]
}

export default function ViewProducts({products}: Params) {
    return (
        <div>
            {products.map(p =>
            <div key={p.id_product}>{p.name}</div>
        )}
        </div>
    )
}