'use server'
import { CreateProduct, createProductSchema, UpdateProduct, updateProductSchema, UploadProductImage, uploadProductImageSchema } from "@/schemas/product.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { ProductCategory, ProductDB } from "@/types/product.types";
import z, { object } from "zod";
import productService from "../services/product.service";
import { updateTag } from "next/cache";


// create
export async function createProduct(params: FormData | CreateProduct): ApiResponse<ProductDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = createProductSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: 'Existem erros de validação',
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await productService.create(paramsValidate.data)
        updateTag('products')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION createProduct', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// update
export async function updateProduct(params: FormData | UpdateProduct): ApiResponse<ProductDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = updateProductSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) return {
        success: false,
        message: 'Existem erros de validação',
        errors: z.flattenError(paramsValidate.error).fieldErrors
    }

    try {
        const data = await productService.update(paramsValidate.data)
        updateTag('products')
        return {success: true, data}
    } catch(error) {
        console.error("ERROR ACTION updateProduct", error)
        return {success: false, message: 'Erro interno do servidor'}
    }
}

// uploadImage
export async function uploadProductImage(params: FormData | UploadProductImage): ApiResponse<ProductDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = uploadProductImageSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) {
        return {
            success: false,
            message: "Erro ao enviar o arquivo",
            errors: z.flattenError(paramsValidate.error).fieldErrors
        }
    }

    try {
        console.log(paramsValidate.data)
        const data = await productService.uploadImage(paramsValidate.data)
        updateTag('products')
        return { success: true, data }

    } catch (error) {
        console.error('ERROR ACTION uploadProductImage', error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}
// deleteImage
// delete
export async function deleteProduct(id: number): ApiResponse<ProductDB> {
    if (!id || id < 1 || isNaN(id)) return { success: false, message: "ID deve ser um número" }

    try {
        const data = await productService.delete(id)
        updateTag('products')
        return { success: true, data }
    } catch (error) {
        console.error("ERROR ACTION productDelete", error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}
// restore

// ------------------- category

// find
export async function findProductCategories(): ApiResponse<ProductCategory[]> {
    try {
        const data = await productService.findCategories()
        return { success: true, data }
    } catch (error) {
        console.error("ERROR ACTION findPRoductCategories", error)
        return { success: false, message: 'Erro interno do servidor' }
    }
}

// create
// update
// delete
// restore