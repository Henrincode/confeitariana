'use server'
import { updateTag } from "next/cache"
import invoiceService from "../services/invoice.service"

// CREAT
export async function createInvoiceType(input_name: string) {
    const name = input_name?.toString().trim() || null

    if (!name) return { success: false, error: 'Campo nome deve ser preenchido' }

    if (await invoiceService.extistsType(name)) return { success: false, error: 'Nome já existe' }

    try {
        await invoiceService.createType(name)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao cadastrar no banco' }
    }
}

// UPDATE
export async function updateInvoiceType(type: { id_invoice_type: number, name: string }) {
    try {
        await invoiceService.updateType(type)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false, error: 'erro ao cadastrar no banco' }
    }
}

// DELETE
export async function deleteInvoiceType(id: string) {
    const id_invoice_type = Number(id)
    if (isNaN(id_invoice_type)) return { success: false, error: 'Id informado não é um número' }

    const type = {
        id_invoice_type
    }

    try {
        await invoiceService.deleteType(type)
        updateTag('invoices')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erro ao cadastrar' }
    }
}