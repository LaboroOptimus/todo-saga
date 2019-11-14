import React from 'react';
import './App.css';
import TodoInput from "./TodoInput/TodoInput";
import TodoField from "./TodoField/TodoField";
import Filters from "./Filters/Filters";
import {connect} from "react-redux";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";


function isLogin(){
    return !(localStorage.user === '' || !localStorage.user);
}



const App = (props) => {
    return (
        <div className="App">
            {isLogin() ?  (
                <React.Fragment>
                    <Menu/>
                    <TodoInput/>
                    <Filters/>
                    <TodoField/>
                </React.Fragment>
            ):
                (<Login/>)
            }
        </div>
    );
}


function mapStateToProps(state) {
    return {
        isLogin: state.root.isLogin,
        /*user_email: state.root.user_email*/
    }
}


export default connect(mapStateToProps)(App)
