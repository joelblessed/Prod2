import { useEffect, useState } from "react";

const Profile = ({ api, handleLogin }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  return (
    <div style={{ marginTop: "100px" }}>
      {error}
      <h2>Welcome, {user.userName}</h2>
      <p>Email: {user.email}</p>
{/* <button onClick={handleLogin(user)}>dfhs</button> */}
      {user.phone}
    </div>
  );
};

export default Profile;
