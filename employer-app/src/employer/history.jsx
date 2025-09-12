import React, { useContext } from 'react';
import { CredentialContext } from '../context/CredentialContext';
import { format } from 'date-fns';

export default function History(){
  const { credentials } = useContext(CredentialContext);

  return (
    <div>
      <h2>History</h2>
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Type</th><th>Status</th><th>When</th><th>Details</th></tr>
          </thead>
          <tbody>
            {credentials.map(h=>(
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.type}</td>
                <td>{h.status}</td>
                <td>{format(new Date(h.createdAt), 'PPP p')}</td>
                <td><pre style={{whiteSpace:'pre-wrap',maxWidth:300}}>{JSON.stringify(h.data, null, 2)}</pre></td>
              </tr>
            ))}
            {credentials.length === 0 && (
              <tr><td colSpan="5">No history yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
