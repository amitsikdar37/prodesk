import React, { useState } from 'react';
import Column from './Column';

function Board() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Design the corporate UI', status: 'To Do' },
    { id: 2, text: 'Set up React project', status: 'In Progress' },
    { id: 3, text: 'Gather requirements', status: 'Done' }
  ]);

  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTaskText.trim()) return;

    const newTask = { id: Date.now(), text: newTaskText, status: 'To Do' }
    setTasks([...tasks, newTask]);

    setNewTaskText('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTask = tasks.filter(task => (task.id !== taskId));
    setTasks(updatedTask);
  };

  const handleMoveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const columns = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="board">
      {columns.map(colStatus => (
        <Column
          key={colStatus}
          title={colStatus}
          tasks={tasks.filter(task => task.status === colStatus)}
          newTaskText={colStatus === 'To Do' ? newTaskText : undefined}
          setNewTaskText={colStatus === 'To Do' ? setNewTaskText : undefined}
          onAddTask={colStatus === 'To Do' ? handleAddTask : undefined}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
        />
      ))}
    </div>
  );
}

export default Board;
