import React, { useState } from 'react';
import { useEffect } from 'react';
import Column from './Column';

function Board() {

  const [tasks, setTasks] = useState(() => {
    const isTask = localStorage.getItem('tasks');
    if (isTask) {
      return JSON.parse(isTask);
    }

    return [
      { id: 1, text: 'Design the corporate UI', status: 'To Do', priority: 'High' },
      { id: 2, text: 'Set up React project', status: 'In Progress', priority: 'Medium' },
      { id: 3, text: 'Gather requirements', status: 'Done', priority: 'Low' }
    ];
  });

  useEffect(() => {
    const task = JSON.stringify(tasks);
    localStorage.setItem('tasks', task);
  }, [tasks])


  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTaskText.trim()) return;

    const newTask = { id: Date.now(), text: newTaskText, status: 'To Do', priority: newTaskPriority }
    setTasks([...tasks, newTask]);

    setNewTaskText('');
    setNewTaskPriority('Medium');
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

  const handleSaveEdit = (taskId, editedTask) => {
    const updatedTask = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, text: editedTask };
      }
      return task;
    });
    setTasks(updatedTask);
  }

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
          newTaskPriority={colStatus === 'To Do' ? newTaskPriority : undefined}
          setNewTaskPriority={colStatus === 'To Do' ? setNewTaskPriority : undefined}
          onAddTask={colStatus === 'To Do' ? handleAddTask : undefined}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
          onSaveEdit={handleSaveEdit}
        />
      ))}
    </div>
  );
}

export default Board;
