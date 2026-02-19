'use server'

import { updateTag } from "next/cache"
import invoiceService from "../services/invoice.service"
import { InvoiceReturn, InvoiceStatus, InvoiceType } from "@/types/invoice.types"

// ------------------|
// ------------------| TYPES
// ------------------|

// CREAT
export async function createInvoiceType(
    params: InvoiceType & { name: string }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    params.name = params.name?.toString().trim()

    if (!params.name) return {

        success: false,
        message: 'Campo "nome" deve ser preenchido',
        errors: {
            name: true
        }
    }

    const data: { name: string } = { name: params.name }

    try {
        await invoiceService.createType(data)
        updateTag('invoices')
        return { success: true }
    } catch (error) {
        console.error('ERROR [createInvoiceType]', error)
        return { success: false, message: 'Erro ao criar no banco' }
    }
}

// UPDATE
export async function updateInvoiceType(
    params: InvoiceType & { id_invoice_type: number, name: string }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    const errors: Record<string, string | boolean> = {}

    params.name = params.name?.toString().trim()

    if (!params.id_invoice_type || isNaN(params.id_invoice_type)) {
        errors.id_invoice_type = 'ID não informado'
    }
    if (!params.name) errors.name = 'Nome não informado'

    if (Object.keys(errors).length) return {

        success: false,
        message: 'Faltando dados',
        errors
    }

    const data: { id_invoice_type: number, name: string } = {
        id_invoice_type: params.id_invoice_type,
        name: params.name
    }

    try {
        await invoiceService.updateType(data)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error(error)
        return { success: false, message: 'Erro ao cadastrar no banco' }
    }
}

// DELETE
export async function deleteInvoiceType(
    params: InvoiceType & { id_invoice_type: number }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    if (!params.id_invoice_type || isNaN(params.id_invoice_type)) {
        return { success: false, message: 'ID não é um número válido' }
    }

    try {
        await invoiceService.deleteType(params)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error('ERROR [deleteInvoiceType]', error)
        return { success: false, message: 'Erro interno no servidor' }
    }
}

// ------------------|
// ------------------| STATUS
// ------------------|

// FIND
export async function findInvoiceStatus(): Promise<InvoiceStatus[] | null> {
    try {
        return await invoiceService.findStatus()
    } catch (error) {
        console.error(error)
        return null
    }
}

// CREATE
export async function createInvoiceStatus(
    params: InvoiceStatus & { name: string }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    if (!params.name) return { success: false, message: 'Nome precisa ser preenchido' }
    try {
        await invoiceService.createStatus(params)
        updateTag('invoices')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, message: "Erro ao cadastrar" }
    }
}

// UPDATE
export async function updateInvoiceStatus(
    params: InvoiceStatus & { id_invoice_status: number, name: string }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    if (!params.id_invoice_status || isNaN(params.id_invoice_status)) {
        return { success: false, message: 'ID não encontrado' }
    }
    if (!params.name) return { success: false, message: 'Nome precisa ser preenchido' }

    try {
        await invoiceService.updateStatus(params)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error('ERRO [updateInvoiceStatus]', error)
        return { success: false, message: "Erro ao atualizar" }
    }
}

// DELETE
export async function deleteInvoiceStatus(
    params: InvoiceStatus & { id_invoice_status: number }
): Promise<InvoiceReturn> {

    if (!params) return { success: false, message: 'Não foi passado nenhum pârametro' }

    if (isNaN(params.id_invoice_status)) return { success: false, message: "ID não encontrado" }

    try {
        await invoiceService.deleteStatus(params)
        updateTag('invoices')
        return { success: true }
        
    } catch (error) {
        console.error("ERRO [deleteInvoiceStatus]", error)
        return { success: false, message: "Erro ao apagar" }
    }
}