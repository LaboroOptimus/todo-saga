import React from 'react';
import './App.css';
import TodoInput from "./TodoInput/TodoInput";
import TodoField from "./TodoField/TodoField";
import Filters from "./Filters/Filters";

function App() {
    return (
        <div className="App">
            <TodoInput/>
            <Filters/>
            <TodoField/>

        </div>
    );
}

export default App;
