import React from 'react';
import './App.css';
import TodoInput from "./TodoInput/TodoInput";
import TodoField from "./TodoField/TodoField";
import Filters from "./Filters/Filters";
import {connect} from "react-redux";
import Login from "./Login/Login";

const App = (props) => {
    return (
        <div className="App">
            {localStorage.user ? (
                <React.Fragment>
                    <TodoInput/>
                    <Filters/>
                    <TodoField/>
                </React.Fragment>
            ):(
                <Login/>
            )}
        </div>
    );
}

/*function App() {
    console.log(this.props);
    return (
        <div className="App">
                <React.Fragment>
                    <TodoInput/>
                    <Filters/>
                    <TodoField/>
                </React.Fragment>
        </div>
    );
}*/

function mapStateToProps(state) {
    return {
        isLogin: state.root.isLogin,
    }
}


export default connect(mapStateToProps)(App)
