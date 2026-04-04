import unitService from "@/server/services/unit.service";
import ViewCreateProduct from "./ClientView";
import brandService from "@/server/services/brand.service";
import productService from "@/server/services/product.service";

export default async function PageCreateProduct() {
    const categories = await productService.findCategories()
    const brands = await brandService.find()
    const units = await unitService.find()
    return (
        <ViewCreateProduct categories={categories} brands={brands} units={units} />
    )
}