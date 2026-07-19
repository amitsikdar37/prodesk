import React from 'react';
import { useState } from 'react';

function Card({ task, onDeleteTask, onMoveTask, onSaveEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: task.id, text: task.text });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onSaveEdit(task.id, editedTask.text);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask({ id: task.id, text: task.text });
  };

  return (
    <div className={`card priority-${task.priority || 'Medium'}`}>
      <div className="card-content">
        {isEditing ? (
          <div className="edit-mode">
            <input
              className="edit-input"
              type="text"
              autoFocus
              value={editedTask.text}
              onChange={(e) => setEditedTask({ id: task.id, text: e.target.value })}
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <p className="task-text" onClick={handleEditClick}>
            {task.text}
          </p>
        )}
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
