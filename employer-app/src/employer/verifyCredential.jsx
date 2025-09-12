import React, { useState, useContext } from 'react';
import { CredentialContext } from '../context/CredentialContext';

export default function VerifyCredential(){
  const { history, updateHistoryItem, addHistoryItem } = useContext(CredentialContext);
  const [credentialId, setCredentialId] = useState('');
  const [result, setResult] = useState(null);

  function handleVerify(e){
    e.preventDefault();
    // simple local verification demo: match id in history
    const found = history.find(h => String(h.id) === String(credentialId));
    if(found){
      // update found as verified
      updateHistoryItem(found.id, { status: 'verified', verifiedAt: new Date().toISOString() });
      setResult({ ok:true, item: found });
      alert('Credential verified');
    } else {
      // not found: create a "failed" history entry
      const newItem = { id: Date.now(), type:'verify-attempt', status:'not-found', createdAt: new Date().toISOString(), data:{ credentialId } };
      addHistoryItem(newItem);
      setResult({ ok:false });
      alert('Credential not found');
    }
    setCredentialId('');
  }

  return (
    <div>
      <h2>Verify Credential</h2>
      <form className="card" onSubmit={handleVerify}>
        <div className="form-row">
          <input placeholder="Enter credential id" value={credentialId} onChange={e=>setCredentialId(e.target.value)} required/>
          <button type="submit">Verify</button>
        </div>
      </form>

      {result && (
        <div className="card">
          {result.ok ? <div>Verified: <pre>{JSON.stringify(result.item.data, null, 2)}</pre></div> : <div>Not found.</div>}
        </div>
      )}
    </div>
  );
}
