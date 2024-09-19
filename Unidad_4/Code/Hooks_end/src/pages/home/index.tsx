const Home = () => {
  return (
    <div className="flex items-center flex-col gap-y-[4rem]">
      <h1 className="text-4xl font-bold text-center">Bienvenido!</h1>

      <div className="flex flex-col text-center gap-y-[1rem]">
        <a
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          href="/users/form"
        >
          Crear usuario
        </a>

        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/users"
        >
          Ver usuarios
        </a>

        <a
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          href="/users/verified"
        >
          Ver usuarios verificados
        </a>
      </div>
    </div>
  );
};

export default Home;
