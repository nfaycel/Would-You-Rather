import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AddQuestion extends Component {
    render() {
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            <div>
                Add question +
            </div>
        )
    }
}


const mapStateToProps = (authedUser) => (
    authedUser
  )

export default connect(mapStateToProps)(AddQuestion)