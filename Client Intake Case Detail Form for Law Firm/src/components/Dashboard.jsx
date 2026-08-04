import { useState, useEffect } from 'react';
import { getClients } from '../utils/storage';

export default function Dashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(getClients());
  }, []);

  if (clients.length === 0) {
    return (
      <div className="empty-state">
        <p>No data found</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Saved Clients</h2>
      <div className="client-list">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <h3>{client.name}</h3>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>Case Type:</strong> {client.caseType}</p>
            <p><strong>Description:</strong> {client.description}</p>
            <small>Submitted: {new Date(client.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
