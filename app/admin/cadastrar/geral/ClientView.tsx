'use client'

import FormGeneric from "./_components/FormGeneric"

export default function ClientView({
    clientCategories,
    clientCategorieCreate,
    clientCategorieUpdate,
    clientCategorieDelete,
    invoiceTypes
}: any) {
    return (
        <div className="
            box
            flex
            flex-col
            gap-10
            
            [&_.tittle]:text-4xl
            [&_.tittle]:text-gray-600
            [&_.tittle]:

            [&_.line]:h-1
            [&_.line]:mt-1
            [&_.line]:mb-4
            [&_.line]:rounded-full
            [&_.line]:bg-black/20

            [&_.forms]:flex
            [&_.forms]:flex-col
            [&_.forms]:items-center
            [&_.forms]:gap-2
        ">
            <div className="category">
                <p className="tittle">Clientes</p>
                <div className="line"></div>
                <div className="forms">
                    <FormGeneric
                        tittle='Tipos'
                        data={clientCategories}
                        data_id='id_client_category'
                        createAction={clientCategorieCreate}
                        updateAction={clientCategorieUpdate}
                        deleteAction={clientCategorieDelete}
                    />
                </div>
            </div>

            <div className="category">
                <p className="tittle">Notas</p>
                <div className="line"></div>
                <div className="forms">
                    {/* <FormInvoiceTypes types={invoiceTypes} /> */}
                    <p>Tipos</p>
                    <p>Estatus</p>
                </div>
            </div>

            <div className="category">
                <p className="tittle">Pagamentos</p>
                <div className="line"></div>
                <div className="forms">
                    {/* <FormClientCategories categories={clientCategories} /> */}
                    <p>Metodos</p>
                    <p>Tipos</p>
                    <p>Estatus</p>
                </div>
            </div>

            <div className="category">
                <p className="tittle">Produtos</p>
                <div className="line"></div>
                <div className="forms">
                    {/* <FormClientCategories categories={clientCategories} /> */}
                    <p>Categorias</p>
                </div>
            </div>

            <div className="category">
                <p className="tittle">Suplimentos</p>
                <div className="line"></div>
                <div className="forms">
                    {/* <FormClientCategories categories={clientCategories} /> */}
                    <p>Categorias</p>
                </div>
            </div>

            <div className="category">
                <p className="tittle">Unidades</p>
                <div className="line"></div>
                <div className="forms">
                    {/* <FormClientCategories categories={clientCategories} /> */}
                </div>
            </div>
        </div>
    )
}