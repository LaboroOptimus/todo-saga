import React from 'react'
import styled from 'styled-components'

const Circle = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    margin-left: 3px;
    margin-right: 3px;
`;


function StatusCircles(props) {
    const numm = props.numm;
    return (
        <div>
            {Array(numm).fill(<Circle />)}
        </div>
    )
}

export default StatusCircles