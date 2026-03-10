import { z } from "zod";

// DB
// id_invoice_type: number
// name: string
// created_at: Date

// create type schema
export const createInvoiceTypeSchema = z.object({
    name: z.string().trim().min(3).max(20),
})

// update type schema
export const updateInvoiceTypeSchema = createInvoiceTypeSchema.extend({
    id_invoice_type: z.coerce.number().positive(),
})

// types
export type InvoiceTypeCreate = z.infer<typeof createInvoiceTypeSchema>
export type InvoiceTypeUpdate = z.infer<typeof updateInvoiceTypeSchema>