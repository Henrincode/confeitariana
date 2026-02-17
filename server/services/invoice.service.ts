import { unstable_cache } from "next/cache"
import sql from "../db"

interface InvoiceType {
    id_invoice_type: number,
    name: string,
    created_at: Date
}

// ------------------- TYPES

// FIND
const findTypes = unstable_cache(
    async (): Promise<InvoiceType[]> => await sql<InvoiceType[]>`
        select * from ana_invoice_types`,
    ['invoices-findTypes'],
    { tags: ['invoices'] }
)

// EXISTY


// CREATE
const createType = unstable_cache(
    async (name: string) => {

        await sql`
            insert into ana_invoice_types (name) values
            (${name})
        `
    },
    ['invoices-createType'],
    { tags: ['invoices'] }
)

// UPDATE
const updateType = unstable_cache(
    async ({ id_invoice_type, name }: InvoiceType) => {

        const [data] = await sql<InvoiceType[]>`
            update ana_invoice_types set
            name = ${name}
            where id = ${id_invoice_type}
        `
    }
)

// DELETE
const deleteType = unstable_cache(
    async ({ id_invoice_type }: InvoiceType) => {
        await sql`
            delete from ana_invoice_types
            where id_invoice_type = ${id_invoice_type}
        `
    }
)

const invoiceService = {
    findTypes,
    createType,
    updateType,
    deleteType
}

export default invoiceService