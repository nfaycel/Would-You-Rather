import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import  QuestionList from './QuestionList'


class Home extends Component {
  componentDidMount() {
   // if (this.props.authedUser !== null) this.props.dispatch(getInitialData());
  }

  constructor(props) {
    super(props);

    this.state = {
      filter: "unanswered",
    };
  }

  toggleFilter(e) {
    console.log("event", e);
    this.setState({
      filter: e,
    });
  }

  render() {
    
    if (this.props.authedUser === null) 
      return <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />;
    return (
      <Container className="justify-content-center fluid">
        <Col
          className="text-center col-md-12 col-lg-8 justify-content-center"
          style={{ margin: "auto" }}
        >
          <Nav
            justify
            variant="tabs"
            defaultActiveKey="unanswered"
            onSelect={(e) => this.toggleFilter(e)}
          >
            <Nav.Item>
              <Nav.Link eventKey="unanswered" style={{ color: "#9615a5ed" }}>
                Unanswered Questions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="answered" style={{ color: "#9615a5ed" }}>
                answered Questions
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Row style={{ backgroundColor: "white", margin: "0px 1px 0px 1px" }}>
            <QuestionList
              filter={this.state.filter}
            />
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: state.authedUser
});

export default connect(mapStateToProps)(Home);
