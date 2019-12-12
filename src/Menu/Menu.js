import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    width: 100%;
`;

const ExitIcon = styled(FontAwesomeIcon)`
    color: #5264AE;
    margin-left: 5px;
    margin-top: 6px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Exit = styled.div`
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 20px;
`;

const ExitSpan = styled.span`
   
    color: #5264AE;
    font-size: 17px;
    border-bottom: 1px solid transparent;
    
    :hover {
        cursor: pointer;
        border-bottom: 1px dashed #5264AE;
    }
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
        cursor: pointer;
    }
`;

const User = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
`;

const UserImage = styled.img`
   width: 30px;
   height: 30px;
   border-radius: 50%;
   margin-top: 7px;
   margin-right: 5px;
   background-image: ${props => props.backgroundImage}
`;

const UserInfo = styled.span`
    padding-top: 13px;
`;

const Menu = (props) => {

    useEffect(() => {
        props.loadUser();
    }, [])

    return (
        <Wrapper>

            <Exit onClick={props.handleExit}>
                <ExitSpan>Выход <ExitIcon icon={faSignOutAlt}/></ExitSpan>
            </Exit>
            {props.user_email.length > 1 ?
                (<User>
                    <UserImage backgroundImage={'url(https://via.placeholder.com/30)'}/>
                    <UserInfo>Привет, {props.user_email}</UserInfo>
                </User>) : null}
        </Wrapper>
    )
};

const mapStateToProps = (state) => {
    return {
        user_email: state.root.user_email
    }
};

const mapDispatchToProps = dispatch => ({
    handleExit: () => dispatch({type: "EXIT"}),
    loadUser: () => dispatch({type: "LOAD_USER"})
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu)