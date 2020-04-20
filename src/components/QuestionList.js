import React, { Component } from "react";
import { ListGroup,Button,Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom'

class Question extends Component {
    render() {
      const question = this.props;
      function formatDate (timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
      }

      
      return (
        
        <Link to={`/questions/${question.question.id}`}
       
          className="card flex-row flex-wrap text-left shadow-sm p-3 mb-2 bg-white rounded"
          
          style={{ width: "100%" }}>
          <div className="card-header border-0">
            <Avatar color={"#C28EFC"} src={question.question.avatarURL} size="80" round={true} />
          </div>
          <div className="card-block px-2">
          <Badge variant="light">{question.question.author} asks:</Badge>
            <h5 className="card-text">Would you rather</h5>
            <p className="card-text">{question.question.optionOne.text}</p>
          </div>
          <span className='badge badge-light'>{formatDate(question.question.timestamp)}</span>
  
          <div className="card-footer w-100 text-muted">
            <Button variant="secondary" size="sm">
              View Poll
            </Button>
          </div>
          </Link>
      );
    }
  }
  
  class QuestionList extends Component {
    render() {
      const users = this.props.users
      const questionsList = []

      this.props.questions.map((question =>(
        questionsList.push({...question, avatarURL: users[question.author].avatarURL})
      )))
      
      return (
        <ListGroup style={{ width: "100%" }}>
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

  const mapStateToProps = ({authedUser,questions,users}) => ({
    authedUser,
    questions: Object.values(questions).sort(function(a, b){return b.timestamp - a.timestamp}),
    users
  });
  
  export default withRouter(connect(mapStateToProps)(QuestionList));