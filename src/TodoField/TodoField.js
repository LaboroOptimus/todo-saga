import React, {useEffect} from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faExclamationCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
import StatusCircles from '../StatusCircles/StatusCircles'
import Timer from "../Timer/Timer";
import {playPomodoroTimer} from "../utils/pomodoro";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Todo = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 75%;
    margin-top: 20px;
    border: 2px solid #eee;
    border-radius: 5px;
    padding: 20px;
`;

const TodoItem = styled.div`
    display: flex;
    text-align: left;
    background: ${props => props.background};
    color: #fff;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px; 
    margin-left: 10px;
    width: 30%;
    
    ${({active}) => active && `
    box-shadow: 0 -200px 100px -120px #625EC9 inset;
    animation: background 3s infinite alternate;
    
    @keyframes background {
     50% {
       background: #39256F;
       box-shadow: 0 -200px 100px -100px #05033e inset;
    }
  `}
}
`;

const Title = styled.p`
    color: #fff;
    margin:0;
    padding: 0;
    flex-grow: 1;
    font-size: 22px;
    font-weight: bold;
    margin-left: 10px;
`;

const Description = styled.p`
    color: #fff;
    margin:0;
    padding: 0;
    font-size: 16px;
 
`;

const Time = styled.p`
    color: #fff;
    margin: 0;
    padding: 0;
    margin-right: 10px;
    margin-top: 3px;
    font-size: 13px;
`;

const Close = styled(FontAwesomeIcon)`
    color: #fff;
    margin-left: 8px;

    margin-top: 6px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Done = styled(FontAwesomeIcon)`
    color: #fff;
   
    margin-top: 8px;
    margin-left: 8px;
   
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Pause = styled(FontAwesomeIcon)`
    color: #fff;
    margin-left: 8px;
    
    margin-top: 8px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const CreationTime = styled.span`
    margin-right: 10px;
    font-size: 13px;
    margin-top: 3px;
`;

const Error = styled.p`
    color: #B83F3D;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    color: #B83F3D
    margin-right: 5px;
`;


function TodoField(props) {

    useEffect(() => {
        props.loadData();
        props.watchTimer();
    }, [])

    return (
        <React.Fragment>
            {props.errorsTypes.length > 0 && props.errorsTypes.map((e, index) => {
                return (
                    <Error key={index}>
                        <ErrorIcon icon={faExclamationCircle}/>Ошибка #{index + 1} - {e}
                    </Error>
                )
            })}
            {props.task.length === 0 ? <p>Пока задач нет</p> : <h3>Список задач</h3>}
            <Wrapper>
                <Todo>
                    {props.task.map((e, index) => {
                        return (
                            <TodoItem active={!e.complete && !e.pause}
                                      background={e.complete ? '#b6bac1' : '#7598D1'} key={index}>
                                <Column>
                                    <Row>
                                        {!e.complete ? <Done icon={faCheck} onClick={() => props.completeItem(index, e.id)}/> : null}
                                        {!e.complete ?
                                            (e.pause ?
                                                    (<Timer type={'play'} itemId={e.id} index={index}/>) :
                                                    (<Timer type={'pause'} itemId={e.id} index={index}/>)
                                             )
                                            : null}
                                       {/* {e.pause ?
                                            (<Timer type={'play'} itemId={e.id} index={index}/>) :
                                            (<Timer type={'pause'} itemId={e.id} index={index}/>)
                                        }*/}
                                        <Close size="lg" icon={faTimes}
                                               onClick={() => props.removeItem(index, e.id)}/>
                                        <Title>{e.text}</Title>
                                    </Row>
                                    <Row>
                                        <Description>{e.description}</Description>
                                    </Row>

                                    <Row>
                                        <StatusCircles numm={e.timeToEnd}/>
                                    </Row>

                                    <Row>
                                        <CreationTime>Создано: {e.time}</CreationTime>
                                        <Time>Планируемое время: {e.hours}:{e.minutes}</Time>
                                        <Time>Прошло: <br/>{e.timerHour}:{e.timerMin}:{e.timerSec}</Time>
                                    </Row>
                                </Column>
                            </TodoItem>
                        )
                    })}
                </Todo>
            </Wrapper>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        task: [...state.root.task],
        validate: state.root.validate,
        error: state.root.error,
        errorsTypes: state.root.errorsTypes,
        currentFilter: state.filter.currentFilter,
    }
}

const mapDispatchToProps = dispatch => ({
    removeItem: (index, id) => dispatch({type: 'REMOVE_ITEM', payload: {index, id}}),
    completeItem: (index, id) => dispatch({type: 'COMPLETE_ITEM', payload: {index, id}}),
    pauseItem: (index, id) => dispatch({type: 'PAUSE_ITEM', payload: {index, id}}),
    playItem: (index, id) => dispatch(playPomodoroTimer(index, id)),
    loadData: () => dispatch({type: 'LOAD'}),
    watchTimer: () => dispatch({type: 'CHECK_TIMER'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoField)