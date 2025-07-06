import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { loadTasks, saveTasks, loadUser, clearUser } from './utils/localStorage';

function App() {
  const [user, setUser] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load user and tasks from localStorage on component mount
  useEffect(() => {
    const savedUser = loadUser();
    const savedTasks = loadTasks();
    
    if (savedUser) {
      setUser(savedUser);
    }
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user) {
      saveTasks(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser('');
    setTasks([]);
    setActiveFilter('all');
    clearUser();
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? updatedTask : task
    ));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter tasks based on active filter and search term
  const filteredTasks = tasks.filter(task => {
    // Apply filter
    let matchesFilter = true;
    switch (activeFilter) {
      case 'completed':
        matchesFilter = task.completed;
        break;
      case 'pending':
        matchesFilter = !task.completed;
        break;
      default:
        matchesFilter = true;
    }

    // Apply search
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && (searchTerm === '' || matchesSearch);
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  // Show login screen if no user is logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      
      <div className="app-header">
        <h1 className="app-title">Personal Task Tracker</h1>
        <p className="app-subtitle">Welcome back, {user}!</p>
      </div>

      <TaskForm onAddTask={handleAddTask} />
      
      <div className="search-filter-container">
        <SearchBar onSearch={handleSearch} />
        <TaskFilter
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          taskCounts={taskCounts}
        />
      </div>
      
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
      <Footer />
    </div>
  );
}

export default App;