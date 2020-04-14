import React, { Component } from "react"
import {Link} from 'react-router-dom'
import { Navbar, Nav} from "react-bootstrap"
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


class Menu extends Component {
  componentDidMount(){
    console.log("xxx: dispatch = ", this.props.dispatch)
    console.log('withrouter = ',this.props.history)
  }


  render() {
    
    const authed_user = this.props.authedUser
    const dispatch = this.props.dispatch
    const { location } = this.props.history;

    const link_state = !authed_user?"disabled":null
    // if(this.props.authedUser === null){
    //   return <Redirect to="/Login"/>
    // }


    return (
      //className='fixed-top'
      <Navbar collapseOnSelect expand="md" bg="navbar-dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Would You Rather</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} eventKey="/" to="/" disabled={link_state}><i className="fa fa-home mr-1"  aria-hidden="true"></i>Home</Nav.Link>
            <Nav.Link as={Link} eventKey="/add" to="/add" disabled={link_state} ><i className="fa fa-plus-square mr-1"   aria-hidden="true"></i>Ask question</Nav.Link>
            <Nav.Link as={Link} eventKey="/leaderboard" to="/leaderboard" disabled={link_state}><i className="fa fa-clipboard mr-1"   aria-hidden="true"></i>Leader Board</Nav.Link>
          </Nav>
          
          {authed_user !== null && authed_user !== "" ? (
          <Nav>
            <Navbar.Text className='mr-1' style={{color:"#F7F8DD"}}>
              Hello: {authed_user}
            </Navbar.Text>
            <Avatar color={"#C28EFC"} name={authed_user} size="40" round={true} />
            <Nav.Link className='ml-3' onClick={()=> dispatch({type:"LOGOUT"})}>Logout<i className="fa fa-sign-out ml-1" aria-hidden="true"></i></Nav.Link>
          </Nav>)
          :( null
          //   <Nav>
          //   < Nav.Link as={Link} to="/login" className='ml-3'>Login<i className="fa fa-sign-in ml-1" aria-hidden="true"></i></Nav.Link>
          // </Nav>
          )}
          
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (authedUser) => (
  authedUser
)

const mapDispatchToProps = (dispatch) => (
  { dispatch: dispatch }
)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu)))
