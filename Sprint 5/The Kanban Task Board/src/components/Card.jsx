import React from 'react';

function Card({ task, onDeleteTask, onMoveTask }) {
  return (
    <div className="card">
      <div className="card-content">
        <p>{task.text}</p>
      </div>
      <div className="card-actions">
        <div className="move-actions">
          {task.status !== 'To Do' && (
            <button 
              className="action-btn" 
              onClick={() => onMoveTask(task.id, task.status === 'Done' ? 'In Progress' : 'To Do')}
              title="Move left"
            >
              ← Move
            </button>
          )}
          {task.status !== 'Done' && (
            <button 
              className="action-btn" 
              onClick={() => onMoveTask(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
              title="Move right"
            >
              Move →
            </button>
          )}
        </div>
        <button 
          className="delete-btn" 
          onClick={() => onDeleteTask(task.id)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
