import React from 'react';
import './App.css';
import Todo from "./Todo/Todo";
import {Route, Switch} from 'react-router-dom';
import Profile from "./Profile/Profile";

const App = (props) => {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={Todo}/>
                <Route exact path='/profile' component={Profile}/>
            </Switch>
        </div>
    );
};

export default App
