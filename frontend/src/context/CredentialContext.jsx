import React, { createContext, useState, useEffect } from 'react';

export const CredentialContext = createContext();

export const CredentialProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('employerProfile');
    return saved ? JSON.parse(saved) : {};
  });

  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('credentials');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [credentials]);

  return (
    <CredentialContext.Provider value={{ profile, setProfile, credentials, setCredentials }}>
      {children}
    </CredentialContext.Provider>
  );
};
