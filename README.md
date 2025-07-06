# Task_Tracker
# Personal Task Tracker

A modern, responsive web application built with React.js for managing personal tasks efficiently. This application allows users to create, edit, delete, and track their tasks with a clean and intuitive interface.

## ✨ Features

- **User Authentication**: Simple username-based login stored in localStorage
- **Task Management**: Add, edit, delete, and toggle task completion status
- **Task Details**: Each task includes title, optional description, and timestamps
- **Task Filtering**: Filter tasks by All, Completed, or Pending with real-time counts
- **Data Persistence**: All data is automatically saved to localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download the project files
2. Navigate to the project directory:
   ```bash
   cd task-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## 📁 Project Structure

```
task-tracker/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Login.js        # User login component
│   │   ├── TaskForm.js     # Add new task form
│   │   ├── TaskItem.js     # Individual task display
│   │   ├── TaskList.js     # Task list container
│   │   └── TaskFilter.js   # Task filtering tabs
│   ├── utils/
│   │   └── localStorage.js # localStorage helper functions
│   ├── styles/
│   │   └── index.css       # Global styles and responsive design
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🎯 How to Use

### 1. Getting Started
- Enter your username to log in (no password required)
- Your username will be saved for future sessions

### 2. Adding Tasks
- Use the "Add New Task" form at the top
- Enter a task title (required)
- Optionally add a description
- Click "Add Task" to save

### 3. Managing Tasks
- **Complete/Incomplete**: Click the toggle button to mark tasks as done
- **Edit**: Click "Edit" to modify task title and description
- **Delete**: Click "Delete" to remove tasks permanently

### 4. Filtering Tasks
- Use the filter tabs to view:
  - **All**: Shows all tasks
  - **Pending**: Shows incomplete tasks only
  - **Completed**: Shows completed tasks only
- Each tab shows the count of tasks in that category

### 5. Logging Out
- Click the "Logout" button in the top-right corner
- This will clear your session and return to the login screen

## 🛠️ Technical Details

### Built With
- **React.js**: Frontend framework with functional components and hooks
- **CSS3**: Custom styling with responsive design
- **localStorage**: Client-side data persistence
- **React Hooks**: useState, useEffect for state management

### Key Features
- **No External Dependencies**: Uses only React core libraries
- **Responsive Design**: Mobile-first approach with CSS media queries
- **Error Handling**: Graceful localStorage error handling
- **Performance**: Optimized re-renders and efficient state management

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (not recommended)

## 📝 Data Storage

All data is stored locally in the browser's localStorage:
- User sessions persist across browser sessions
- Tasks are automatically saved and restored
- No server or database required

## 🎨 Customization

The application uses CSS custom properties and can be easily customized by modifying the styles in `src/styles/index.css`. The color scheme, fonts, and layout can all be adjusted to match your preferences.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements or bug fixes.

## 📄 License

This project is open source and available under the ISC License.

---

**Happy Task Tracking!** 🎉 