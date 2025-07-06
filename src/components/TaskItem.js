import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const PRIORITY_COLORS = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545'
  };

  const PRIORITY_LABELS = {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editCategories, setEditCategories] = useState(task.categories || []);
  const [availableCategories, setAvailableCategories] = useState([
    'Work', 'Personal', 'Shopping', 'Health', 'Finance', ...(task.categories || [])
  ].filter((value, index, self) => self.indexOf(value) === index));
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    const categoryToAdd = newCategory.trim();
    if (categoryToAdd && !availableCategories.includes(categoryToAdd)) {
      const updatedCategories = [...availableCategories, categoryToAdd];
      setAvailableCategories(updatedCategories);
      setEditCategories([...editCategories, categoryToAdd]);
      setNewCategory('');
    }
  };

  const handleCategoryChange = (category) => {
    setEditCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        dueDate: editDueDate || null,
        categories: [...editCategories],
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority || 'medium');
    setEditDueDate(task.dueDate || '');
    setEditCategories(task.categories || []);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today && !task.completed;
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            className="form-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-input form-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categories</label>
          <div className="category-checkboxes">
            {availableCategories.map((cat) => (
              <label key={cat} className="category-checkbox-label">
                <input
                  type="checkbox"
                  checked={editCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="category-checkbox"
                />
                <span className="category-checkbox-custom"></span>
                <span className="category-checkbox-text">{cat}</span>
              </label>
            ))}
          </div>
          <div className="add-category">
            <input
              type="text"
              className="form-input"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory(e)}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleAddCategory}
              disabled={!newCategory.trim()}
            >
              Add
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <div className="priority-selector">
            {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`priority-btn ${editPriority === key ? 'active' : ''}`}
                style={{ '--priority-color': PRIORITY_COLORS[key] }}
                onClick={() => setEditPriority(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-input"
            value={editDueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
        </div>

        <div className="task-actions">
          <button onClick={handleEdit} className="btn btn-success">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div style={{ flex: 1 }}>
          <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>
      
      <div className="task-meta">
        <div>
          <span className={`priority-badge ${task.priority || 'medium'}-priority`}>
            {PRIORITY_LABELS[task.priority || 'medium']}
          </span>
          {task.categories?.map(category => (
            <span key={category} className="category-badge">
              {category}
            </span>
          ))}
          <span>Created: {formatDate(task.createdAt)}</span>
          {task.dueDate && (
            <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              Due: {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && ' (Overdue)'}
            </span>
          )}
        </div>
        {task.updatedAt !== task.createdAt && (
          <span>Updated: {formatDate(task.updatedAt)}</span>
        )}
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggle(task.id)}
          className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-secondary"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem; 