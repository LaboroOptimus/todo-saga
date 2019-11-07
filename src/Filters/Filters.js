import React from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'

const Wrapper = styled.div`
    display: flex;
    margin: 60px 20px 20px;
    justify-content: center;
`;

const Filter = styled.button`
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color}; /*#1F5C53;*/
    border: 2px solid #1F5C53;
    margin-left: 10px;
    margin-right: 10px;
    padding: 5px 8px;
    border-radius: 20px;
    
    :hover {
    cursor: pointer;
    }
    
    :focus {
    outline: 0;
    }
 
`;

const FilterName = styled.span`
       margin: 0;
       padding: 0;
`;

class Filters extends React.Component {

    render() {
        const filter = this.props.currentFilter;
        console.log('выбранный фильтр:' + filter);
        return (
            <Wrapper>
                <Filter onClick={() => this.props.filterTasks('in work')}
                        color={filter === 'in work' ? '#fff' : '#1F5C53'}
                        backgroundColor={filter === 'in work' ? '#1F5C53' : 'transparent'}>
                    <FilterName>в работе</FilterName>
                </Filter>
                <Filter onClick={() => this.props.filterTasks('done')}
                        color={filter === 'done' ? '#fff' : '#1F5C53'}
                        backgroundColor={filter === 'done' ? '#1F5C53' : 'transparent'}>
                    <FilterName>завершенные</FilterName>
                </Filter>
                <Filter onClick={() => this.props.filterTasks('pause')}
                        color={filter === 'done' ? '#fff' : '#1F5C53'}
                        backgroundColor={filter === 'done' ? '#1F5C53' : 'transparent'}>
                    <FilterName>на паузе</FilterName>
                </Filter>
            </Wrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentFilter: state.filter.currentFilter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filterTasks: (filter) => dispatch({type: 'FILTER_TASKS', payload: filter})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)