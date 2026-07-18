import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Board</h1>
      </header>
      <main className="app-content">
        <Board />
      </main>
    </div>
  );
}

export default App;
