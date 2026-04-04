import productService from "@/server/services/product.service";
import ViewProducts from "./ClientView";

export default async function PageProducts() {

    const products = await productService.find()

    if(products.length === 0) return (
        <p className="font-bold text-4xl text-center text-gray-500">Nenhum produto cadastrado!</p>
    )
    
    return (
        <ViewProducts products={products} />
    )
}