import sql from '@/server/db'
import { unstable_cache } from 'next/cache'
import storageServices from './storage.service'
import { Client, ClientDB, ClientAddress, ClientAddressDB, ClientUploadImage, ClientType, ClientTypeDB } from '@/types/client.types'
import { CreateClient, CreateClientAddress, CreateClientType, UpdateClient, UpdateClientAddress, UpdateClientType } from '@/schemas/client.schema'

// ------------------- CLIENTS

// FIND
const find = unstable_cache(
    async (): Promise<Client[]> => {
        const rows = await sql<Client[]>`
            select cl.*, ty.name type 
            from ana_clients cl
            inner join ana_client_types ty
                on cl.id_client_type_fk = ty.id_client_type
        `
        return rows.map(r => ({
            ...r,
            id_client: Number(r.id_client),
            id_client_type_fk: Number(r.id_client_type_fk)
        }))
    },
    ['clients-find'],
    { tags: ['clients'] }
)

// FIND BY ID
const findById = unstable_cache(
    async (id: number): Promise<Client | null> => {
        const [row] = await sql<Client[]>`
            select cl.*, ty.name type 
            from ana_clients cl
            inner join ana_client_types ty
                on cl.id_client_type_fk = ty.id_client_type
            where id_client = ${id}
        `
        if (!row) return null

        return {
            ...row,
            id_client: Number(row.id_client),
            id_client_type_fk: Number(row.id_client_type_fk)
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
        id_client_type_fk: Number(row.id_client_type_fk)
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
        id_client_type_fk: Number(row.id_client_type_fk)
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
        id_client_type_fk: Number(row.id_client_type_fk)
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

// update
async function updateAddress(params: UpdateClientAddress): Promise<ClientAddressDB> {

    const [row] = await sql<ClientAddressDB[]>`
        UPDATE ana_client_addresses set ${sql(params)}
        WHERE id_client_address = ${params.id_client_address}
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

// ------------------- types

// FIND
const findTypes = unstable_cache(
    async (): Promise<ClientType[]> => {
        const rows = await sql<ClientType[]>`
        select * from ana_client_types
        order by id_client_type
    `
        return rows.map(r => ({
            ...r,
            id_client_type: Number(r.id_client_type)
        }))
    },
    ['clients-findTypes'],
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
async function createType(params: CreateClientType): Promise<ClientTypeDB> {
    const [row] = await sql<ClientTypeDB[]>`
        insert into ana_client_types ${sql(params)}
        returning *
    `
    return {
        ...row,
        id_client_type: Number(row.id_client_type)
    }
}

// UPDATE
async function updateType(params: UpdateClientType): Promise<ClientTypeDB> {
    const [row] = await sql<ClientTypeDB[]>`
        update ana_client_types set ${sql(params)}
        where id_client_type = ${params.id_client_type}
        returning *
    `
    return {
        ...row,
        id_client_type: Number(row.id_client_type)
    }
}

// DELETE
async function deleteType(id: number): Promise<ClientTypeDB> {
    const [row] = await sql<ClientTypeDB[]>`
        delete from ana_client_types
        where id_client_type = ${id}
        returning *
    `
    return {
        ...row,
        id_client_type: Number(row.id_client_type)
    }
}

// ------------------- IMAGE

async function uploadImage(params: ClientUploadImage): Promise<ClientDB> {

    const { id_client, file } = params

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
        id_client_type_fk: Number(row.id_client_type_fk)
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
    updateAddress,
    deleteAddress,

    // category
    findTypes,
    // existsCategory,
    createType,
    updateType,
    deleteType,

    // image
    uploadImage
}

export default clientService