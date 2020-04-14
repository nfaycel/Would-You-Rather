import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Form, Row, Col, img } from "react-bootstrap";
import image from "../shared/img/login.png";

class Login extends Component {
    componentDidMount(){
        this.props.dispatch({type:"LOGIN", id:"xxxxx"})
        this.props.dispatch({type:"LOGIN", id:"Nouar faical"})
        //this.props.dispatch({type:"LOGOUT"})
    }
  render() {
    console.log("zzzzzz", this.props);
    
    return (
      <Card className="text-center" style={{ width: "80%", margin: "auto" }}>
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
          <Form>
            <Form>
              <Form.Group as={Row} controlId="formGridState">
                <Form.Label column sm={4}>
                  Select your username :
                </Form.Label>
                <Col sm={4}>
                  <Form.Control as="select" value="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
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
    state
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);
