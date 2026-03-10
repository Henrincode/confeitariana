import { z } from 'zod'

// create client schema
const createClientSchema = z.object({
    id_client_category_fk: z.coerce.number().positive(),
    name: z.string().trim().min(3, 'Mínimo 3 caracteres'),
    contact_name: z.string().trim().min(3, 'Mínimo 3 caracteres').optional().or(z.literal('')),
    cpf: z.string().trim().min(11, 'CPF precisa de 11 números').optional().or(z.literal('')),
    cnpj: z.string().trim().optional().or(z.literal('')),
    email: z.email('E-mail inválido').optional(),
    phone: z.string().optional().or(z.literal('')),
    whatsapp: z.string().optional().or(z.literal('')),
    birth_date: z.coerce.date().optional(),
    details: z.string().optional().or(z.literal('')),
    image_url: z.string().url('URL inválida').optional().or(z.literal('')),
})

// update client schema
const updateClientSchema = createClientSchema.extend({
    id_client: z.coerce.number().positive(),
    deleted_at: z.coerce.date().optional()
})

// types
export type CreateClient = z.infer<typeof createClientSchema>
export type UpdateClient = z.infer<typeof updateClientSchema>

// create client category schema
const createClientCategorySchema = z.object({
    name: z.string().min(3, 'Minimo 3 caracteres')
})

// update client category schema
const updateClientCategorySchema = createClientCategorySchema.extend({
    id_client_category: z.coerce.number().positive()
})

// types
export type CreateClientCategory = z.infer<typeof createClientCategorySchema>
export type UpdateClientCategory = z.infer<typeof updateClientCategorySchema>