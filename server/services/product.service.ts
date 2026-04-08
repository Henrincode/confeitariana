import { Product, ProductCategory, ProductCategoryDB, ProductDB } from "@/types/product.types";
import { unstable_cache } from "next/cache";
import sql from "../db";
import { CreateProduct, CreateProductCategory, UpdateProduct, UpdateProductCategory, UploadProductImage } from "@/schemas/product.schema";
import storageServices from "./storage.service";

// ------------------- product

// find
const find = unstable_cache(
    async (): Promise<Product[]> => {
        const rows = await sql<Product[]>`
            SELECT
                p.*,
                c.name category,
                JSON_BUILD_OBJECT(
                    'name', b.name,
                    'image_url', b.image_url
                ) brand,
                u.short_name unit
            FROM ana_products p
            inner join ana_product_categories c
                on p.id_product_category_fk = c.id_product_category
            inner join ana_brands b
                on p.id_brand_fk = b.id_brand
            inner join ana_units u
                on p.id_unit_fk = u.id_unit
            ORDER BY name
        `
        return rows.map(r => ({
            ...r,
            id_product: Number(r.id_product),
            id_product_category_fk: Number(r.id_product_category_fk),
            id_brand_fk: Number(r.id_brand_fk),
            id_unit_fk: Number(r.id_unit_fk)
        }))
    },
    ['products-find'],
    { tags: ['products'] }
)

// findById
const findById = unstable_cache(
    async (id: number): Promise<Product | null> => {
        const [row] = await sql<Product[]>`
            SELECT
                p.*,
                c.name category,
                JSON_BUILD_OBJECT(
                    'name', b.name,
                    'image_url', b.image_url
                ) brand,
                u.short_name unit
            FROM ana_products p
            inner join ana_product_categories c
                on p.id_product_category_fk = c.id_product_category
            inner join ana_brands b
                on p.id_brand_fk = b.id_brand
            inner join ana_units u
                on p.id_unit_fk = u.id_unit
            WHERE p.id_product = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_product: Number(row.id_product),
            id_product_category_fk: Number(row.id_product_category_fk),
            id_brand_fk: Number(row.id_brand_fk),
            id_unit_fk: Number(row.id_unit_fk)
        }
    },
    ['products-findById'],
    { tags: ['products'] }
)

// create
async function create(params: CreateProduct): Promise<ProductDB> {
    const [row] = await sql<ProductDB[]>`
        INSERT INTO ana_products ${sql(params)}
        RETURNING *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

// update
async function update(params: UpdateProduct): Promise<ProductDB> {
    const [row] = await sql<ProductDB[]>`
        UPDATE ana_products SET ${sql(params)}
        WHERE id_product = ${params.id_product}
        RETURNING *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

// delete
async function remove(id: number): Promise<ProductDB> {
    const [row] = await sql<ProductDB[]>`
        UPDATE ana_products
        SET deleted_at = NOW()
        WHERE id_product = ${id}
        returning *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

// restore
async function restore(id: number): Promise<ProductDB> {
    const [row] = await sql<ProductDB[]>`
        UPDATE ana_products
        SET deleted_at = NULL
        WHERE id_product = ${id}
        RETURNING *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

// upload image
async function uploadImage(params: UploadProductImage): Promise<ProductDB> {

    const { id_product, file } = params

    const product = await findById(id_product)

    if (product?.image_url) await storageServices.moveToTrash(product.image_url)

    // caminho do arquivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString().slice(2)}.${fileExt}`
    const filePath = `products/${id_product}/${fileName}`

    const image_url = await storageServices.upload({ file, filePath })

    const [row] = await sql<ProductDB[]>`
        UPDATE ana_products
        SET image_url = ${image_url}
        WHERE id_product = ${id_product}
        RETURNING *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

//  remove image
async function deleteImage(id: number): Promise<ProductDB> {

    const [row] = await sql<ProductDB[]>`
        UPDATE ana_products
        SET image_url = NULL
        WHERE id_product ${id}
        RETURNING *
    `
    return {
        ...row,
        id_product: Number(row.id_product),
        id_product_category_fk: Number(row.id_product_category_fk),
        id_brand_fk: Number(row.id_brand_fk),
        id_unit_fk: Number(row.id_unit_fk)
    }
}

// ------------------- category

// findCategories
const findCategories = unstable_cache(
    async (): Promise<ProductCategory[]> => {

        const rows = await sql<ProductCategory[]>`
            SELECT * FROM ana_product_categories
        `
        return rows.map(r => ({
            ...r,
            id_product_category: Number(r.id_product_category),
            id_parent_fk: Number(r.id_parent_fk)
        }))
    },
    ['products-categories-find'],
    { tags: ['products'] }
)

// findCategoryById
const findCategoryById = unstable_cache(
    async (id: number): Promise<ProductCategory | null> => {

        const [row] = await sql<ProductCategory[]>`
            SELECT * FROM ana_product_categories
            WHERE id_product_category = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_product_category: Number(row.id_product_category),
            id_parent_fk: Number(row.id_parent_fk)
        }
    },
    ['products-categories-findById'],
    { tags: ['products'] }
)

// createCategory
async function createCategory(params: CreateProductCategory): Promise<ProductCategoryDB> {

    const [row] = await sql<ProductCategoryDB[]>`
        INSERT INTO ana_product_categories ${sql(params)}
        RETURNING *
    `
    return {
        ...row,
        id_product_category: Number(row.id_product_category),
        id_parent_fk: Number(row.id_parent_fk)
    }
}

// updateCategory
async function updateCategory(params: UpdateProductCategory): Promise<ProductCategoryDB> {

    const [row] = await sql<ProductCategoryDB[]>`
        UPDATE ana_product_categories SET ${sql(params)}
        WHERE id_product_category = ${params.id_product_category}
        RETURNING *
    `
    return {
        ...row,
        id_product_category: Number(row.id_product_category),
        id_parent_fk: Number(row.id_parent_fk)
    }
}

// deleteCategory
async function deleteCategory(id: number): Promise<ProductCategoryDB> {
    const [row] = await sql<ProductCategoryDB[]>`
        UPDATE ana_product_categories
        SET deleted_at = NOW()
        WHERE id_product_category = ${id}
        RETURNING *
    `
    return {
        ...row,
        id_product_category: Number(row.id_product_category),
        id_parent_fk: Number(row.id_parent_fk)
    }
}

// restoreCategory
async function restoreCategory(id: number): Promise<ProductCategoryDB> {
    const [row] = await sql<ProductCategoryDB[]>`
        UPDATE ana_product_categories
        SET deleted_at = NULL
        WHERE id_product_category = ${id}
        RETURNING *
    `
    return {
        ...row,
        id_product_category: Number(row.id_product_category),
        id_parent_fk: Number(row.id_parent_fk)
    }
}

const productService = {
    find,
    findById,
    create,
    update,
    uploadImage,
    deleteImage,
    delete: remove,
    restore,
    // category
    findCategories,
    findCategoryById,
    updateCategory,
    deleteCategory,
    restoreCategory
}

export default productService