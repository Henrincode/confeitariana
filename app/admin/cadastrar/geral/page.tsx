import clientService from "@/server/services/client.service"
import { createClientCategory, deleteClientCategory, updateClientCategory } from "@/server/actions/client.action"
import invoiceService from "@/server/services/invoice.service"
import { createInvoiceStatus, createInvoiceType, deleteInvoiceStatus, deleteInvoiceType, updateInvoiceStatus, updateInvoiceType } from "@/server/actions/invoice.action"

import ClientView from "./ClientView"

export default async function CadastroGeral() {
    const clientCategories = await clientService.findCategories()
    const invoiceTypes = await invoiceService.findTypes()
    const invoiceStatus = await invoiceService.findStatus()
    return (
        <ClientView
            clientCategories={clientCategories}
            clientCategorieCreate={createClientCategory}
            clientCategorieUpdate={updateClientCategory}
            clientCategorieDelete={deleteClientCategory}
            invoiceTypes={invoiceTypes}
            invoiceTypesCreate={createInvoiceType}
            invoiceTypesUpdate={updateInvoiceType}
            invoiceTypesDelete={deleteInvoiceType}
            invoiceStatus={invoiceStatus}
            invoiceStatusCreate={createInvoiceStatus}
            invoiceStatusUpdate={updateInvoiceStatus}
            invoiceStatusDelete={deleteInvoiceStatus}
        />
    )
}