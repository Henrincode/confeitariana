'use server'
import { CreateClient, createClientSchema } from "@/schemas/client.schema";
import clientService from "@/server/services/client.service";
import { ApiResponse } from "@/types/ApiResponse";
import { ClientDB } from "@/types/client.types";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

interface ActionState {
    success?: boolean
    error?: string
    client?: any
}

// creat
export async function createClient(params: FormData | CreateClient): ApiResponse<CreateClient> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params;

    const paramsValidate = createClientSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) {
        return {
            success: false,
            message: "Existem erros de validação.",
            errors: z.flattenError(paramsValidate.error).fieldErrors
        }
    }

    try {

    } catch(error) {
        
    }
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
export async function deleteClient(id: number) {
    if (!id) return { success: false, error: 'id não informado' }
    await clientService.delete(id)
    updateTag('clients')
    redirect('/admin/clientes')
}


// 
// ADDRESS
// 

// create address
export async function createClientAddress(_: ActionState, formData: FormData) {
    const clean = (key: string) => {
        const value = formData.get(key)?.toString().trim();
        return value === "" ? null : (value ?? null);
    }
    try {
        const id_client_fk = Number(formData.get('id_client_fk')) || null
        const name = clean('name')
        const zip = clean('zip')
        const number = clean('number')
        const street = clean('street')
        const district = clean('district')
        const city = clean('city')
        const state = clean('state')
        const condominium = clean('condominium')
        const building_block = clean('building_block')
        const unit_number = clean('uni_number')
        const internal_street = clean('street')

        if (!id_client_fk) return { success: false, error: 'id do cliente não informado' }

        const address = {
            id_client_fk, name, zip, number, street, district, city, state,
            condominium, building_block, unit_number, internal_street
        }

        console.log(address)

        await clientService.createAddress(address)

        updateTag('clients')

    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao criar endereço' }
    }
    console.log('fooooi')
    return { success: true }
}

// adress delete
export async function deleteClientAddress(id: number) {
    try {
        await clientService.deleteAddress(id)
        updateTag('clients')
    } catch (error) {
        console.log(error)
    }
}

// 
// CATEGORIES
// 

// CREAT
export async function createClientCategory(input_name: string) {
    const name = input_name?.toString().trim() || null

    if (!name) return { success: false, error: 'Nome precisa ser preenchido.' }

    if (await clientService.existsCategory(name)) return { success: false, error: 'Nome já existe' }

    try {
        await clientService.createCategory(name)
        updateTag('clients')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao criar categoria' }
    }
}

// UPDATE
export async function updateClientCategory(category: { id_client_category: number, name: string }) {
    try {
        await clientService.updateCategory(category)
        updateTag('clients')
    } catch (error) {
        console.error(error)
    }
}

// DELETE
export async function deleteClientCategory(id: number) {
    try {
        await clientService.deleteCategory(id)
        updateTag('clients')
        return { success: true }
    } catch (error: any) {
        console.error(error)
        return { success: false, error: error.code }
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

        updateTag('clients')
        return { success: true }

    } catch (error: any) {
        console.error(error.message)
        return { success: false, error: 'Erro ao enviar imagem' }
    }
}