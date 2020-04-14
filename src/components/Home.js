import React, { Component } from "react";
import CoolTabs from "react-cool-tabs";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {getInitialData} from '../actions/shared'

class Question extends Component{
  render(){
    return(
      <div>{this.props.name}</div>
    )
  }
}


class Content1 extends Component {
  render() {
    const questionsList = Object.values(this.props.questions)
    return (
      <div style={this.props.style}>
        <ul>
         {questionsList.filter(question =>
          (question.optionOne.votes.indexOf("sarahedo")>-1)||
          (question.optionTwo.votes.indexOf("sarahedo")>-1)).map(question => <li>{question.author}</li>)}
        </ul>
        <Question name={"Nouar"} />     
      
      </div>

    );
  }
}
class Content2 extends Component {
  render() {
    const questionsList = Object.values(this.props.questions)

    return (
      <div style={this.props.style}>
        <ul>
         {questionsList.filter(question =>
          (question.optionOne.votes.indexOf("sarahedo")<=-1)&&
          (question.optionTwo.votes.indexOf("sarahedo")<=-1)).map(question => <li>{question.author}</li>)}
        </ul>
        <Question name={"Nouar"} />     
      
      </div>
    );
  }
}

class Home extends Component {

  componentDidMount(){
    if(this.props.authedUser!==null)
      this.props.dispatch(getInitialData())
  }

  render() {
    const {questions,authedUser} = this.props

    if (this.props.authedUser === null) return <Redirect to="/Login" />;

    return (
      <Row className="justify-content-center fluid">
        <Col className="col-sm-12 col-lg-8 ">
          <CoolTabs
            tabKey={"1"}
            style={{ width: 550, height: 500, background: "white" }}
            activeTabStyle={{ background: "#B777FF", color: "white" }}
            unActiveTabStyle={{ background: "#DBDBDB", color: "gray" }}
            activeLeftTabBorderBottomStyle={{
              background: "#B777FF",
              height: 4,
            }}
            activeRightTabBorderBottomStyle={{
              background: "#B777FF",
              height: 4,
            }}
            tabsBorderBottomStyle={{ background: "gray", height: 4 }}
            leftContentStyle={{ background: "#B777FF" }}
            rightContentStyle={{ background: "#B777FF" }}
            leftTabTitle={"Answered Questions"}
            rightTabTitle={"Unanswered Questions"}
            leftContent={<Content1 questions={questions} authedUser={authedUser} />}
            rightContent={<Content2 questions={questions} authedUser={authedUser} />}
            contentTransitionStyle={"transform 0.6s ease-in"}
            borderTransitionStyle={"all 0.6s ease-in"}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
  questions: state.questions,
});

export default connect(mapStateToProps)(Home);
