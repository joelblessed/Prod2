import React, { useState, useEffect } from "react";

const EditProfile = ({ api }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({
    email: "",
    userName: "",
    fullName: "",
    phone: "",
    address: "",
    profileImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 Fetch user data on component mount
  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch(${`api}/profile?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [api, userId, token]);

  // 🔹 Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // 🔹 Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview image before upload
      setUser((prevUser) => ({ ...prevUser, profileImage: URL.createObjectURL(file) }));
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🟢 Update text fields first
      const userResponse = await fetch(`${api}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` ,
        },
        body: JSON.stringify({ userId, ...user }),
      });

      if (!userResponse.ok) {
        throw new Error("Failed to update profile.");
      }

      // 🟡 Upload profile image if a file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        const imageResponse = await fetch(`${api}/profile/update-image/${userId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image.");
        }
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
          alt="profile"
          width="100"
          height="100"
          style={{ borderRadius: "50%" }}
        />
      </label>
      <label style={styles.label}>
        Profile Image:
        <input type="file" name="profileImage" onChange={handleImageChange} />
      </label>
      <label style={styles.label}>
        Username:
        <input type="text" name="userName" value={user.userName} onChange={handleChange} style={styles.input} />
      </label>
      <label style={styles.label}>
        Full Name:
        <input type="text" name="fullName" value={user.fullName} onChange={handleChange} style={styles.input} />
      </label>
      <label style={styles.label}>
        Email:
        <input type="email" name="email" value={user.email} onChange={handleChange} style={styles.input} />
      </label>
      <label style={styles.label}>
        Phone:
        <input type="text" name="phone" value={user.phone} onChange={handleChange} style={styles.input} />
      </label>
      <label style={styles.label}>
        Address:
        <input type="text" name="address" value={user.address} onChange={handleChange} style={styles.input} />
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