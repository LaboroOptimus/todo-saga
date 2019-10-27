import React from 'react';
import './App.css';
import TodoInput from "./TodoInput/TodoInput";
import TodoField from "./TodoField/TodoField";

function App() {
  return (
    <div className="App">
      <TodoInput/>
      <TodoField/>
    </div>
  );
}

export default App;
