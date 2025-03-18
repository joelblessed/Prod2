import React, { useState, useEffect } from "react";

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
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${api}/profile?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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
     
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🟢 Update profile details (without the image)
      const updateProfile = await fetch(${api}/profile/update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${token},
        },
        body: JSON.stringify({ ...user, id: userId }),
      });
  
      if (!updateProfile.ok) throw new Error("Profile update failed");
  
      // 🟡 Upload image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profileImage", selectedFile);
  
        const uploadImage = await fetch(`${api}/profile/update-image/${userId}, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
  
        if (!uploadImage.ok) throw new Error("Image upload failed");
  
        const imgResponse = await uploadImage.json();
  
        // 🔹 Set the profileImage from the backend response
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: `${api}${imgResponse.user.profileImage}`, // Append API URL
        }));
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
        <input type="file" name="profileImage" onChange={handleImageChange} />
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