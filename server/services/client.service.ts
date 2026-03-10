import sql from '@/server/db'
import { unstable_cache } from 'next/cache'
import storageServices from './storage.service'
import { Client, ClientDB } from '@/types/client.types'
import { CreateClient, UpdateClient } from '@/schemas/client.schema'

// ------------------- CLIENTS

// FIND
const find = unstable_cache(
    async (): Promise<Client[]> => {
        const rows = await sql<Client[]>`
            select cl.*, ca.name category 
            from ana_clients cl
            inner join ana_client_categories ca
                on cl.id_client_category_fk = ca.id_client_category
        `
        return rows.map(r => ({
            ...r,
            id_client: Number(r.id_client),
            id_client_category_fk: Number(r.id_client_category_fk)
        }))
    },
    ['clients-find'],
    { tags: ['clients'] }
)

// FIND BY ID
const findById = unstable_cache(
    async (id: number): Promise<Client | null> => {
        const [row] = await sql<Client[]>`
            select cl.*, ca.name category 
            from ana_clients cl
            inner join ana_client_categories ca
                on cl.id_client_category_fk = ca.id_client_category
            where id_client = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_client: Number(row.id_client),
            id_client_category_fk: Number(row.id_client_category_fk)
        }
    },
    ['clients-findById'],
    { tags: ['clients'] }
)


// CREATE
async function create(params: CreateClient): Promise<ClientDB> {

    const [row] = await sql<Client[]>`
        insert into ana_clients ${sql(params)}
        returning *
    `
    return {
        ...row,
        id_client: Number(row.id_client),
        id_client_category_fk: Number(row.id_client_category_fk)
    }
}

// UPDATE
async function update(params: UpdateClient): Promise<ClientDB> {

    const [row] = await sql<Client[]>`
        update ana_clients set ${sql(params)}
        where id_client = ${params.id_client}
        returning *
    `
    return {
        ...row,
        id_client: Number(row.id_client),
        id_client_category_fk: Number(row.id_client_category_fk)
    }
}

// DELETE
async function remove(id: number) {
    await sql`
        delete from ana_clients
        where id_client = ${id}
    `
}

// ------------------- ADDRESSES

// FIND
const findAddressesByClient = unstable_cache(
    async (id: number) => {
        const addresses = await sql`
            select * from ana_client_addresses where id_client_fk = ${id}
        `


        return addresses.map(addr => ({
            ...addr,
            id_client_address: Number(addr.id_client_address),
            id_client_fk: Number(addr.id_client_fk)
        }))
    },
    ['clients-findAddresses'],
    { tags: ['clients'] }
)


// CREAT
async function createAddress(props: AddressParams) {

    const [address] = await sql`
        insert into ana_client_addresses ${sql(props)}
        returning *
    `
}

// delete
async function deleteAddress(id: number) {

    const [address] = await sql`
        delete from ana_client_addresses where id_client_address = ${id}
    `
}

// ------------------- CATEGORIES

// FIND
const findCategories = unstable_cache(
    async () => {
        const categories = await sql`
        select * from ana_client_categories
        order by id_client_category
    `
        return categories.map(cat => ({
            ...cat,
            id_client_category: Number(cat.id_client_category)
        }))
    },
    ['clients-findCategories'],
    { tags: ['clients'] }
)
// Existy
const existsCategory = unstable_cache(
    async (name: string) => {
        const [category] = await sql`
        select name from ana_client_categories
        where LOWER(name) = LOWER(${name})
    `
        return category
    },
    ['clients-existsCategory'],
    { tags: ['clients'] }
)

// CREATE
async function createCategory(name: string) {
    const [category] = await sql`
        insert into ana_client_categories (name) values
        (${name})
        returning *
    `
    if (!category) throw new Error('Erro ao cadastrar categoria')
    return category
}

// UPDATE
async function updateCategory({ id_client_category, name }: { id_client_category: number, name: string }) {
    await sql`
        update ana_client_categories
        set name = ${name}
        where id_client_category = ${id_client_category}
    `
}

// DELETE
async function deleteCategory(id: number) {
    const [categoty] = await sql`
        delete from ana_client_categories where id_client_category = ${id}
    `
}

// ------------------- IMAGE

async function updateImage({ id_client, file }: { id_client: number, file: File }) {
    if (!file || !file.name) {
        throw new Error("Arquivo inválido ou não selecionado.");
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString().slice(2)}.${fileExt}`
    const filePath = `clients/${id_client}/${fileName}`

    const image_url = await storageServices.image({ file, filePath })

    await sql`
        UPDATE ana_clients 
        SET image_url = ${image_url} 
        WHERE id_client = ${id_client}
    `
}

const clientService = {
    find,
    findById,
    create,
    update,
    delete: remove,

    // addresses
    findAddresses,
    createAddress,
    deleteAddress,

    // category
    findCategories,
    existsCategory,
    createCategory,
    updateCategory,
    deleteCategory,

    // image
    updateImage
}

export default clientService