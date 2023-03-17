function UserInfo(props) {
  const { user } = props;
  return (
    <div className="flex p-4 bg-opacity-75 bg-slate-500 h-full py-10 px-4">
      <div className="w-40">
        <img
          className="w-full object-cover"
          src={user.profileImg_url}
          alt={`profile image of ${user.first_name}`}
        />
      </div>
      <div className="p-4">
        <h3>
          Instructor: <span className="font-bold">{user.first_name} {user.last_name}</span>
        </h3>
        <p>About: {user.description}</p>
      </div>
    </div>
  );
}

export default UserInfo;
