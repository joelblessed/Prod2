import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCartAfterLogin } from "../../cartAction";
const Profile = ({ api, handleLogin }) => {
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch(); 




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
    <div style={styles.profileContainer}>
      <h2>User Profile</h2>
      <img src={user.profileImage} alt="Profile" style={styles.profileImage} />
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.userName}</p>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Country:</strong> {user.country}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

const styles = {
  profileContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
};

export default Profile;
