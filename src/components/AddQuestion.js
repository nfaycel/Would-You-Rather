import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button, Container, Form } from "react-bootstrap";

class AddQuestion extends Component {
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.state = {
          optionOne: "",
          optionTwo: ""
        };
      }

    handleOnChange = (e) => {
        console.log("optionOne=",this.state.optionOne)
        console.log("optionTwo=",this.state.optionTwo)
      e.target.name === "optionOne"
      ? (this.setState({optionOne: e.target.value}))
      : (this.setState({optionTwo: e.target.value}))
    }

    

    handleSubmit = (e) => {
        e.preventDefault();
        alert(this.props.authedUser+", "+this.state.optionOne+",  "+this.state.optionTwo)
        // this.props.dispatch({type:"LOGIN", id:this.state.value})
        // this.props.history.push('/')
      };


  render() {
    if (this.props.authedUser === null) return <Redirect to="/Login" />;
    return (
      <Container className="col-8">
        <Card className="text-center">
          <Form onSubmit={this.handleSubmit}>
            <Card.Header as={'h5'}>Create New Question</Card.Header>
            <Card.Body className="text-left">
              <Card.Text>Complete the question:</Card.Text>
              <Card.Title>Would you rather ...</Card.Title>
              <Form.Control name="optionOne" size="sm" onChange={this.handleOnChange} value={this.state.optionOne}/>
              <p className="text-center mt-3">OR</p>
              <Form.Control name="optionTwo" size="sm" onChange={this.handleOnChange} value={this.state.optionTwo}/>
            </Card.Body>
            <Card.Footer className="">
              <Button variant="primary" type="submit" block size="sm"
                       disabled={((this.state.optionOne!=="")&&(this.state.optionTwo!==""))? false:true}>
                Login
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (authedUser) => authedUser;

export default connect(mapStateToProps)(AddQuestion);
