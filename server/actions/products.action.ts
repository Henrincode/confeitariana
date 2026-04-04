'use server'
import { CreateProduct, createProductSchema } from "@/schemas/product.schema";
import { ApiResponse } from "@/types/ApiResponse";
import { ProductDB } from "@/types/product.types";
import z from "zod";
import productService from "../services/product.service";
import { updateTag } from "next/cache";


// create
export async function createProduct(params: FormData | CreateProduct): ApiResponse<ProductDB> {

    const paramsToObj = params instanceof FormData
        ? Object.fromEntries(params.entries())
        : params

    const paramsValidate = createProductSchema.safeParse(paramsToObj)

    if (!paramsValidate.success) {
        return {
            success: false,
            message: 'Existem erros de validação',
            errors: z.flattenError(paramsValidate.error).fieldErrors
        }
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
// uploadImage
// deleteImage
// delete
// restore

// ------------------- category

// create
// update
// delete
// restore