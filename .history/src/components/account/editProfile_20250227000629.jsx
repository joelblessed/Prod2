import React, { useState, useEffect } from 'react';

const EditProfile = ({api}) => {
  const [user, setUser] = useState({
    userName: '',
    phone: '',
    email: '',
    // Add other fields as necessary
  });


  // Fetch user data on component mount
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
      const response = await fetch('/api/user', {
        method: 'PUT', // Use PUT or PATCH based on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Handle successful update (e.g., show a success message)
      } else {
        // Handle errors (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <form  style={{margineTop:"90px"}}onSubmit={handleSubmit}>
        test
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={user.userName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={user.phone}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      {/* Add more fields as necessary */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;