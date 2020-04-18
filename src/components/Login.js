import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form, Row, Col, img } from "react-bootstrap";
import image from "../shared/img/login.png";
import { Redirect } from "react-router-dom";
import { getInitialData } from "../actions/shared";

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(getInitialData());
    // this.props.dispatch({type:"LOGIN", id:"xxxxx"})
    // this.props.dispatch({type:"LOGIN", id:"Nouar faical"})
    //this.props.dispatch({type:"LOGOUT"})
  }

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

 
  }
   state = {
      value: "",
      toPrev: false,
    };
  handleSelect = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props;

    this.props.dispatch({ type: "LOGIN", id: this.state.value });     
    this.setState({ toPrev: id ? false : true });
  };

  render() {
    const { toPrev } = this.state;
    const { redirectUrl } = this.props.location.state !== undefined? this.props.location.state:""

    console.log("this.props.id",this.toPrev)
    console.log("redirectUrl:",this.props.location.state)
    console.log("this.props.authedUser",this.props.authedUser)
    console.log("this.props.id",this.props.id)

    if (toPrev === true ){
      return <Redirect to={redirectUrl} />;
    }

    return (
      <Card
        className="text-center col-md-12 col-lg-8 justify-content-center"
        style={{ margin: "auto" }}
      >
        <Card.Header>
          <h4>Welcome to the Would You Rather App!</h4>
        </Card.Header>
        <Card.Body>
          <img
            className="card-img"
            src={image}
            style={{ width: "25%", height: "25%" }}
            alt="login icon"
          ></img>
          <Card.Title>Please sign in to continue</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formGridState">
              <Form.Label column sm={4}>
                Select your username :
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  as="select"
                  value={this.state.value}
                  onChange={this.handleSelect}
                >
                  <option value="">Choose...</option>
                  <option value="johndoe">johndoe</option>
                  <option value="tylermcginnis">tylermcginnis</option>
                  <option value="sarahedo">sarahedo</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              block
              size="sm"
              disabled={this.state.value === ""}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapDispatchToProps)(Login);
