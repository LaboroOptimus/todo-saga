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
       box-shadow: 0 -200px 100px -100px #39256F inset;
    }
  `}
}
`;

const Title = styled.p`
    color: #fff;
    margin:0;
    padding: 0;
    flex-grow: 1;
`;

const Time = styled.p`
    color: #fff;
    margin: 0;
    padding: 0;
    margin-right: 10px;
`;

const Close = styled(FontAwesomeIcon)`
    color: #fff;
    margin-left: 5px;
    
    :hover {
        color: #C65C53;
        cursor: pointer;
    }
`;

const Done = styled(FontAwesomeIcon)`
    color: #fff;
    margin-right: 5px;
    
    :hover {
        color: #2B8247;
        cursor: pointer;
    }
`;

const Pause = styled(FontAwesomeIcon)`
    color: #fff;
    margin-right: 5px;
    :hover {
        color: #C4BD4F;
        cursor: pointer;
    }
`;

const CreationTime = styled.span`
    margin-right: 10px;
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
                        {this.props.task.map((e, index) => {
                            return (
                                <TodoItem active={!e.complete && !e.pause}
                                          background={e.complete ? '#b6bac1' : '#7598D1'} key={index}>
                                    <Done icon={faCheck} size="lg" onClick={() => this.props.completeItem(index)}/>
                                    <Title>{e.text}</Title>
                                    <CreationTime>{e.time}</CreationTime>
                                    <Time>{e.hours}:{e.minutes}</Time>
                                    <Pause icon={e.pause ? faPlay : faPauseCircle} size="lg"
                                           onClick={() => this.props.pauseItem(index)}/>
                                    <Close icon={faTimes} size="lg" onClick={() => this.props.removeItem(index)}/>
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
    removeItem: index => dispatch({type: 'REMOVE_ITEM', payload: index}),
    completeItem: index => dispatch({type: 'COMPLETE_ITEM', payload: index}),
    pauseItem: index => dispatch({type: 'PAUSE_ITEM', payload: index}),
    loadData: () => dispatch({type: 'LOAD'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoField)