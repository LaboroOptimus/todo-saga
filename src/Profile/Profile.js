import React, {useState, useEffect, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faPencilAlt,faDownload} from '@fortawesome/free-solid-svg-icons'

import {connect} from "react-redux";
import {previewFile,uploadData} from "../utils/profile";
import {ReactComponent as Rings} from "../rings.svg";

const Preloader = styled(Rings)`
    fill: #000;
`;

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
    width: 300px;
    height: 300px;
`;

const Input = styled.input`

    
`;

const InputBlock = styled.div`

`;

const File = styled.input`
    margin-top: 10px;
`;

const Download = styled(FontAwesomeIcon)`
    color: #d8d8d8; 
    font-size: 70px;
    margin-top: 10px;
`;

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

const Dropzone = styled.div`
    margin-top: 10px;
    height: 150px;
    border: 4px dashed #d8d8d8;
    padding: 20px;
`;

const DropzoneText = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #d8d8d8;
`;

function Profile(props) {

    window.onload = function() {
        props.onLoadUserData();
    };

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <Wrapper>
            <Container>
                <ImgBlock>
                    {props.fileSrc.length === 0 ? <Preloader/> : <Img src={props.fileSrc}/>}
                    <File type='file' onChange={props.onChangeFile}/>
                    <Dropzone {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} onChange={props.onChangeFile} />
                            <Download icon={faDownload} size={'lg'}/>
                            <DropzoneText>Перетащите файл</DropzoneText>
                    </Dropzone>
                </ImgBlock>
                <FormBlock>
                    <InputTitle>Имя <Edit icon={faPencilAlt} onClick={props.onEditName}/></InputTitle>
                    {props.isNameShow && <Name>{props.name}</Name>}
                    {props.editName && (<InputBlock>
                        <Input onChange={props.onChangeName} placeholder='Введите имя'
                               value={props.name}/>
                        <Check icon={faCheck} onClick={props.onCheckName}/>
                    </InputBlock>)}
                    <InputTitle>Email <Edit icon={faPencilAlt} onClick={props.onEditEmail}/></InputTitle>
                    {props.isEmailShow && <Email>{props.email}</Email>}
                    {props.editEmail && (
                        <InputBlock>
                            <Input onChange={props.onChangeEmail} placeholder='Введите email'
                                   value={props.email}/>
                            <Check icon={faCheck} onClick={props.onCheckEmail}/>
                        </InputBlock>)}
                    {((props.isEmailChanged && !props.editEmail) || (props.isNameChanged && !props.editName)) &&
                    (<Button onClick={() => props.onUploadUserData(props.email,props.name)}>Сохранить изменения</Button>)}
                </FormBlock>

            </Container>
        </Wrapper>
    )
}

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
        onUploadUserData: (email,name) => uploadData(email,name),
        onLoadUserData: () => dispatch({type: 'LOAD_USER_DATA'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)