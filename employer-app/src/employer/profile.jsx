import React, { useState, useEffect, useContext } from 'react';
import { CredentialContext } from '../context/CredentialContext';

export default function Profile() {
  const { profile, setProfile } = useContext(CredentialContext);

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
  });

  // Load saved profile from context/localStorage
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save profile to context + localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem('employerProfile', JSON.stringify(formData));
    alert('Profile saved successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employer Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label><br />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label><br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Save Profile</button>
      </form>
    </div>
  );
}
