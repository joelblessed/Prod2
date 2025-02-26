import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";
const Profile = ({ api, handleLogin }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); 


  useEffect(()=>{
    if(user != null){
      dispatch(loadCartAfterLogin(user.id));
    }
  },[user]);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    fetch(`${api}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token in the headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("userData", JSON.stringify(data));
        console.log(localStorage.getItem("userData"));
  
      })

      .catch((error) => setError(error.message));
  }, []);


  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;


  return (
    <div style={{ marginTop: "100px" }}>
      {error}
      <h2>Welcome, {user.userName}</h2>
      <p>Email: {user.email}</p>
<button onClick={}>fosh</button>
      {user.id}
    </div>
  );
};

export default Profile;
