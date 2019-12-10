import React, {useEffect, useState, useReducer} from 'react'
import rootReducer from "../redux/rootReducer";
import {initialState} from "../redux/rootReducer";
import {connect} from 'react-redux';
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPauseCircle, faPlay} from '@fortawesome/free-solid-svg-icons'
import {playPomodoroTimer, checkFormatTimer} from "../utils/pomodoro";


const Pause = styled(FontAwesomeIcon)`
    color: #fff;
    margin-left: 8px;
    
    margin-top: 8px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;


const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const [state, dispatch] = useReducer(rootReducer, initialState);

    function toggle() {
        console.log(state.description);
        setIsActive(!isActive);
        if (!isActive === false) {
            localStorage.setItem(String(props.itemId), String(seconds))
           // props.checkTimer();
        }
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    function playTimer(index, id) {
        props.playItem(index, id);
        toggle(1);
    }

    function pauseTimer(index,id) {
        props.pauseItem(index,id);
        toggle(1);
    }

    function getItem(itemId){
       for(let i = 0; i<props.task.length; i++){
           if(props.task[i].id === itemId){
             //  console.log(props.task[i]);
               return {
                   s: props.task[i].timerSec,
                   m: props.task[i].timerMin,
                   h: props.task[i].timerHour
               }


               //return props.task[i];
           }
       }
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);

            let item = getItem(props.itemId);

            props.checkTimer(props.itemId, item);


        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <React.Fragment>
            <div className="time">
                {/*{seconds}s*/}
                {props.type === 'play' ?
                    (<Pause icon={faPlay}
                            onClick={() => playTimer(props.index, props.itemId)}/>) :
                    (<Pause icon={faPauseCircle}
                            onClick={() => pauseTimer(props.index, props.itemId)}/>
                    )
                }
            </div>
            <div className="row">
                {/*<button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`}
                        onClick={() => toggle(1)}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="button" onClick={reset}>
                    Reset
                </button>*/}
            </div>
        </React.Fragment>
    );
};


function mapDispatchToProps(dispatch) {
    return {
        pauseItem: (index, id) => dispatch({type: 'PAUSE_ITEM', payload: {index, id}}),
        playItem: (index, id) => dispatch(playPomodoroTimer(index, id)),
        checkTimer: (id, item) => dispatch(checkFormatTimer(id,item))
    }
}

function mapStateToProps(state) {
    return {
        task: [...state.root.task],
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);