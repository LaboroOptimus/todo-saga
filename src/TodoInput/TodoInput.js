import React from 'react'
import {connect} from 'react-redux'


class TodoInput extends React.Component {


    render(){
        return(
            <div>
                <form onSubmit={e => {e.preventDefault()}}>
                    <input type="text"  onChange={this.props.onChangeText} placeholder="Введите название задачи" value={this.props.text}/>

                    <label htmlFor="hours">Кол-во часов</label>
                    <input type="text" placeholder="0" name="hours" onChange={this.props.onChangeHours} value={this.props.hours}/>

                    <label htmlFor="minutes">Кол-во минут</label>
                    <input type="text" placeholder="10" name="minutes" onChange={this.props.onChangeMinutes} value={this.props.minutes}/>

                    <button type="submit" onClick={this.props.onAdd}>Добавить</button>
                </form>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        text:state.text,
        hours:state.hours,
        minutes:state.minutes,
        task: state.task,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        onChangeText: (e) => dispatch({type: 'CHANGE_TEXT', payload:e.target.value}),
        onChangeHours: (e) => dispatch({type: 'CHANGE_HOURS', payload: e.target.value}),
        onChangeMinutes: (e) => dispatch({type: 'CHANGE_MINUTES', payload: e.target.value}),
        onAdd: () => dispatch({type:'ADD'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)