import invoiceService from "../services/invoice.service"

// CREAT
export async function createInvoiceType (input_name: string){
    const name = input_name?.toString().trim() || null

    if(!name) return {success: false, error: 'Campo nome deve ser preenchido'}

    try{
        const data = await invoiceService.createType(name)
        return {success: true}
        
    } catch(error){
        console.error(error)
        return {success: false, error: 'Erro ao cadastrar no banco'}
    }
}