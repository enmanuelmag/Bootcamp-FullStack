type UserProfileProps = {
  name: string;
  url: string;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url } = props;

  return (
    <div>
      <img
        src={url}
        alt="Avatar"
        className="avatar"
        height="auto"
        width="300"
      />
      <h2>{name}</h2>
    </div>
  );
};

export default UserProfile;
