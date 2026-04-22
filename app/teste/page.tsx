'use client'
export default function testepage() {
    return (
        <div className="w-200 h-150 backdrop-blur-3xl bg-blue-400 mx-auto bg-[url('https://conceito.de/wp-content/uploads/2011/05/road-g6076f8fad_1280.jpg')]">
            {/* nav */}
            <div className="relative bg-red-400/0 h-20 p-4 flex flex-col justify-center text-white font-black">
                {/* blur */}
                <div className="bg-blue-600/0 backdrop-blur-sm inset-0 absolute"></div>
                {/* nav front */}
                <div className="relative">
                    <p>TESTE</p>
                    {/* dropmeu */}
                    <div className="size-20 bg-white/50 absolute backdrop-blur-sm"></div>
                </div>
            </div>
        </div>
    )
}