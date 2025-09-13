import React, { useContext, useMemo } from 'react';
import { CredentialContext } from '../context/CredentialContext';
import { format } from 'date-fns';

export default function Dashboard(){
  const { credentials } = useContext(CredentialContext);

  const stats = useMemo(()=>{
    const total = credentials.length;
    const verified = credentials.filter(h=>h.status === 'verified').length;
    const pending = credentials.filter(h=>h.status === 'pending').length;
    return { total, verified, pending };
  }, [credentials]);

  const lastActivity = credentials[0];

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12}}>
        <div className="card"> <h4>Total</h4><div>{stats.total}</div></div>
        <div className="card"> <h4>Verified</h4><div>{stats.verified}</div></div>
        <div className="card"> <h4>Pending</h4><div>{stats.pending}</div></div>
      </div>

      <div className="card" style={{marginTop:12}}>
        <h3>Last activity</h3>
        {lastActivity ? (
          <div>
            <div><strong>{lastActivity.type}</strong> — {lastActivity.status}</div>
            <div>{lastActivity.data?.name || lastActivity.data?.email}</div>
            <small>{format(new Date(lastActivity.createdAt), 'PPP p')}</small>
          </div>
        ) : <div>No activity yet</div>}
      </div>
    </div>
  );
}
