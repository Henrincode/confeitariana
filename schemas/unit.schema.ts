import { z } from 'zod'

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: string) => (val === "" ? null : val)

// create unit schema
export const createUnitSchema = z.object({
    name: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo três caracteres')
    ),
    short_name: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo três caracteres')
    )
})

// update unit schema
export const updateUnitSchema = createUnitSchema.extend({
    id_unit: z.coerce.number().positive()
})

// types
export type CreateUnit = z.infer<typeof createUnitSchema>
export type UpdateUnit = z.infer<typeof updateUnitSchema>