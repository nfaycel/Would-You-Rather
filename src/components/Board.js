import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Board extends Component {
    render() {
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            <div>
                LeaderBoard
            </div>
        )
    }
}

const mapStateToProps = (authedUser) => (
    authedUser
  )

export default connect(mapStateToProps)(Board)