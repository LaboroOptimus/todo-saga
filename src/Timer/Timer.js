import React, {useEffect, useState,useReducer} from 'react'
import rootReducer from "../redux/rootReducer";
import {initialState} from "../redux/rootReducer";
import {connect} from 'react-redux';

const Timer = ({id}) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const [state, dispatch] = useReducer(rootReducer,initialState);

    function toggle() {
        console.log(state.description);
        setIsActive(!isActive);
        if(!isActive == false){
            localStorage.setItem(String(id),String(seconds))
        }
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <React.Fragment>
            <div className="time">
                {seconds}s
            </div>
            <div className="row">
                <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}
                        onClick={()=> toggle(1)}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="button" onClick={reset}>
                    Reset
                </button>
            </div>
        </React.Fragment>
    );
};

export default connect()(Timer);