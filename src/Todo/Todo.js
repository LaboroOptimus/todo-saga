import React from 'react'
import Menu from "../Menu/Menu";
import TodoInput from "../TodoInput/TodoInput";
import TodoField from "../TodoField/TodoField";
import Filters from "../Filters/Filters";
import Login from "../Login/Login";
import {connect} from 'react-redux'

function isLogin() {
    return !(localStorage.user === '' || !localStorage.user);
}


const Todo = () => {
    return (
        <div>
        {isLogin() ? (
                <React.Fragment>
                    <Menu/>
                    <TodoInput/>
                    <Filters/>
                    <TodoField/>
                </React.Fragment>
            ) :
            (<Login/>)}
        </div>
    )
};

function mapStateToProps(state) {
    return {
        isLogin: state.root.isLogin,
    }
}

export default connect(mapStateToProps)(Todo)