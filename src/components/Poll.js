import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Form, Button, ProgressBar } from "react-bootstrap";
import login from "../shared/img/login.png";
import Avatar from "react-avatar";
import { handleSaveQuestionResponse } from "../actions/questions";

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      select: "",
    };
  }

  handleSelect = (e) => {
    this.setState({ select: e.target.value });
  };

  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/poll/${id}`);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(
      handleSaveQuestionResponse(this.props.id, this.state.select)
    );
  };

  render() {
    const polls = [];
    Object.entries(this.props.questions).forEach(([key, value]) => {
      polls.push(value);
    });

    const poll = polls.filter((p) => p.id === this.props.id)[0];

    if (this.props.authedUser === null)
      return (
        <Redirect
          to={{
            pathname: "/Login",
            state: { redirectUrl: this.props.location.pathname },
          }}
        />
      );

    if (poll === undefined) {
      return <Redirect to="/notfound" />;
    }

    const numberVotes =
      poll.optionOne.votes.length + poll.optionTwo.votes.length;

    return (
      <div>
        {!poll.optionOne.votes.includes(this.props.authedUser) &&
        !poll.optionTwo.votes.includes(this.props.authedUser) ? (
          <div className="container col-sm-10 col-md-8">
            <div className="card">
              <div className="card-header">{this.props.authedUser} asks: </div>
              <div className="row mr-5">
                <div className="col-md-3 d-flex justify-content-md-center align-items-center ">
                  <Avatar
                    color={"#C28EFC"}
                    src={login}
                    size="90"
                    round={true}
                  />
                </div>
                <div
                  className="col-md-9 px-3"
                  style={{
                    borderLeft: "solid",
                    borderColor: "#FEFBDF",
                    margin: "3px 0 3px 0",
                  }}
                >
                  <div className="card-block px-3">
                    <h4 className="card-title">Would You Rather...</h4>
                    <Form onSubmit={this.handleSubmit}>
                      <fieldset>
                        <div className="mb-3">
                          <Form.Check
                            custom
                            className="mb-3"
                            type={"radio"}
                            id="optionOne"
                            label={poll.optionOne.text}
                            checked={this.state.select === "optionOne"}
                            onChange={(e) => this.handleSelect(e)}
                            value="optionOne"
                          />
                          <Form.Check
                            custom
                            type={"radio"}
                            id="optionTwo"
                            label={poll.optionTwo.text}
                            checked={this.state.select === "optionTwo"}
                            onChange={(e) => this.handleSelect(e)}
                            value="optionTwo"
                          />
                        </div>
                      </fieldset>
                      <Button
                        disabled={this.state.select === ""}
                        variant="primary"
                        type="submit"
                        block
                        size="sm"
                        className="mb-3"
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container col-sm-10 col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Asked by {this.props.authedUser}</h5>{" "}
              </div>
              <div className="row mr-5">
                <div className="col-md-3 d-flex justify-content-md-center align-items-center ">
                  <Avatar
                    color={"#C28EFC"}
                    src={login}
                    size="90"
                    round={true}
                  />
                </div>
                <div
                  className="col-md-9 px-3"
                  style={{
                    borderLeft: "solid",
                    borderColor: "#FEFBDF",
                    margin: "3px 0 3px 0",
                  }}
                >
                  <div className="card-block px-3">
                    <h5 className="card-title">Result</h5>
                    <div className="row justify-content-center">
                      <div className="col-12 text-center mb-2">
                        <div className="card secondary px-2">
                          <div className="card-block mb-2 text-left">
                            Would you rather be a {poll.optionOne.text}?
                            {poll.optionOne.votes.includes(this.props.authedUser)&&(
                              <i className="fa fa-check mx-1" style={{color:"blueviolet"}} />
                            )}
                          </div>
                          <ProgressBar
                            now={
                              (poll.optionOne.votes.length / numberVotes).toFixed(2) * 100
                            }
                            label={`${
                              (poll.optionOne.votes.length / numberVotes).toFixed(2) * 100
                            }%`}
                          />
                          <div className="card-block mb-2">
                            {poll.optionOne.votes.length} of {numberVotes} votes
                          </div>
                        </div>
                      </div>
                      <div className="col-12 text-center mb-2">
                        <div className="card secondary  px-2">
                          <div className="card-block mb-2 text-left">
                            Would you rather be a {poll.optionTwo.text}?
                            {poll.optionTwo.votes.includes(this.props.authedUser)&&(
                              <i className="fa fa-check mx-1" style={{color:"blueviolet"}} />
                            )}
                          </div>
                          <ProgressBar
                            now={
                               (poll.optionTwo.votes.length / numberVotes).toFixed(2) * 100
                            }
                            label={`${
                               (poll.optionTwo.votes.length / numberVotes).toFixed(2) * 100
                            }%`}
                          />
                          <div className="card-block mb-2">
                            {poll.optionTwo.votes.length} of {numberVotes} votes
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <ul>
                      <li>poll author: {poll.author}</li>
                      <li>poll id: {poll.id}</li>
                      <li>poll optionOne: {poll.optionOne.text}</li>(
                      {poll.optionOne.votes.map((user) => "- " + user + ",")})
                      <li>poll optionTwo: {poll.optionTwo.text}</li>(
                      {poll.optionTwo.votes.map((user) => "- " + user + ",")})
                      <li>poll timestamp: {poll.timestamp}</li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions }, props) => {
  const { id } = props.match.params;
  return {
    authedUser,
    questions,
    id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Poll));
