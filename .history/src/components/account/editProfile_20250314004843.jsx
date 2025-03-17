import React, { useState, useEffect } from "react";

const EditProfile = ({ api,userInfo  }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
 const [error, setError] = useState("")
  const [user, setUser] = useState( {
    email: "",
    userName: "",
    fullName: "",
    phone: "",
    address: "",
    profileImage: "",
  });

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
         
           
     
         })
   
         .catch((error) => setError(error.message));
     }, []);
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/updateProfile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
     <
      <img
        src={user.profileImage}
        alt="profile"
        width="100"
        height="100"
        style={{borderRadius:"50%"}}
      />


      <label style={styles.label}>
        Username:
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Phone:
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Address:
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <button type="submit" style={styles.button}>
        Save Changes
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  label: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default EditProfile;
