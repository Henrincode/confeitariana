import sql from "../db";
import { unstable_cache } from "next/cache";
import { Brand, BrandDB } from "@/types/brand.types";
import { CreateBrand, UpdateBrand } from "@/schemas/brand.schema";

// ------------------- brand

// find
const find = unstable_cache(
    async (): Promise<Brand[]> => {
        const rows = await sql<Brand[]>`
            SELECT * FROM ana_brands
        `
        return rows.map(r => ({
            ...r,
            id_brand: Number(r.id_brand)
        }))
    },
    ['brands-find'],
    { tags: ['brands'] }
)

// findById
const findById = unstable_cache(
    async (id: number): Promise<Brand | null> => {
        const [row] = await sql<Brand[]>`
            SELECT * FROM ana_brands
            WHERE id_brand = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_brand: Number(row.id_brand)
        }
    },
    ['brands-findById'],
    { tags: ['brands'] }
)

// create
async function create(params: CreateBrand): Promise<BrandDB> {
    const [row] = await sql<BrandDB[]>`
        INSERT INTO ana_brands ${sql(params)}
        returning *
    `
    return {
        ...row,
        id_brand: Number(row.id_brand)
    }
}

// update
async function update(params: UpdateBrand): Promise<BrandDB> {
    const [row] = await sql<BrandDB[]>`
        UPDATE ana_brands SET ${sql(params)}
        WHERE id_brand = ${params.id_brand}
        RETURNING *
    `
    return {
        ...row,
        id_brand: Number(row.id_brand)
    }
}

// delete
async function remove(id: number): Promise<BrandDB> {
    const [row] = await sql<BrandDB[]>`
        UPDATE ana_brands
        SET deleted_at = NOW()
        WHERE id_brand = ${id}
        RETURNING *
    `
    return {
        ...row,
        id_brand: Number(row.id_brand)
    }
}

// restore
async function restore(id: number): Promise<BrandDB> {
    const [row] = await sql<BrandDB[]>`
        UPDATE ana_brands
        SET deleted_at = NULL
        WHERE id_brand = ${id}
        RETURNING *
    `
    return {
        ...row,
        id_brand: Number(row.id_brand)
    }
}

const brandService = {
    find,
    findById,
    create,
    update,
    delete: remove,
    restore
}

export default brandService