// table: invoices
export interface InvoiceDB {
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
}

// view: table + joins
export interface Invoice extends InvoiceDB {
    type: string;
    client: string;
    supplier: string;
    status: string;
    staff: string;
}

// invoice type
export interface InvoiceType {
    id_invoice_type: number
    name: string
    created_at: Date
}

// invoice status
export interface InvoiceStatus {
    id_invoice_status: number
    name: string
    created_at: Date
    deleted_at: Date | null
}

export type InvoiceStatusCreate = Omit<InvoiceStatus, 'id_invoice_status' | 'created_at' | 'deleted_at'>
export type InvoiceStateUpdate = Pick<InvoiceStatus, 'id_invoice_status'> & Partial<InvoiceStatusCreate>