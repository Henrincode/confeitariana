//---- table: products
export interface ProductDB {
    id_product: number
    id_product_category_fk: number
    id_brand_fk: number
    id_unit_fk: number
    name: string
    price_original: number
    price_discount: number
    price_cost: number
    image_url: string | null
    created_at: Date
    deleted_at: Date | null
}

// view: products
export interface Product extends ProductDB {
    category: string
    brand: string
    unit: string
}

// -------------------------------------------------------

// ---- table: product_categories
export interface ProductCategoryDB {
    id_product_category: number
    id_parent_fk: number | null
    name: string
    created_at: Date
}

// view: product_categories
export interface ProductCategory extends ProductCategoryDB { }
