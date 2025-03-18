import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    id: "",
    email: "",
    userName: "",
    fullName: "",
    phone: "",
    country: "",
    address: "",
    gender: "",
    profileImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 Fetch user data
  useEffect(() => {
    axios
      .get(`${api}/profile?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [api, userId, token]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUser((prevUser) => ({
        ...prevUser,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🟢 Update profile fields
      await axios.put(
        `${api}/profile/update `,
        { ...user, id: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🟡 Upload image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        await axios.put(`${api}/profile/update-image/${userId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>
        <img
          src={user.profileImage || "/default-profile.png"}
          alt="Profile"
          width="100"
          height="100"
          style={{ borderRadius: "50%" }}
        />
      </label>
      <label style={styles.label}>
        Profile Image:
        <input type="file" value={} name="profileImage" onChange={handleImageChange} />
      </label>
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
  },
  label: { marginBottom: "10px", fontWeight: "bold" },
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
  },
};

export default EditProfile;
