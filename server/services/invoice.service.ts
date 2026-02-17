import { unstable_cache } from "next/cache"
import sql from "../db"

interface InvoiceType {
    id_invoice_type?: number | null,
    name?: string | null,
    created_at?: Date | null
}

// ------------------- TYPES

// FIND
const findTypes = unstable_cache(
    async () => {
        const data = await sql`select * from ana_invoice_types`

        return data.map((d) => ({
            ...d,
            id_invoice_type: Number(d.id_invoice_type)
        }))
    },
    ['invoices-findTypes'],
    { tags: ['invoices'] }
)

// EXISTY
const extistsType = unstable_cache(
    async (name: string) => {
        const [data] = await sql`
            select * from ana_invoice_types
            where lower(name) = lower(${name})
        `
        return data
    },
    ['invoices-existsType'],
    { tags: ['invoices'] }
)

// CREATE
async function createType(name: string) {
    await sql`
        insert into ana_invoice_types (name) values
        (${name})
    `
}

// UPDATE
async function updateType(params: InvoiceType) {
    const { id_invoice_type, name } = params

    if (!id_invoice_type) throw new Error('id ausente')
    if (!name) throw new Error('nome ausente')

    await sql`
        update ana_invoice_types set
        name = ${name}
        where id_invoice_type = ${id_invoice_type}
    `
}

// DELETE
async function deleteType({ id_invoice_type }: InvoiceType) {
    if (!id_invoice_type) throw new Error('id ausente')

    await sql`
        delete from ana_invoice_types
        where id_invoice_type = ${id_invoice_type}
    `
}

const invoiceService = {
    findTypes,
    extistsType,
    createType,
    updateType,
    deleteType
}

export default invoiceService