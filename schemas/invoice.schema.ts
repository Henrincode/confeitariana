import { z } from "zod"

// create type schema
export const createInvoiceTypeSchema = z.object({
    name: z.string().trim().min(3).max(20),
})

// update type schema
export const updateInvoiceTypeSchema = createInvoiceTypeSchema.extend({
    id_invoice_type: z.coerce.number().positive(),
})

// types
export type CreateInvoiceType = z.infer<typeof createInvoiceTypeSchema>
export type UpdateInvoiceType = z.infer<typeof updateInvoiceTypeSchema>