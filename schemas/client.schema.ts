import { z } from 'zod'

// Helper para tratar strings vazias vindas de formulários
const emptyToNull = (val: string) => (val === "" ? null : val)

// create client schema
export const createClientSchema = z.object({
    id_client_type_fk: z.coerce.number().positive(),

    name: z.string().trim().min(3, 'Mínimo 3 caracteres'),

    contact_name: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo 3 caracteres').nullable().optional()
    ),
    cpf: z.preprocess(emptyToNull,
        z.string().trim().length(11, 'CPF precisa de exatamente 11 números')
            .regex(/^\d+$/, 'O CPF deve conter apenas números').nullable().optional()
    ),
    cnpj: z.preprocess(emptyToNull,
        z.string().trim().length(14, 'CNPJ deve ter exatamente 14 caracteres').nullable().optional()
    ),
    email: z.preprocess(emptyToNull,
        z.email('E-mail inválido').nullable().optional()
    ),
    phone: z.preprocess(emptyToNull,
        z.string().nullable().optional()
    ),
    whatsapp: z.preprocess(emptyToNull,
        z.string().nullable().optional()
    ),
    birth_date: z.preprocess(emptyToNull,
        z.coerce.date().nullable().optional()
    ),
    details: z.preprocess(emptyToNull,
        z.string().nullable().optional()
    ),
    image_url: z.preprocess(emptyToNull,
        z.url('URL inválida').nullable().optional()
    ),
})

// update client schema
export const updateClientSchema = createClientSchema.extend({
    id_client: z.coerce.number().positive(),
    deleted_at: z.preprocess(emptyToNull,
        z.coerce.date().nullable().optional()
    )
})

// types
export type CreateClient = z.infer<typeof createClientSchema>
export type UpdateClient = z.infer<typeof updateClientSchema>

// -------------------------------------------------------

// create client type schema
export const createClientTypeSchema = z.object({
    name: z.string().trim().min(3, 'Minimo 3 caracteres')
})

// update client type schema
export const updateClientTypeSchema = createClientTypeSchema.extend({
    id_client_type: z.coerce.number().positive()
})

// types
export type CreateClientType = z.infer<typeof createClientTypeSchema>
export type UpdateClientType = z.infer<typeof updateClientTypeSchema>

// -------------------------------------------------------

// create client address schema
export const createClientAddressSchema = z.object({
    id_client_fk: z.coerce.number().positive(),

    name: z.string().trim().min(3, 'Mínimo 3 caracteres'),

    // Campos de endereço padrão
    zip: z.preprocess(emptyToNull,
        z.string().trim().length(8, 'CEP precisa de exatamente 8 números')
            .regex(/^\d+$/, 'O CEP deve conter apenas números').nullable().optional()
    ),
    number: z.preprocess(emptyToNull,
        z.string().trim().nullable().optional()
    ),
    street: z.preprocess(emptyToNull,
        z.string().trim().nullable().optional()
    ),
    district: z.preprocess(emptyToNull,
        z.string().trim().nullable().optional()
    ),
    city: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo 3 caracteres').nullable().optional()
    ),
    state: z.preprocess(emptyToNull,
        z.string().trim().min(2, 'Use a sigla ou nome do estado').nullable().optional()
    ),
    country_code: z.preprocess(emptyToNull,
        z.string().trim().min(2, 'Mínimo 2 letras ex: BR, AG').max(6, 'Máximo 6 letras usando abreviação ex: BR, AG, USA').nullable().optional()
    ),
    // Campos de condomínio/detalhamento
    condominium: z.preprocess(emptyToNull,
        z.string().trim().min(3, 'Mínimo 3 letras').nullable().optional()
    ),
    building_block: z.preprocess(emptyToNull,
        z.string().trim().nullable().optional()
    ),
    unit_number: z.preprocess(emptyToNull,
        z.string().trim().nullable().optional()
    ),
    internal_street: z.preprocess(emptyToNull,
        z.string().trim().min(3).nullable().optional()
    ),
    details: z.preprocess(emptyToNull,
        z.string().trim().min(3).nullable().optional()
    )
})

// update client street schema
export const updateClientAddressSchema = createClientAddressSchema.extend({
    id_client_address: z.coerce.number().positive()
})

// types
export type CreateClientAddress = z.infer<typeof createClientAddressSchema>
export type UpdateClientAddress = z.infer<typeof updateClientAddressSchema>

// -------------------------------------------------------

// upload client image schema
export const uploadClientImageSchema = z.object({
    id_client: z.coerce.number().positive("ID do cliente é obrigatório"),
    file: z.instanceof(File, { message: 'Selecione uma imagem válida' })
        .refine((file) => file.size <= 0.15 * 1024 * 1024, 'O arquivo deve ter no máximo 100KB')
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 'Formato de imagem inválido')
})

// types
export type UploadClientImage = z.infer<typeof uploadClientImageSchema>