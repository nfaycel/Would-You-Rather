import React, { Component } from "react";
import { Col, Container, Row, ListGroup,Button,Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getInitialData } from "../actions/shared";
import { Nav } from "react-bootstrap";
import login from "../shared/img/login.png";
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom'

class Question extends Component {
  render() {
    const question = this.props;
    return (
      <div
        className="card flex-row flex-wrap text-left shadow-sm p-3 mb-2 bg-white rounded"
        //shadow-sm p-3 mb-2 bg-white rounded
        style={{ width: "100%" }}>
        <div className="card-header border-0">
          <Avatar color={"#C28EFC"} src={login} size="80" round={true} />
        </div>
        <div className="card-block px-2">
        <Badge variant="light">{question.question.author} asks:</Badge>
          <h5 className="card-text">Would you rather</h5>
          <p className="card-text">{question.question.optionOne.text}</p>
        </div>

        <div className="card-footer w-100 text-muted">
          <Button as={Link} to={`/questions/${question.question.id}`} variant="secondary" size="sm">
            View Poll
          </Button>
          {/* <Link className='btn' to={`/questions/${question.question.id}`}>View Poll</Link> */}
        </div>
      </div>
    );
  }
}

class QuestionList extends Component {
  render() {
    const questionsList = Object.values(this.props.questions);
    return (
      <ListGroup style={{ width: "100%" }}>
        {console.log("filter = :", this.props.filter)}
        {this.props.filter === "unanswered"
          ? questionsList
              .filter(
                (question) =>
                  question.optionOne.votes.indexOf(this.props.authedUser) <=-1 &&
                  question.optionTwo.votes.indexOf(this.props.authedUser) <= -1
                 
              )
              .map((question) => (
                <ListGroup.Item key={question.id}>
                  <Question question={question} />
                </ListGroup.Item>
              ))
          : questionsList
              .filter(
                (question) =>
                  question.optionOne.votes.indexOf(this.props.authedUser) > -1 ||
                  question.optionTwo.votes.indexOf(this.props.authedUser) > -1
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
              questions={questions}
              filter={this.state.filter}
              authedUser={authedUser}
            />
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
