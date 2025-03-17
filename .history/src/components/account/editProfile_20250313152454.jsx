import React, { useState, useEffect } from 'react';

const EditProfile = ({ userInfo }) => {
const userId = localStorage.getItem('userid');
const token = localStorage.getItem('token');
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

  const id = localStorage.getItem('user');

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
    <p>{id}</p>
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
          placeholder={userId}
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
     
      <label style={styles.label}>
        Profile Image:
        <input
          type="text"
          name="profileImage"
          value={user.profileImage}
          onChange={handleChange}
          style={styles.input}
        />
      </label>
    
      <button type="submit" style={styles.button}>Save Changes</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default EditProfile;