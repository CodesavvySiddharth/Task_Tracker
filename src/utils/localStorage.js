// localStorage utility functions for task management

const TASKS_KEY = 'taskTracker_tasks';
const USER_KEY = 'taskTracker_user';

// Task storage functions
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

// User storage functions
export const saveUser = (username) => {
  try {
    localStorage.setItem(USER_KEY, username);
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const loadUser = () => {
  try {
    return localStorage.getItem(USER_KEY) || '';
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return '';
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user from localStorage:', error);
  }
}; 