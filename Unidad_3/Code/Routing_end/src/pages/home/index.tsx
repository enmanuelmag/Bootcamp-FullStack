const Home = () => {
  return (
    <div className="flex items-center flex-col gap-y-[4rem]">
      <h1 className="text-4xl font-bold text-center">Bienvenido!</h1>

      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/users"
      >
        Ver usuarios
      </a>
    </div>
  );
};

export default Home;
