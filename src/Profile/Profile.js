import React from 'react'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faCheck} from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";
import {previewFile} from "../utils/profile";


const Wrapper = styled.div`
    padding: 30px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const FormBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`;

const ImgBlock = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const InputTitle = styled.h4`
     text-align: left;
     margin: 5px 0;
`;

const Img = styled.img`
    
`;

const Input = styled.input`

    
`;

const InputBlock = styled.div`

`;

const File = styled.input`
    margin-top: 10px;

`

const Edit = styled(FontAwesomeIcon)`
    color: #000;
    margin-left: 8px;

    margin-top: 6px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Check = styled(FontAwesomeIcon)`
    color: #000;
    margin-left: 8px;

    margin-top: 6px;
    :hover {
        color: #02122c;
        cursor: pointer;
    }
`;

const Name = styled.h3`
    text-align: left;
    margin: 0;
`;

const Email = styled.h3`
    text-align: left;
    margin: 0;
`;

const Button = styled.button`
    margin-top: 10px;
`;


const Profile = (props) => {
    return (
        <Wrapper>
            <Container>
                <ImgBlock>
                    <Img src={props.fileSrc}/>
                    <File type='file' onChange={props.onChangeFile}/>
                </ImgBlock>
                <FormBlock>
                    <InputTitle>Имя <Edit icon={faPencilAlt} onClick={props.onEditName}/></InputTitle>
                    {props.isNameShow && <Name>{props.name}</Name>}
                    {props.editName && (<InputBlock>
                        <Input onChange={props.onChangeName} placeholder='Введите имя' value={props.name}/>
                        <Check icon={faCheck} onClick={props.onCheckName}/>
                    </InputBlock>)}

                    <InputTitle>Email <Edit icon={faPencilAlt} onClick={props.onEditEmail}/></InputTitle>
                    {props.isEmailShow && <Email>{props.email}</Email>}
                    {props.editEmail && (
                    <InputBlock>
                        <Input onChange={props.onChangeEmail} placeholder='Введите email' value={props.email}/>
                        <Check icon={faCheck} onClick={props.onCheckEmail}/>
                    </InputBlock>)}
                    {((props.isEmailChanged && !props.editEmail) || (props.isNameChanged && !props.editName)) && (<Button>Сохранить изменения</Button>)}
                </FormBlock>

            </Container>
        </Wrapper>
    )
};

function mapStateToProps(state) {
    return {
        editName: state.profile.editName,
        editEmail: state.profile.editEmail,
        email: state.profile.email,
        name: state.profile.name,
        isEmailChanged: state.profile.isEmailChanged,
        isNameChanged: state.profile.isNameChanged,
        isEmailShow: state.profile.isEmailShow,
        isNameShow: state.profile.isNameShow,
        fileSrc: state.profile.fileSrc
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEditName: () => dispatch({type: 'EDIT_NAME'}),
        onEditEmail: () => dispatch({type: 'EDIT_EMAIL'}),
        onCheckName: () => dispatch({type: 'CHECK_NAME'}),
        onCheckEmail: () => dispatch({type: 'CHECK_EMAIL'}),
        onChangeName: (e) => dispatch({type: 'CHANGE_NAME', payload: e.target.value}),
        onChangeEmail: (e) => dispatch({type: 'CHANGE_EMAIL', payload: e.target.value}),
        onChangeFile: (e) => previewFile(e.target.files[0]),
        /*onChangeFile: (e) => dispatch({type: 'CHANGE_FILE', payload: e.target.files[0]}),*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)