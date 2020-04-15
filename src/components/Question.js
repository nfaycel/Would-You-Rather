import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Question extends Component {

    render() {
        console.log("the id =",this.props.id)
        const poll = this.props.questions[this.props.id]
        console.log(poll)
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            
            <div>
                {!(poll.optionOne.votes.includes(this.props.authedUser))&&
                    !(poll.optionTwo.votes.includes(this.props.authedUser))
                ? (<p>select this</p>)
                : <ul>
                    <li>poll author: {poll.author}</li>
                    <li>poll id: {poll.id}</li>
                    <li>poll optionOne: {poll.optionOne.text}</li>
                    <li>poll optionTwo: {poll.optionTwo.text}</li>
                    <li>poll timestamp: {poll.timestamp}</li>
                </ul>
                }
                
            </div>
        )
    }
}

const mapStateToProps = ({authedUser,questions}, props) => {
const {id} = props.match.params
 return{
     authedUser,
     questions,
     id
 }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Question)