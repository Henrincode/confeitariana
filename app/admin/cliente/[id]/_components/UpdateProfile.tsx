'use client'

export default function UpdateProfile() {
    return (
        <div onClick={(e) => e.stopPropagation()} id="modalChild" className="max-w-200 mx-auto p-2 rounded-xl border-2 border-white bg-pink-300/70">
            <form action="">
                <div className="
                    grid
                    grid-cols-4
                    items-center
                    gap-2
                    p-2

                    [&_.col]:flex
                    [&_.col]:flex-col
                    [&_.col-1]:col-span-4
                    [&_.col-1]:sm:col-span-1
                    [&_.col-2]:col-span-4
                    [&_.col-2]:sm:col-span-2
                    [&_.col-3]:col-span-4
                    [&_.col-3]:sm:col-span-3
                    [&_.col-4]:col-span-4
                    [&_.col-4]:sm:col-span-4

                    [&_.f-label]:w-fit
                    [&_.f-label]:pl-2
                    [&_.f-label]:text-sm
                    [&_.f-label]:text-white

                    [&_.campo]:w-full
                    [&_.campo]:h-full
                    [&_.campo]:p-2
                    [&_.campo]:rounded-2xl
                    [&_.campo]:hover:outline-2
                    [&_.campo]:focus:outline-2
                    [&_.campo]:outline-pink-500
                    [&_.campo]:text-gray-600
                    [&_.campo]:bg-white
                    [&_.campo]:hover:bg-pink-100
                ">
                    <div className="col-2">
                        <label className="f-label" htmlFor="f-name">Nome</label>
                        <input id="f-name" className="campo" name="name" type="text" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="f-email">E-Mail</label>
                        <input id="f-email" className="campo" name="email" type="text" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="f-cpf">CPF</label>
                        <input id="f-cpf" className="campo" name="cpf" type="text" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="f-cnpj">CNPJ</label>
                        <input id="f-cnpj" className="campo" name="cnpj" type="text" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="f-phone">Telefone</label>
                        <input id="f-phone" className="campo" name="phone" type="number" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="whatsapp">Whatsapp</label>
                        <input id="f-whatsapp" className="campo" name="whatsapp" type="text" />
                    </div>

                    <div>
                        <label className="f-label" htmlFor="f-birthday">Aniversário</label>
                        <input id="f-birthday" className="campo" name="birthday" type="date" />
                    </div>
                </div>

                <button>Atualizar</button>
                <button>Cancelar</button>
            </form>
        </div>
    )
}