import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Question extends Component {
    render() {
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            <div>
                1 Question detaille 
            </div>
        )
    }
}

const mapStateToProps = (authedUser) => (
    authedUser
  )

export default connect(mapStateToProps)(Question)