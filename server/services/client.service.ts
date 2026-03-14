import sql from '@/server/db'
import { unstable_cache } from 'next/cache'
import storageServices from './storage.service'
import { Client, ClientDB, ClientAddress, ClientAddressDB, ClientCategory, ClientCategoryDB, ClientUploadImage } from '@/types/client.types'
import { CreateClient, CreateClientAddress, CreateClientCategory, UpdateClient, UpdateClientCategory } from '@/schemas/client.schema'

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

    const [row] = await sql<ClientDB[]>`
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

    const [row] = await sql<ClientDB[]>`
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
async function remove(id: number): Promise<ClientDB> {
    const [row] = await sql<ClientDB[]>`
        delete from ana_clients
        where id_client = ${id}
        returning *
    `
    return {
        ...row,
        id_client: Number(row.id_client),
        id_client_category_fk: Number(row.id_client_category_fk)
    }
}

// ------------------- ADDRESSES

// FIND
const findAddressesByClient = unstable_cache(
    async (id: number): Promise<ClientAddress[]> => {
        const rows = await sql<ClientAddress[]>`
            select * from ana_client_addresses where id_client_fk = ${id}
        `
        return rows.map(r => ({
            ...r,
            id_client_address: Number(r.id_client_address),
            id_client_fk: Number(r.id_client_fk)
        }))
    },
    ['clients-findAddresses'],
    { tags: ['clients'] }
)


// CREAT
async function createAddress(params: CreateClientAddress): Promise<ClientAddressDB> {

    const [row] = await sql<ClientAddressDB[]>`
        insert into ana_client_addresses ${sql(params)}
        returning *
    `
    return {
        ...row,
        id_client_address: Number(row.id_client_address),
        id_client_fk: Number(row.id_client_fk)
    }
}

// delete
async function deleteAddress(id: number): Promise<ClientAddressDB> {

    const [row] = await sql<ClientAddressDB[]>`
        delete from ana_client_addresses where id_client_address = ${id}
        returning *
    `
    return {
        ...row,
        id_client_address: Number(row.id_client_address),
        id_client_fk: Number(row.id_client_fk)
    }
}

// ------------------- CATEGORIES

// FIND
const findCategories = unstable_cache(
    async (): Promise<ClientCategory[]> => {
        const rows = await sql<ClientCategory[]>`
        select * from ana_client_categories
        order by id_client_category
    `
        return rows.map(r => ({
            ...r,
            id_client_category: Number(r.id_client_category)
        }))
    },
    ['clients-findCategories'],
    { tags: ['clients'] }
)

// Existy
// const existsCategory = unstable_cache(
//     async (name: string) => {
//         const [category] = await sql`
//         select name from ana_client_categories
//         where LOWER(name) = LOWER(${name})
//     `
//         return category
//     },
//     ['clients-existsCategory'],
//     { tags: ['clients'] }
// )

// CREATE
async function createCategory(params: CreateClientCategory): Promise<ClientCategoryDB> {
    const [row] = await sql<ClientCategoryDB[]>`
        insert into ana_client_categories ${sql(params)}
        returning *
    `
    return {
        ...row,
        id_client_category: Number(row.id_client_category)
    }
}

// UPDATE
async function updateCategory(params: UpdateClientCategory): Promise<ClientCategoryDB> {
    const [row] = await sql<ClientCategoryDB[]>`
        update ana_client_categories set ${sql(params)}
        where id_client_category = ${params.id_client_category}
        returning *
    `
    return {
        ...row,
        id_client_category: Number(row.id_client_category)
    }
}

// DELETE
async function deleteCategory(id: number): Promise<ClientCategoryDB> {
    const [row] = await sql<ClientCategoryDB[]>`
        delete from ana_client_categories
        where id_client_category = ${id}
        returning *
    `
    return {
        ...row,
        id_client_category: Number(row.id_client_category)
    }
}

// ------------------- IMAGE

async function uploadImage(params: ClientUploadImage): Promise<ClientDB> {
    const { id_client, file } = params
    if (!file || !file.name) {
        throw new Error("Arquivo inválido ou não selecionado.");
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString().slice(2)}.${fileExt}`
    const filePath = `clients/${id_client}/${fileName}`

    const image_url = await storageServices.image({ file, filePath })

    const [row] = await sql<ClientDB[]>`
    UPDATE ana_clients 
    SET image_url = ${image_url} 
    WHERE id_client = ${id_client}
    returning *
    `
    return {
        ...row,
        id_client: Number(row.id_client),
        id_client_category_fk: Number(row.id_client_category_fk)
    }
}

const clientService = {
    find,
    findById,
    create,
    update,
    delete: remove,

    // addresses
    findAddressesByClient,
    createAddress,
    deleteAddress,

    // category
    findCategories,
    // existsCategory,
    createCategory,
    updateCategory,
    deleteCategory,

    // image
    uploadImage
}

export default clientService