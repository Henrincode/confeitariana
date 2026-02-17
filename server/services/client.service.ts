import sql from '@/server/db'
import { unstable_cache } from 'next/cache'
import storageServices from './storage.service'

interface ClientParams {
    id_client?: number | null
    id_client_category_fk?: number | null
    name?: string
    contact_name?: string | null
    contact_cpf?: string | null
    contact_cnpj?: string | null
    email?: string | null
    phone?: string | null
    whatsapp?: string | null
    birth_date?: Date | null
    details?: string | null
    image_url?: string | null
}

interface AddressParams {
    id_client_fk: number
    name?: string | null
    zip?: string | null
    number?: string | null
    street?: string | null
    district?: string | null
    city?: string | null
    state?: string | null
    condominium?: string | null
    building_block?: string | null
    unit_number?: string | null
    internal_street?: string | null
    details?: string | null
}

// ------------------- CLIENTS

// FIND
const find = unstable_cache(
    async () => await sql`select * from ana_clients`,
    ['clients-find'],
    { tags: ['clients'] }
)

// FIND BY ID
const findById = unstable_cache(
    async (id: number) => {
        const [client] = await sql`
            select cl.*, ca.name category 
            from ana_clients cl
            inner join ana_client_categories ca
                on cl.id_client_category_fk = ca.id_client_category
            where id_client = ${id}
        `
        if (client) {
            client.id_client = Number(client.id_client)
            client.id_client_category_fk = Number(client.id_client_category_fk)
        }

        return client || null
    },
    ['clients-findById'],
    { tags: ['clients'] }
)


// CREATE
async function create(params: ClientParams): Promise<ClientParams> {
    // const { name, contact_name, category, email, phone, whatsapp, birth_date, details, image_url } = params

    if (!params.name) throw new Error('Nome do cliente precisa ser preenchido')

    const [client] = await sql`
        insert into ana_clients ${sql(params)}
        returning *
    `
    if (!client) throw Error('Erro ao cadastrar cliente')
    return client
}

// UPDATE
async function update(params: ClientParams): Promise<ClientParams> {

    if (!params.id_client) throw new Error('O id_client não foi informado')
    if (!params.name) throw new Error('Nome do cliente precisa ser preenchido')

    const [client] = await sql`
        update ana_clients set ${sql(params)}
        where id_client = ${params.id_client}
        returning *
    `
    if (!client) throw new Error('Erro ao alterar dados do cliente')
    return client
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
const findAddresses = unstable_cache(
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