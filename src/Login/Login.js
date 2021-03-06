import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from "react-redux";

const Wrapper = styled.div`
    padding-top: 30px;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  margin-right: 10px;
  background: #5264AE;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  line-height: 38px;
  border-radius: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 170px;
  text-align: center;
  border: 0;
  
  :hover, :focus {
    background: #fff;
    color: #5264AE;
    box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32);
    cursor: pointer;
  }
`;

const Label = styled.label`
  color: #999; 
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all; 
  -moz-transition: 0.2s ease all; 
  -webkit-transition: 0.2s ease all;
`;

const animationHighlight = keyframes`
  0% { background:#5264AE; }
  100% { width:0; background:transparent }
`;

const Highlight = styled.span`
  position: absolute;
  height: 60%; 
  width: 100px; 
  top: 25%; 
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 300px;
  
  :before, :after {
      content: '';
      height: 2px; 
      width: 0;
      bottom: 1px; 
      position: absolute;
      background: #5264AE; 
      transition: 0.2s ease all; 
      -moz-transition: 0.2s ease all; 
      -webkit-transition: 0.2s ease all;
  }
  
  :before {
    left:50%;
  }
  
  :after {
    right:50%; 
  }
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
  
  :focus {
    outline: none; 
  }
  
  :focus ~ ${Bar}:before, :focus ~ ${Bar}:after {
    width: 50%;
  }
  
  :focus ~ ${Highlight} {
    -webkit-animation: ${animationHighlight} 0.3s ease;
    -moz-animation: ${animationHighlight}  0.3s ease;
    animation: ${animationHighlight} 0.3s ease;
   }
  
  :focus~${Label}, &:valid ~ ${Label} {
     top: -20px;
     font-size: 14px;
     color: #5264AE;
  }
`;

const FormGroup = styled.div`
    margin: 0 auto;
    position: relative; 
    margin-bottom: 45px; 
`;

function Login(props) {
    return (
        <Wrapper>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <FormGroup>
                    <Input type="text" onChange={props.onChangeEmail} value={props.user_email}
                           required="required"/>
                    <Highlight/>
                    <Bar/>
                    <Label htmlFor="hours">Введите email для входа</Label>
                </FormGroup>
                <Button type="submit" onClick={props.onLogin}>Войти</Button>
            </form>
        </Wrapper>
    )
}

function mapStateToProps(state) {
    return {
        isLogin: state.root.isLogin,
        user_email: state.root.user_email
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: () => dispatch({type: 'LOGIN'}),
        onChangeEmail: (e) => dispatch({type: 'CHANGE_EMAIL', payload: e.target.value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)