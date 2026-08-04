const STORAGE_KEY = 'law_firm_clients';

export const saveClient = (clientData) => {
  const existingClients = getClients();
  const newClient = {
    ...clientData,
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  existingClients.push(newClient);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingClients));
};

export const getClients = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
