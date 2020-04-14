import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form, Row, Col, img } from "react-bootstrap";
import image from "../shared/img/login.png";



class Login extends Component {
  componentDidMount() {
    // this.props.dispatch({type:"LOGIN", id:"xxxxx"})
    // this.props.dispatch({type:"LOGIN", id:"Nouar faical"})
    //this.props.dispatch({type:"LOGOUT"})
  }

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: "",
    };
  }

  handleSelect = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({type:"LOGIN", id:this.state.value})
    this.props.history.push('/')
  };
  render() {
 
    return (
      <Card className="text-center col-md-12 col-lg-8 justify-content-center"   style={{ margin: "auto" }} >
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
                <Form.Control as="select" value={this.state.value}  onChange={this.handleSelect}>
                  <option>Choose...</option>
                  <option value="Nouar Faical">Nouar Faical</option>
                  <option value="Nouar Billal">Nouar Billal</option>
                  <option value="Nouar Fethi">Nouar Fethi</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
