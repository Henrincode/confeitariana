'use server'
import { updateTag } from "next/cache"
import invoiceService from "../services/invoice.service"
import { InvoiceReturn, InvoiceStatus } from "@/types/invoice.types"

// ------------------- TYPES

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

// ------------------- STATUS

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

    if (!params.name) return { success: false, error: 'Nome precisa ser preenchido' }
    try {
        await invoiceService.createStatus(params)
        updateTag('invoices')
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: "Erro ao cadastrar" }
    }
}

// UPDATE
export async function updateInvoiceStatus(
    params: InvoiceStatus & { id_invoice_status: number, name: string }
): Promise<InvoiceReturn> {

    if (!params.id_invoice_status || isNaN(params.id_invoice_status)) {
        return { success: false, error: 'ID não encontrado' }
    }
    if (!params.name) return { success: false, error: 'Nome precisa ser preenchido' }

    try {
        await invoiceService.updateStatus(params)
        updateTag('invoices')
        return { success: true }

    } catch (error) {
        console.error('ERRO [updateInvoiceStatus]', error)
        return { success: false, error: "Erro ao atualizar" }
    }
}

// DELETE
export async function deleteInvoiceStatus(
    params: InvoiceStatus & { id_invoice_status: number }
): Promise<InvoiceReturn> {

    if (isNaN(params.id_invoice_status)) return { success: false, error: "ID não encontrado" }

    try {
        await invoiceService.deleteStatus(params)
        updateTag('invoices')
        return { success: true }
    } catch (error) {
        console.error("ERRO [deleteInvoiceStatus]", error)
        return { success: false, error: "Erro ao apagar" }
    }
}