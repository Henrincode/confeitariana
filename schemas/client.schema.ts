import { z } from 'zod'

// create client schema
export const createClientSchema = z.object({
    id_client_category_fk: z.coerce.number().positive(),
    name: z.string().trim().min(3, 'Mínimo 3 caracteres'),
    contact_name: z.string().trim().min(3, 'Mínimo 3 caracteres').or(z.literal('')).optional(),
    cpf: z.string().trim().min(11, 'CPF precisa de 11 números').or(z.literal('')).optional(),
    cnpj: z.string().trim().or(z.literal('')).optional(),
    email: z.email('E-mail inválido').optional(),
    phone: z.string().or(z.literal('')).optional(),
    whatsapp: z.string().or(z.literal('')).optional(),
    birth_date: z.coerce.date().optional(),
    details: z.string().or(z.literal('')).optional(),
    image_url: z.url('URL inválida').or(z.literal('')).optional(),
})

// update client schema
export const updateClientSchema = createClientSchema.extend({
    id_client: z.coerce.number().positive(),
    deleted_at: z.coerce.date().optional()
})

// types
export type CreateClient = z.infer<typeof createClientSchema>
export type UpdateClient = z.infer<typeof updateClientSchema>

// -------------------------------------------------------

// create client category schema
export const createClientCategorySchema = z.object({
    name: z.string().trim().min(3, 'Minimo 3 caracteres')
})

// update client category schema
export const updateClientCategorySchema = createClientCategorySchema.extend({
    id_client_category: z.coerce.number().positive()
})

// types
export type CreateClientCategory = z.infer<typeof createClientCategorySchema>
export type UpdateClientCategory = z.infer<typeof updateClientCategorySchema>

// -------------------------------------------------------

// create client address schema
export const createCliencAddressSchema = z.object({
    id_client_fk: z.coerce.number().positive(),
    name: z.string().trim().min(3, 'Minimo 3 caracteres'),
    zip: z.string().trim().min(3).or(z.literal('')).optional(),
    number: z.string().trim().min(3).or(z.literal('')).optional(),
    street: z.string().trim().min(3).or(z.literal('')).optional(),
    district: z.string().trim().min(3).or(z.literal('')).optional(),
    city: z.string().trim().min(3).or(z.literal('')).optional(),
    state: z.string().trim().min(3).or(z.literal('')).optional(),
    country_code: z.string().trim().min(3).or(z.literal('')).optional(),

    condominium: z.string().trim().min(3).or(z.literal('')).optional(),
    building_block: z.string().trim().min(3).or(z.literal('')).optional(),
    unit_number: z.string().trim().min(3).or(z.literal('')).optional(),
    internal_street: z.string().trim().min(3).or(z.literal('')).optional(),

    details: z.string().trim().min(3).or(z.literal('')).optional()
})

// update client street schema
export const updateClientAddressSchema = createCliencAddressSchema.extend({
    id_client_address: z.coerce.number().positive()
})

// types
export type CreateClientAddress = z.infer<typeof createCliencAddressSchema>
export type updateClientAddressSchema = z.infer<typeof updateClientAddressSchema>

// -------------------------------------------------------

// upload client image schema
export const uploadClientImageSchema = z.object({
    id_client: z.coerce.number().positive("ID do cliente é obrigatório"),
    file: z.instanceof(File, { message: 'Selecione uma imagem válida' })
        .refine((file) => file.size <= 5 * 1024 * 1024, 'O arquivo deve ter no máximo 5MB')
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 'Formato de imagem inválido')
})

// types
export type UploadClientImage = z.infer<typeof uploadClientImageSchema>