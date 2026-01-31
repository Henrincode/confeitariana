import clientService from "@/server/services/client.service";

export default async function Home() {

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <img className="w-100" src="/cookie-01.png" alt="" />
      <h1 className="mb-2 font-bold text-5xl text-pink-400">Confeitariana</h1>
      <form className="
        flex
        flex-col
        gap-2
        max-w-100
        w-full
        p-2
        rounded-2xl
        bg-pink-400

        [&_.coluna]:flex
        [&_.coluna]:flex-row
        [&_.coluna]:justify-center
        [&_.coluna]:gap-2

        [&_input]:w-full
        [&_input]:p-2
        [&_input]:rounded-2xl
        [&_input]:text-center
        [&_input]:hover:outline-2
        [&_input]:focus:outline-2
        [&_input]:outline-pink-500
        [&_input]:bg-white
        [&_input]:hover:bg-pink-100

        [&_button]:w-full
        [&_button]:p-2
        [&_button]:rounded-2xl
        [&_button]:text-pink-800
        [&_button]:bg-pink-100
        [&_button]:hover:bg-pink-300
        [&_button]:cursor-pointer
      ">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="digite a senha" />
        <div className="h-0.5 rounded-full bg-pink-200"></div>
        <div className="coluna">
          <button>Entrar</button>
          <button>Cadastrar</button>
        </div>
        <p className="text-center text-sm text-pink-800 hover:text-pink-600 cursor-pointer">Esqueci minha senha</p>
      </form>
    </div>
  );
}
