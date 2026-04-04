import { z } from 'zod'

// Helper para tratar boolena
const toBoolean = (val: unknown) => {

    if (typeof val === 'boolean') return val

    if (typeof val === 'string') {
        if (val.toLowerCase() === 'true') return true
        if (val.toLowerCase() === 'false') return false
    }
    if (typeof val === 'number') {
        if (val === 1) return true
        if (val === 0) return false
    }
    return null
}

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: unknown) => {

    if (typeof val !== 'number' && typeof val !== 'string') return null

    const valString = String(val).trim()

    return valString === '' ? null : valString
}

// create product schema
export const createProductSchema = z.object({
    id_product_category_fk: z.preprocess(emptyToNull, // se fosse null converteria para 0
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    id_brand_fk: z.preprocess(emptyToNull,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    id_unit_fk: z.preprocess(emptyToNull,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    ),
    name: z.preprocess(emptyToNull,
        z.string('Mínimo 3 caracteres').trim().min(3, 'Mínimo 3 caracteres')
    ),
    price_original: z.preprocess(emptyToNull,
        z.coerce.number('Preço original precisa ser número').min(0, 'Preço original >= 0')
    ),
    price_discount: z.coerce.number('Preço original precisa ser número').min(0, 'Preço original precisa ser >= 0').optional()
    ,
    price_cost: z.preprocess(emptyToNull,
        z.coerce.number('Preço de custo precisa ser número').min(0, 'Preço de custo deve ser >= 0')
    ),
    amount: z.preprocess(emptyToNull,
        z.coerce.number('Quantidade precisa ser um número').min(1, 'A quantidade precisa ser no mínimo 1 ou 0.001').optional()
    ),
    image_url: z.url('Precisa ser um link url https válido').optional()
})

// update product schema
export const updateProductSchema = createProductSchema.partial().extend({
    id_product: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    )
})

// types
export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>

// -------------------------------------------------------

// create product category schema
export const createProductCategorySchema = z.object({
    id_parent_fk: z.preprocess(emptyToNull,
        z.coerce.number().positive().nullable().optional()
    ),
    name: z.preprocess(emptyToNull,
        z.string().min(3, 'Mínimo 3 caracteres')
    )
})

// update product category schema
export const updateProductCategorySchema = createProductCategorySchema.partial().extend({
    id_product_category: z.preprocess(emptyToNull,
        z.coerce.number("Campo deve ser um número").positive("Deve ser um número positivo")
    )
})

// types
export type CreateProductCategory = z.infer<typeof createProductCategorySchema>
export type UpdateProductCategory = z.infer<typeof updateProductCategorySchema>

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