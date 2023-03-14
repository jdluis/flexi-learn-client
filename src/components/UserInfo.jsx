function UserInfo(props) {
    const {user} = props
  return (
    <div>
      <div className="w-40">
        <img
          className="w-full object-cover"
          src={user.profileImg_url}
          alt={`profile image of ${user.first_name}`}
        />
      </div>
      <h3>
        Instructor: {user.first_name} {user.last_name}
      </h3>
      <p>Description: {user.description}</p>
    </div>
  );
}

export default UserInfo;
