import React from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Todo = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-top: 50px;
    border: 2px solid #eee;
    border-radius: 5px;
    padding: 20px;
`

const TodoItem = styled.div`
    display: flex;
    text-align: left;
    background: #7598D1;
    color: #fff;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px; 
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
    
    :hover {
        color: #C65C53;
        cursor: pointer;
    }
`;

const Error = styled.p`
    color: #B83F3D;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    color: #B83F3D
    margin-right: 5px;
`;


class TodoField extends React.Component {

    render() {
        console.log(this.props.errorsTypes)
        return(
            <React.Fragment>
                { /*{this.props.validate && this.props.error ? <p>Произошла ошибка, введите еще раз</p> : null}*/ }
                {this.props.errorsTypes.length > 0 && this.props.errorsTypes.map((e,index)=>{
                    return (
                        <Error key={index}>
                            <ErrorIcon icon={faExclamationCircle}/>Ошибка #{index + 1} - {e}
                        </Error>
                    )
                })}
                <Wrapper>
                        <Todo>
                            {this.props.task.map((e,index)=>{
                                return (
                                    <TodoItem key={index}>
                                        <Title>{e.text}</Title>
                                        <Time>{e.hours} : {e.minutes}</Time>
                                        <Close icon={faTimes} size="lg" onClick={()=> this.props.removeItem(index)} />
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
        task: [...state.task],
        validate: state.validate,
        error: state.error,
        errorsTypes: state.errorsTypes,
    }
}

const mapDispatchToProps = dispatch => ({
    removeItem: index => dispatch({type: 'REMOVE_ITEM', payload:index})
})



/*function mapDispatchToProps(dispatch) {
    return {
        removeItem: (id) => dispatch({type: 'REMOVE_ITEM', payload:id})
    }
}*/



export default connect(mapStateToProps,mapDispatchToProps)(TodoField)