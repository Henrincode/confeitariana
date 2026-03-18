'use server'
import { createClientAddressSchema, CreateClient, CreateClientAddress,   createClientSchema, UpdateClient,   updateClientSchema, UploadClientImage, uploadClientImageSchema, UpdateClientAddress, updateClientAddressSchema, UpdateClientType, updateClientTypeSchema, CreateClientType, createClientTypeSchema } from "@/schemas/client.schema";
import clientService from "@/server/services/client.service";
import { ApiResponse } from "@/types/ApiResponse";
import { ClientAddressDB,  ClientDB, ClientTypeDB } from "@/types/client.types";
import { updateTag } from "next/cache";
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

    const paramsValidate = createClientAddressSchema.safeParse(paramsToObj)

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

// address update
export async function updateClientAddress(params: FormData | UpdateClientAddress): ApiResponse<ClientAddressDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = updateClientAddressSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: 'Existem erros de validação.',
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.updateAddress(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }
    } catch (error) {
        console.error('ERROR ACTION updateClientAddress', error)
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
export async function createClientType(params: FormData | CreateClientType): ApiResponse<ClientTypeDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = createClientTypeSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.createType(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION createClientType', error)
        return { success: false, message: 'Erro interno do servidor' }
    }

}

// UPDATE
export async function updateClientType(params: FormData | UpdateClientType): ApiResponse<ClientTypeDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = updateClientTypeSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: "Existem erros de validação.",
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await clientService.updateType(paramsValidate.data)
        updateTag('clients')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION updateClientType', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// DELETE
export async function deleteClientType(id: number) {
    try {
        await clientService.deleteType(id)
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
export async function uploadClientImage(params: FormData | UploadClientImage): ApiResponse<ClientDB> {

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