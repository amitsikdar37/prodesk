import { useState } from 'react';
import './App.css';
import MultiStepForm from './components/MultiStepForm';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('intake');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Client Intake & Case Detail Form</h1>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${activeTab === 'intake' ? 'active' : ''}`}
            onClick={() => setActiveTab('intake')}
          >
            Intake Form
          </button>
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
        </nav>
      </header>
      <main className="app-main">
        {activeTab === 'intake' ? <MultiStepForm /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;
