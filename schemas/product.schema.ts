import { z } from 'zod'

// Helper para tratar boolena
const toBoolean = (val: unknown) => {
    if (typeof val === 'string') {
        if (val.toLowerCase() === 'true') return true
        if (val.toLowerCase() === 'false') return false
    }
    if (typeof val === 'number') {
        if (val === 1) return true
        if (val === 0) return false
    }
    return val === 'boolean' ? val : undefined
}

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: unknown) => {

    if (typeof val === 'boolean') return String(val)
    if (typeof val === "string" && val.trim() === "") return null

    return val
}

const emptyToUndefined = (val: unknown) =>
    emptyToNull(val) === null ? undefined : val

// create product schema
export const createProduct = z.object({
    id_product_category_fk: z.preprocess(emptyToUndefined, // se fosse null converteria para 0
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    id_brand_fk: z.preprocess(emptyToUndefined,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    id_unit_fk: z.preprocess(emptyToUndefined,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    name: z.preprocess(emptyToUndefined,
        z.coerce.string().trim().min(3, 'Mínimo 3 caracteres')
    ),
    price_original: z.preprocess(emptyToUndefined,
        z.coerce.number('Preço original precisa ser número').min(0, 'Preço original >= 0')
    ),
    price_discount: z.preprocess(emptyToUndefined,
        z.coerce.number('Preço original precisa ser número').min(0, 'Preço original precisa ser >= 0').optional()
    ),
    price_cost: z.preprocess(emptyToUndefined,
        z.coerce.number('Preço de custo precisa ser número').min(0, 'Preço de custo deve ser >= 0')
    ),
    image_url: z.url('Precisa ser um link url https válido').optional()
})

// update product schema
export const updateProduct = createProduct.partial().extend({
    id_product: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    )
})

// types
export type CreateProduct = z.infer<typeof createProduct>
export type UpdateProduct = z.infer<typeof updateProduct>

// -------------------------------------------------------

// create product category schema
export const createProductCategory = z.object({
    id_parent_fk: z.preprocess(emptyToNull,
        z.coerce.number().positive().nullable().optional()
    ),
    name: z.preprocess(emptyToUndefined,
        z.string().min(3, 'Mínimo 3 caracteres')
    )
})

// update product category schema
export const updateProductCategory = createProductCategory.partial().extend({
    id_product_category: z.preprocess(emptyToUndefined,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    )
})

// types
export type CreateProductCategory = z.infer<typeof createProductCategory>
export type UpdateProductCategory = z.infer<typeof updateProductCategory>

// -------------------------------------------------------

// upload product image schema
export const uploadProductImageSchema = z.object({
    id_product: z.coerce.number().positive("ID do cliente é obrigatório"),
    file: z.instanceof(File, { message: 'Selecione uma imagem válida' })
        .refine((file) => file.size <= 5 * 1024 * 1024, 'O arquivo deve ter no máximo 5MB')
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 'Formato de imagem inválido')
})

// type
export type uploadProductImage = z.infer<typeof uploadProductImageSchema>