import sql from '@/server/db'
import { unstable_cache } from 'next/cache'

interface CreateClientParans {
    name: string
    category: number | null
    email?: string | null
    phone?: string | null
    whatsapp?: string | null
    birth_date?: Date | null
    details?: string | null
    image_url?: string | null
}

// 
// --- CLIENTS
// 

// FIND
const find = unstable_cache(
    async () => await sql`select * from ana_clients`,
    ['client-find'],
    { tags: ['clients'] }
)

// FIND BY ID
export const findById = (id: number) => unstable_cache(
    async () => {
        const [client] = await sql`
            select
                cl.*,
                ca.name category
            from ana_clients cl
            inner join ana_client_categories ca
                on cl.id_client_category_fk = ca.id_client_category
            where id_client = ${id}
        `;
        if (!client) throw Error('Cliente não encontrado');
        return client;
    },
    [`client-find-by-id-${id}`],
    { tags: ['clients', `client-${id}`] }
)()

// CREATE
export async function create({ name, category, email, phone, whatsapp, birth_date, details, image_url }: CreateClientParans) {
    const [client] = await sql`
        insert into ana_clients (name, id_client_category_fk, email, phone, whatsapp, birth_date, details, image_url) values
        (${name}, ${category ?? null}, ${email ?? null}, ${phone ?? null}, ${whatsapp ?? null}, ${birth_date ?? null}, ${details ?? null}, ${image_url ?? null} )
        returning *
    `
    if (!client) throw Error('Erro ao cadastrar cliente')
    return client
}

// 
// --- ADDRESSES
// 

// FIND
export async function findAddresses(id: number) {
    const addresses = await sql`
        select * from ana_client_addresses where id_client_fk = ${id}
    `
    return addresses
}

// 
// -- CATEGORIES
// 

// FIND
export async function findCategories() {
    const categories = await sql`
        select * from ana_client_categories
    `
    return categories
}

// Existy

export async function existsCategory(name: string){
    const [category] = await sql`
    select name from ana_client_categories
    where LOWER(name) = LOWER(${name})
    `
    return !!category
}

// CREATE
export async function createCategorie(name: string) {
    const [category] = await sql`
        insert into ana_client_categories (name) values
        (${name})
        returning *
    `
    if (!category) throw Error('Erro ao cadastrar categoria')
    return category
}

const clientService = {
    find,
    findById,
    create,
    findAddresses,
    findCategories,
    existsCategory,
    createCategorie
}

export default clientService