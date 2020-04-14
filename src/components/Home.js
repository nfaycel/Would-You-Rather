import React, { Component } from "react";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getInitialData } from "../actions/shared";
import { Card, Nav } from "react-bootstrap";

class Question extends Component {
  render() {
    const question = this.props;
    return (
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    );
  }
}

class QuestionList extends Component {
  render() {
    const questionsList = Object.values(this.props.questions);
    return (
      <ListGroup>
        {console.log("filter = :",this.props.filter)}
        {this.props.filter === "answered"
          ? questionsList
              .filter(
                (question) =>
                  question.optionOne.votes.indexOf("sarahedo") > -1 ||
                  question.optionTwo.votes.indexOf("sarahedo") > -1
              )
              .map((question) => (
                <ListGroup.Item key={question.id}>
                  <Question question={question} />
                </ListGroup.Item>
              ))
          : questionsList
              .filter(
                (question) =>
                  question.optionOne.votes.indexOf("sarahedo") <= -1 &&
                  question.optionTwo.votes.indexOf("sarahedo") <= -1
              )
              .map((question) => (
                <ListGroup.Item key={question.id}>
                  <Question question={question} />
                </ListGroup.Item>
              ))}
      </ListGroup>
    );
  }
}


class Home extends Component {
  componentDidMount() {
    if (this.props.authedUser !== null) this.props.dispatch(getInitialData());
  }

  constructor(props) {
    super(props);

    this.state = {
      filter: "answered",
    };
  }

  toggleFilter(e) {
    console.log("event", e);
    this.setState({
      filter: e,
    });
  }

  render() {
    const { questions, authedUser } = this.props;

    if (this.props.authedUser === null) return <Redirect to="/Login" />;

    return (
      <Container className="justify-content-center fluid">
        <Col
          className="text-center col-md-12 col-lg-8 justify-content-center"
          style={{ margin: "auto" }}
        >
          <Nav
            justify
            variant="tabs"
            defaultActiveKey="answered"
            onSelect={(e) => this.toggleFilter(e)}
          >
            <Nav.Item>
              <Nav.Link eventKey="answered" style={{ color: "#9615a5ed" }}>
                Answered Questions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="unanswered" style={{ color: "#9615a5ed" }}>
                Unanswered Questions
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Row style={{ backgroundColor: "white", margin: "0px 1px 0px 1px" }}>
            <QuestionList questions={questions} filter={this.state.filter} />
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
  questions: state.questions,
});

export default connect(mapStateToProps)(Home);
