import { unstable_cache } from "next/cache"
import sql from "../db"
import { InvoiceStatus, InvoiceType, InvoiceTypeCreate, InvoiceTypeUpdate } from "@/types/invoice.types"



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
async function createType(params: InvoiceTypeCreate): Promise<InvoiceType> {
    const [data] = await sql<InvoiceType[]>`
        insert into ana_invoice_types (${sql(params)})
        required *
    `
    return {...data, id_invoice_type: Number(data.id_invoice_type)}
}

// UPDATE
async function updateType(params: InvoiceTypeUpdate): Promise<InvoiceType> {
    const { id_invoice_type, name } = params

    if (!id_invoice_type) throw new Error('id ausente')
    if (!name) throw new Error('nome ausente')

    const [row] = await sql<InvoiceType[]>`
        update ana_invoice_types set
        name = ${name}
        where id_invoice_type = ${id_invoice_type}
        returning *
    `
    return {...row, id_invoice_type: Number(row)}
}

// DELETE
async function deleteType(params: InvoiceType & {id_invoice_type: number}) {

    await sql`
        delete from ana_invoice_types
        where id_invoice_type = ${params.id_invoice_type}
    `
}

// ------------------- STATUS

// FIND
const findStatus = unstable_cache(
    async () => {
        const data = await sql`select * from ana_invoice_status`

        return data.map((row) => ({
            ...row,
            id_invoice_status: Number(row.id_invoice_status)
        }))
    },
    ['invoice-status-find'],
    {tags: ["invoices"]}
)

// CREATE
async function createStatus(params: InvoiceStatus) {
    await sql`
        insert into ana_invoice_status ${sql(params)}
    `
}

// UPDATE
async function updateStatus(params: InvoiceStatus & {id_invoice_status: number}) {
    await sql`
        update ana_invoice_status set ${sql(params)}
        where id_invoice_status = ${params.id_invoice_status}
    `
}

// DELETE
async function deleteStatus(params: InvoiceStatus & {id_invoice_status: number}) {
    await sql`
        delete from ana_invoice_status where id_invoice_status = ${params.id_invoice_status}
    `
}

const invoiceService = {
    // TYPES
    findTypes,
    extistsType,
    createType,
    updateType,
    deleteType,
    // Status
    findStatus,
    createStatus,
    updateStatus,
    deleteStatus
}

export default invoiceService