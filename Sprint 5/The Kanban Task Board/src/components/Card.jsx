import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Card({ task, onDeleteTask, onMoveTask, onSaveEdit, isOverlay }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: task.id, text: task.text });

  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({ 
    id: isOverlay ? `overlay-${task.id}` : task.id,
    disabled: isOverlay 
  });

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

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging && !isOverlay ? 0.3 : 1,
    boxShadow: isOverlay ? '0 10px 15px -3px rgb(0 0 0 / 0.2)' : undefined,
    zIndex: isOverlay ? 999 : undefined,
  };

  return (
    <div 
      className={`card priority-${task.priority || 'Medium'}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
        <div className="mobile-move-actions">
          {task.status !== 'To Do' && (
            <button
              className="action-btn"
              onClick={() => onMoveTask(task.id, task.status === 'Done' ? 'In Progress' : 'To Do')}
              title="Move to previous column"
            >
              ↑ Move
            </button>
          )}
          {task.status !== 'Done' && (
            <button
              className="action-btn"
              onClick={() => onMoveTask(task.id, task.status === 'To Do' ? 'In Progress' : 'Done')}
              title="Move to next column"
            >
              Move ↓
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
