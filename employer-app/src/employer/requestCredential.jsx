import React, { useState, useContext } from 'react';
import { CredentialContext } from '../context/CredentialContext';
import { v4 as uuidv4 } from 'uuid'; // for unique IDs

export default function RequestCredential() {
  const { credentials, setCredentials } = useContext(CredentialContext);

  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    role: '',
    notes: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit request
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: uuidv4(), // unique ID
      ...formData,
      status: 'Pending',
      date: new Date().toLocaleString(),
    };

    const updatedRequests = [...credentials, newRequest];
    setCredentials(updatedRequests);
    localStorage.setItem('credentials', JSON.stringify(updatedRequests));

    alert('Credential request submitted!');
    setFormData({
      candidateName: '',
      candidateEmail: '',
      role: '',
      notes: '',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Request Credential</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Candidate Name:</label><br />
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Candidate Email:</label><br />
          <input
            type="email"
            name="candidateEmail"
            value={formData.candidateEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label><br />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label><br />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Submit Request</button>
      </form>
    </div>
  );
}
