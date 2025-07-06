import React, { useState } from 'react';

const PRIORITY_LEVELS = [
  { id: 'low', label: 'Low', color: '#28a745' },
  { id: 'medium', label: 'Medium', color: '#ffc107' },
  { id: 'high', label: 'High', color: '#dc3545' },
];

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([
    'Work', 'Personal', 'Shopping', 'Health', 'Finance'
  ]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const categoryToAdd = newCategory.trim();
    if (categoryToAdd && !availableCategories.includes(categoryToAdd)) {
      setAvailableCategories([...availableCategories, categoryToAdd]);
      setCategories([...categories, categoryToAdd]);
      setNewCategory('');
    }
  };

  const handleCategoryChange = (category) => {
    setCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        dueDate: dueDate || null,
        categories: [...categories],
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onAddTask(newTask);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCategories([]);
    }
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Add New Task</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">
            Task Title *
          </label>
          <input
            type="text"
            id="taskTitle"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="taskDescription" className="form-label">
            Description (Optional)
          </label>
          <textarea
            id="taskDescription"
            className="form-input form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Priority</label>
          <div className="priority-selector">
            {PRIORITY_LEVELS.map((level) => (
              <button
                key={level.id}
                type="button"
                className={`priority-btn ${priority === level.id ? 'active' : ''}`}
                style={{ '--priority-color': level.color }}
                onClick={() => handlePriorityChange(level.id)}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Due Date (Optional)</label>
          <input
            type="date"
            className="form-input"
            value={dueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categories (Optional)</label>
          <div className="category-checkboxes">
            {availableCategories.map((cat) => (
              <label key={cat} className="category-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
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

        <button type="submit" className="btn" style={{ marginTop: '15px' }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm; 