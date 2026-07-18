import { useState } from 'react';
import { Header } from './components/Header.jsx';
import { ClassForm } from './components/ClassForm.jsx';
import { ClassList } from './components/ClassList.jsx';
import './index.css';

function App() {
  const [classes, setClasses] = useState([]);

  const handleAddClass = (newClass) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return (
    <>
      <Header />
      <main className="container">
        <ClassForm onAddClass={handleAddClass} />
        <ClassList classes={classes} />
      </main>
    </>
  );
}

export default App;
