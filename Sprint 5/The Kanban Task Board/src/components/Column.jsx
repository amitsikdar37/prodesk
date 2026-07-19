import React from 'react';
import Card from './Card';

function Column({ title, tasks, newTaskText, setNewTaskText, newTaskPriority, setNewTaskPriority, onAddTask, onDeleteTask, onMoveTask, onSaveEdit }) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="column-content">
        {tasks.map(task => (
          <Card 
            key={task.id} 
            task={task} 
            onDeleteTask={onDeleteTask}
            onMoveTask={onMoveTask}
            onSaveEdit={onSaveEdit}
          />
        ))}
      </div>

      {title === 'To Do' && (
        <form className="add-task-form" onSubmit={onAddTask}>
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value= {newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="task-input"
          />
          <select 
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="task-priority-select"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button type="submit" className="add-button">Add</button>
        </form>
      )}
    </div>
  );
}

export default Column;
