export interface InvoiceType {
    id_invoice_type?: number | null
    name?: string | null
    created_at?: Date | null
}

export interface InvoiceStatus {
    id_invoice_status?: number | null
    name?: string | null
    created_at?: Date | null
    deleted_at?: Date | null
}

export interface InvoiceReturn {
    success: boolean
    error?: string
}