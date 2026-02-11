'use server'
import clientService from "@/server/services/client.service";
import { revalidateTag, updateTag } from "next/cache";
import { redirect } from "next/navigation";

interface ActionState {
    success?: boolean
    error?: string
    client?: any
}

// creat
export async function createClient(_: ActionState, formData: FormData) {

    const clean = (key: string) => {
        const value = formData.get(key)?.toString().trim();
        return value === "" ? null : (value ?? null);
    }

    const name = clean('name')
    const contact_name = clean('contact_name')
    const id_client_category_fk = Number(formData.get('category')) || null
    const cpf = clean('cpf')
    const cnpj = clean('cnpj')
    const email = clean('email')
    const phone = clean('phone')
    const whatsapp = clean('whatsapp')
    const birth_date = (() => {
        const date = clean('birth_date');
        return date && !isNaN(Date.parse(date)) ? new Date(date) : null;
    })()

    const details = clean('details')
    const image_url = clean('image_url')


    if (!name) {
        return { success: false, error: 'Nome não foi preenchido' }
    }

    const client = {
        name, contact_name, id_client_category_fk, cpf, cnpj,
        email, phone, whatsapp, birth_date, details, image_url
    }

    let newClient

    const createAddres = formData.get('createAddress') === 'on'

    try {
        newClient = await clientService.create(client)

        if (createAddres) {
            const id_client_fk = newClient.id_client
            const name = clean('address_name')
            const zip = clean('address_zip')
            const number = clean('address_number')
            const street = clean('address_street')
            const district = clean('address_district')
            const city = clean('address_city')
            const state = clean('address_state')
            const condominium = clean('cond_name')
            const building_block = clean('cond_building_block')
            const unit_number = clean('cond_uni_number')
            const internal_street = clean('cond_street')

            if (!id_client_fk) throw new Error('Erro ao receber id do cliente cadastrado')

            const address = { id_client_fk, name, zip, number, street, district, city, state, condominium, building_block, unit_number, internal_street }

            await clientService.createAddress(address)
        }
        updateTag('clients')

    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao criar cliente' }
    }
    // if (newClient) redirect(`/admin/cliente/${newClient.id_client}`)
    redirect(`/admin/cliente/${newClient.id_client}`)
    // return { success: true }
}

// update
export async function updateClient(_: ActionState, formData: FormData) {
    const clean = (key: string) => {
        const value = formData.get(key)?.toString().trim();
        return value === "" ? null : (value ?? null);
    }

    const id_client = Number(formData.get('id_client')) || null
    const name = clean('name')
    const contact_name = clean('contact_name')
    const id_client_category_fk = Number(formData.get('id_client_category_fk')) || null
    const cpf = clean('cpf')
    const cnpj = clean('cnpj')
    const email = clean('email')
    const phone = clean('phone')
    const whatsapp = clean('whatsapp')
    const birth_date = (() => {
        const date = clean('birth_date');
        return date && !isNaN(Date.parse(date)) ? new Date(date) : null;
    })()

    const details = clean('details')
    const image_url = clean('image_url')


    if (!name) {
        return { success: false, error: 'Nome não foi preenchido' }
    }

    console.log(id_client)

    if (!id_client) return { success: false, error: 'id do cliente não informado' }

    const client = {
        id_client, name, contact_name, id_client_category_fk, cpf, cnpj,
        email, phone, whatsapp, birth_date, details, image_url
    }

    try {
        await clientService.update(client)
        updateTag('clients')
    } catch (error: any) {
        console.error(error.message)
        return { error: 'Erro' }
    }
    return { success: true }
}

// delete
export async function deleteClient(id: number){
    if(!id) return {success: false, error: 'id não informado'}
    await clientService.delete(id)
    updateTag('clients')
    redirect('/admin/clientes')
}


// 
// ADDRESS
// 

// create address
export async function createClientAddress(_: ActionState, formData: FormData) {

}

// 
// CATEGORIES
// 

// CREAT
export async function createClientCategory(_: ActionState, formData: FormData) {
    const name = formData.get('name')?.toString().trim() || null

    if (!name) return { success: false, error: 'Nome precisa ser preenchido.' }

    if (await clientService.existsCategory(name)) return { success: false, error: 'Nome já existe' }

    try {
        await clientService.createCategorie(name)
        // @ts-expect-error — bug de tipagem do Next 16 (revalidateTag aceita 1 arg em runtime)
        revalidateTag('clients')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao criar categoria' }
    }
}

// 
// image_url
// 

// update
export async function updateClientImage(_: ActionState, formData: FormData) {
    try {
        const id_client = Number(formData.get('id_client'))
        const file = formData.get('image_url') as File
        if (!file) throw new Error('Nenhuma imagem enviada.')

        const url = await clientService.updateImage({ id_client, file })

        // @ts-expect-error — bug de tipagem do Next 16 (revalidateTag aceita 1 arg em runtime)
        revalidateTag('clients')
        return { success: true }

    } catch (error: any) {
        console.error(error.message)
        return { success: false, error: 'Erro ao enviar imagem' }
    }
}