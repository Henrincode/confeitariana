import FormCreateClient from "@/components/Forms/Clients/CreateClient";
import clientService from "@/server/services/client.service";

export default async function CreateClientPage() {
    const categories = await clientService.findCategories()
    const clients = await clientService.find()
    return (
        <div className="box pb-10">
            <FormCreateClient clients={clients} categories={categories} classBody="max-w-200 mx-auto mt-4" classForm="rounded-2xl bg-pink-400" />
        </div>
    )
}