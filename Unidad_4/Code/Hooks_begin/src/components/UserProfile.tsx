type UserProfileProps = {
  name: string;
  url: string;
  verified?: boolean;
  index?: number;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url, verified, index } = props;

  return (
    <div className="shadow-lg p-[1rem] border border-gray-200 rounded-lg text-center flex flex-col justify-center items-center">
      <img
        src={url}
        alt="Avatar"
        className="avatar"
        height="auto"
        width="200"
      />
      <h2 className="text-lg">{name}</h2>
      <p
        className={`text-base ${verified ? 'text-green-500' : 'text-red-500'}`}
      >
        {verified ? 'Verified' : 'Not verified'}
      </p>

      <div className="w-full">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
          onClick={copyData}
        >
          Copiar datos
        </button>

        {index !== undefined && index >= 0 && (
          <a
            className="bg-cyan-500 text-white px-4 py-2 rounded mt-2 block"
            href={`/users/view/${index}`}
          >
            Ver perfil
          </a>
        )}
      </div>
    </div>
  );

  function copyData() {
    const text = `${name} ${verified ? 'Verified' : 'Not verified'}`;

    navigator.clipboard.writeText(text);

    alert('Datos copiados al portapapeles');
  }
};

export default UserProfile;
