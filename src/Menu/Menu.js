import React from 'react';
import styled from 'styled-components'
import {connect} from "react-redux";


const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    width: 100%;
`;

const ExitButton = styled.button`
    background: #1F5C53;
    color: #fff;
    border: 2px solid #1F5C53;
    font-size: 12px;
    border-radius: 20px;
    height: 30px;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
   
    
    :hover {
        background: transparent;
        border: 2px solid #1F5C53;
        color: #1F5C53;
    }
`;

const Menu = (props) => {
    return (
        <Wrapper>
            <ExitButton onClick={props.handleExit} type={'submit'}>Выйти из приложения</ExitButton>
        </Wrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        user_email: state.root.user_email
    }
}


const mapDispatchToProps = dispatch => ({
    handleExit: () => dispatch({type:"EXIT"})
})


export default connect(mapStateToProps, mapDispatchToProps)(Menu)