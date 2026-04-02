import { z } from 'zod'

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: string) => (val === "" ? null : val)

// create brand schema
export const createBrandSchema = z.object({

    name: z.preprocess(emptyToNull, 
        z.string().trim().min(3, 'Mínimo três caracteres')
    ),
    iamge_url: z.preprocess(emptyToNull,
        z.url('URL inválida').nullable().optional()
    )
})

// update brand schema
export const updateBrandSchema = createBrandSchema.extend({
    id_brand: z.coerce.number().positive(),

    deleted_at: z.preprocess(emptyToNull,
        z.coerce.date().nullable().optional()
    ) 
})

// types
export type CreateBrand = z.infer<typeof createBrandSchema>
export type UpdateBrand = z.infer<typeof updateBrandSchema>