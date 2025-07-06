import React from 'react';

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
          <span className="task-count">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter; 