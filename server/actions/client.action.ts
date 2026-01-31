'use server'
import clientService from "@/server/services/client.service";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

interface ActionState {
    success?: boolean
    error?: string
    client?: any
}

// creat
export async function createClient(_: ActionState, formData: FormData) {
    const name = formData.get('name')?.toString().trim() ?? null
    const contact_name = formData.get('contact_name')?.toString().trim() ?? null
    const category = Number(formData.get('category'))
    const email = formData.get('email')?.toString().trim() ?? null
    const phone = formData.get('phone')?.toString().trim() ?? null
    const whatsapp = formData.get('whatsapp')?.toString().trim() ?? null
    const raw_birth_date = formData.get('birth_date')?.toString().trim() ?? null

    const birth_date =
        raw_birth_date && !isNaN(Date.parse(raw_birth_date))
            ? new Date(raw_birth_date)
            : null

    const details = formData.get('details')?.toString().trim() ?? null
    const image_url = formData.get('image_url')?.toString().trim() ?? null

    if (!name) {
        return { success: false, error: 'Nome não foi preenchido' }
    }

    const client = { name, contact_name, category, email, phone, whatsapp, birth_date, details, image_url }
    let newClient

    try {
        newClient = await clientService.create(client)
        // @ts-expect-error — bug de tipagem do Next 16 (revalidateTag aceita 1 arg em runtime)
        revalidateTag('clients')
        
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao criar cliente' }
    }
    if (newClient) redirect(`/admin/cliente/${newClient.id_client}`)
    return { success: true }
}

// CATEGORIES

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