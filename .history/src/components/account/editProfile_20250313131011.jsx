import React, { useState, useEffect } from 'react';

const EditProfile = ({ userId, token }) => {
  const [user, setUser] = useState({
    email: '',
    userName: '',
    fullName: '',
    phone: '',
    country: '',
    address: '',
    gender: '',
    profileImage: '',
    role: ''
  });

  useEffect(() => {
    // Fetch user data from API and set it to state
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          headers: {
            'Authorization': token
          }
        });
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

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
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleChange}
        />
      </label>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={user.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        />
      </label>
      <label>
        Profile Image:
        <input
          type="text"
          name="profileImage"
          value={user.profileImage}
          onChange={handleChange}
        />
      </label>
      <label>
        Role:
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;