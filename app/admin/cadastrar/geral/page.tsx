import clientService from "@/server/services/client.service"
import invoiceService from "@/server/services/invoice.service"
import { createClientCategory, deleteClientCategory, updateClientCategory } from "@/server/actions/client.action"

import ClientView from "./ClientView"

export default async function CadastroGeral(){
    const clientCategories = await clientService.findCategories()
    const invoiceTypes = await invoiceService.findTypes()
    return (
        <ClientView
        clientCategories={clientCategories}
        clientCategorieCreate={createClientCategory}
        clientCategorieUpdate={updateClientCategory}
        clientCategorieDelete={deleteClientCategory}
        invoiceTypes={invoiceTypes}
        />
    )
}