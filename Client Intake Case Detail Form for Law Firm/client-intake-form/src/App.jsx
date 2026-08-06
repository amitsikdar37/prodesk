import { ErrorBoundary } from './ErrorBoundary';
import ClientIntakeForm from './ClientIntakeForm';
import './index.css';

function App() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <ErrorBoundary>
          <ClientIntakeForm />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
