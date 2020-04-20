import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Avatar from "react-avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    selectedUser: "",
    toHome: false,
  };

  handleLogout() {
    this.props.dispatch({ type: "LOGOUT" });
    this.props.history.push("/home");
  }

  render() {
    const authed_user = this.props.authedUser;
    const { location } = this.props.history;
    const link_state = !authed_user ? "disabled" : null;
    return (
      <Navbar collapseOnSelect expand="md" bg="navbar-dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          Would You Rather
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} eventKey="/" to="/" disabled={link_state}>
              <i className="fa fa-home mr-1" aria-hidden="true"></i>Home
            </Nav.Link>
            <Nav.Link as={Link} eventKey="/add" to="/add" disabled={link_state}>
              <i className="fa fa-plus-square mr-1" aria-hidden="true"></i>Ask
              question
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey="/leaderboard"
              to="/leaderboard"
              disabled={link_state}
            >
              <i className="fa fa-clipboard mr-1" aria-hidden="true"></i>Leader
              Board
            </Nav.Link>
          </Nav>
          {authed_user !== null && authed_user !== "" ? (
            <Nav>
              <Navbar.Text className="mr-1" style={{ color: "#F7F8DD" }}>
                Hello: {authed_user}
              </Navbar.Text>
              <Avatar
                src={this.props.userAvatar}
                color={"#C28EFC"}
                name={authed_user}
                size="40"
                round={true}
              />
              <Nav.Link className="ml-3" to="" onClick={this.handleLogout}>
                Logout<i className="fa fa-sign-out ml-1" aria-hidden="true"></i>
              </Nav.Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    userAvatar:
      users[authedUser] !== undefined ? users[authedUser].avatarURL : null,
  };
};

const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
