import { z } from 'zod'

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: string) => val === "" ? null : val

// create product schema
export const CreateProduct = z.object({
    id_product_category_fk: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    ),
    id_brand_fk: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    ),
    id_unit_fk: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    ),
    name: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo 3 caracteres')
    ),
    price_original: z.preprocess(emptyToNull,
        z.coerce.number('Preço original precisa ser número').min(0, 'Preço original >= 0')
    ),
    price_discount: z.preprocess(emptyToNull,
        z.coerce.number('Preço original precisa ser número').min(0, 'Preço original precisa ser >= 0').optional()
    ),
    price_cost: z.preprocess(emptyToNull,
        z.coerce.number('Preço de custo precisa ser número').min(0, 'Preço de custo deve ser >= 0')
    ),
    image_url: z.url().optional()
})

// update product schema
export const UpdateProduct = CreateProduct.extend({
    id_product: z.preprocess(emptyToNull,
        z.coerce.number().positive()
    ),
    deleted_at: z.preprocess(emptyToNull,
        z.coerce.date().nullable().optional()
    )
})

// types
export type CreateProduct = z.infer<typeof CreateProduct>
export type UpdateProduct = z.infer<typeof UpdateProduct>