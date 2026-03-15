'use server'
import { createCliencAddressSchema, CreateClient, CreateClientAddress, CreateClientCategory, createClientCategorySchema, createClientSchema, UpdateClient, UpdateClientCategory, updateClientCategorySchema, updateClientSchema, UploadClientImage, uploadClientImageSchema } from "@/schemas/client.schema";
import clientService from "@/server/services/client.service";
import { ApiResponse } from "@/types/ApiResponse";
import { ClientAddressDB, ClientCategoryDB, ClientDB } from "@/types/client.types";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z, { success } from "zod";

// creat
export async function createClient(params: FormData | CreateClient): ApiResponse<ClientDB> {

    // transform FormData to obj
    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    // valida chaves do objeto
    const paramsValidate = createClientSchema.safeParse(paramsToObj)

    // retorna erros caso exista
    if (!paramsValidate.success) {
        return {
            success: false,
            message: "Existem erros de validação.",
            errors: z.flattenError(paramsValidate.error).fieldErrors
        }
    }

    // abre try/cach para tratar erros do banco
    try {
        // envia dados para a service
        const data = await clientService.create(paramsValidate.data)
        // revalida o cache
        updateTag('clients')
        // retorna os dados cadastrados
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION createClient', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// update
export async function updateClient(params: FormData | UpdateClient): ApiResponse<ClientDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = updateClientSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.update(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION updateClient', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// delete
export async function deleteClient(id: number): ApiResponse<ClientDB> {
    if (!id || isNaN(id) || id < 1) return { success: false, message: 'ID não informado ou não é do tipo Number' }

    try {
        const data = await clientService.delete(id)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION deleteClient', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}


// 
// ADDRESS
// 

// create address
export async function createClientAddress(params: FormData | CreateClientAddress): ApiResponse<ClientAddressDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = createCliencAddressSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.createAddress(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION createClientAddress', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// adress delete
export async function deleteClientAddress(id: number): ApiResponse<ClientAddressDB> {

    if (!id || isNaN(id) || id < 1) return { success: false, message: 'ID não informado ou não é do tipo Number' }

    try {
        const data = await clientService.deleteAddress(id)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.log('ERROR ACTION deleteClientAddress', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// 
// CATEGORIES
// 

// CREAT
export async function createClientCategory(params: FormData | CreateClientCategory): ApiResponse<ClientCategoryDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = createClientCategorySchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.createCategory(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION createClientCategory', error)
        return { success: false, message: 'Erro interno do servidor' }
    }

}

// UPDATE
export async function updateClientCategory(params: FormData | UpdateClientCategory): ApiResponse<ClientCategoryDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = updateClientCategorySchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.updateCategory(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION updateClientCategory', error)
        return { success: false, message: 'Erro interno do servidor' }
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
export async function uploadClientImage(params: FormData | UploadClientImage ): ApiResponse<ClientDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = uploadClientImageSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.uploadImage(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error: any) {
        console.error(error.message)
        return { success: false, message: 'Erro ao enviar imagem' }
    }
}