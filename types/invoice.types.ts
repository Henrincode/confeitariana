export interface Invoice {
    id_invoice: number
    id_invoice_type_fk: number
    id_client_fk: number
    id_supplier_fk: number
    id_invoice_status_fk: number
    id_auth_staff_fk: number
    price_original: number
    price_discount: number
    price_final: number
    details: string | null
    created_at: Date
    delivered_at: Date | null
    deleted_at: Date | null

    type: string
    client: string
    supplier: string
    status: string
    staff: string
}

export type InvoiceCreate = Omit<Invoice, 'id_invoice' | 'type' | 'client' | 'supplier' | 'status' | 'staf'>
export type InvoiceUpdate = Partial<InvoiceCreate> & Pick<Invoice, 'id_invoice'>

// invoice type
export interface InvoiceType {
    id_invoice_type: number
    name: string
    created_at: Date
}

export type InvoiceTypeCreate = Omit<InvoiceType, 'id_invoice_type'>
export type InvoiceTypeUpdate = Partial<InvoiceTypeCreate> & Pick<InvoiceType, 'id_invoice_type'>

// invoice status
export interface InvoiceStatus {
    id_invoice_status: number
    name: string
    created_at: Date
    deleted_at: Date | null
}

export type InvoiceStatusCreate = Omit<InvoiceStatus, 'id_invoice_status' | 'created_at' | 'deleted_at'>
export type InvoiceStateUpdate = Pick<InvoiceStatus, 'id_invoice_status'> & Partial<InvoiceStatusCreate>