import FormClientCat from "@/components/Forms/Clients/Category";
import clientService from "@/server/services/client.service";

export default async function Cad() {

    const clientCategoryes = await clientService.findCategories()

    return (
        <div className="">
            <FormClientCat categoryes={clientCategoryes} />
        </div>
    )
}