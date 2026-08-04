import './App.css';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Client Intake & Case Detail Form</h1>
      </header>
      <main className="app-main">
        <MultiStepForm />
      </main>
    </div>
  );
}

export default App;
