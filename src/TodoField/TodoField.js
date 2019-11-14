import React from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faExclamationCircle, faPauseCircle, faPlay, faTimes} from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Todo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
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
    font-size: 18px;
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
    margin-left: 5px;
    margin-top: 3px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Done = styled(FontAwesomeIcon)`
    color: #fff;
    margin-right: 5px;
    margin-top: 5px;
    
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Pause = styled(FontAwesomeIcon)`
    color: #fff;
    margin-right: 5px;
    margin-top: 5px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
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

class TodoField extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {this.props.errorsTypes.length > 0 && this.props.errorsTypes.map((e, index) => {
                    return (
                        <Error key={index}>
                            <ErrorIcon icon={faExclamationCircle}/>Ошибка #{index + 1} - {e}
                        </Error>
                    )
                })}
                <Wrapper>
                    <Todo>
                        {this.props.task.length === 0 ? <p>Пока задач нет</p> : <h3>Список задач</h3>}
                        {this.props.task.map((e, index) => {
                            return (
                                <TodoItem active={!e.complete && !e.pause}
                                          background={e.complete ? '#b6bac1' : '#7598D1'} key={index}>
                                    <Done icon={faCheck}
                                          onClick={() => this.props.completeItem(index, e.id)}/>
                                    <Title>{e.text}</Title>
                                    <CreationTime>Создано: {e.time}</CreationTime>
                                    <Time>Планируемое время: {e.hours}:{e.minutes}</Time>
                                    <Pause icon={e.pause ? faPlay : faPauseCircle}
                                           onClick={() => this.props.pauseItem(index, e.id)}/>
                                    <Close icon={faTimes} size="lg" onClick={() => this.props.removeItem(index, e.id)}/>
                                </TodoItem>
                            )
                        })}
                    </Todo>
                </Wrapper>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        task: [...state.root.task],
        validate: state.root.validate,
        error: state.root.error,
        errorsTypes: state.root.errorsTypes,
        currentFilter: state.filter.currentFilter
    }
}

const mapDispatchToProps = dispatch => ({
    removeItem: (index, id) => dispatch({type: 'REMOVE_ITEM', payload: {index, id}}),
    completeItem: (index, id) => dispatch({type: 'COMPLETE_ITEM', payload: {index, id}}),
    pauseItem: (index, id) => dispatch({type: 'PAUSE_ITEM', payload: {index, id}}),
    loadData: () => dispatch({type: 'LOAD'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoField)