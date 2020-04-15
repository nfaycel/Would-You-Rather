import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form,Col,Row, Button } from 'react-bootstrap'
import login from "../shared/img/login.png";
import Avatar from 'react-avatar';

class Question extends Component {
    constructor(props) {
        super(props);
    
   
        this.state = {
          select: "",
        };
      }

      handleSelect = (e) => {
        this.setState({select: e.target.value} );
      };
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('You have selected:', this.state.select);
        
    
    //    this.props.dispatch({type:"LOGIN", id:this.state.value})
    //    this.props.history.push('/')
    }

    render() {
        console.log("the id =",this.props.id)
        const poll = this.props.questions[this.props.id]
        console.log(poll)
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            
            <div>
                {!(poll.optionOne.votes.includes(this.props.authedUser))&&
                    !(poll.optionTwo.votes.includes(this.props.authedUser))
                ? ( <div className="container col-sm-10 col-md-8">
                <div className="card">
                    <div className='card-header'>{this.props.authedUser} asks: </div>
                  <div className="row mr-5">
                    <div className="col-md-3 d-flex justify-content-md-center align-items-center ">
                        <Avatar color={"#C28EFC"} src={login} size="90" round={true}/>
                      </div>
                      <div className="col-md-9 px-3" style={{borderLeft: "solid",borderColor:"#FEFBDF", margin: "3px 0 3px 0"}}>
                        <div className="card-block px-3">
                          <h4 className="card-title">Would You Rather...</h4>
                          <Form onSubmit={this.handleSubmit}>
                              <fieldset>
                                <Form.Group as={Row}>
                                <Col sm={10} md={8} className="ml-2">
                                    <Form.Check
                                    type="radio"
                                    label={poll.optionOne.text}
                                    name="formHorizontalRadios"
                                    value="option1"
                                    checked={this.state.select === "option1"}
                                    onChange={(e)=>this.handleSelect(e)}
                                    className="mb-3"
                                    />
                                    <Form.Check
                                    type="radio"
                                    label={poll.optionTwo.text}
                                    name="formHorizontalRadios"
                                    checked={this.state.select === "option2"}
                                    onChange={(e)=>this.handleSelect(e)}
                                    value="option2"
                                    />
                                </Col>
                                </Form.Group>
                            </fieldset> 
                            <Button disabled={this.state.select===""} variant="primary" type="submit" block size="sm" className="mb-3">Submit</Button>
                            </Form>
                        </div>
                      </div>
            
                    </div>
                  </div>
                </div>
              )
                : <ul>
                    <li>poll author: {poll.author}</li>
                    <li>poll id: {poll.id}</li>
                    <li>poll optionOne: {poll.optionOne.text}</li>
                    <li>poll optionTwo: {poll.optionTwo.text}</li>
                    <li>poll timestamp: {poll.timestamp}</li>
                </ul>
                }
                
            </div>
        )
    }
}

const mapStateToProps = ({authedUser,questions}, props) => {
const {id} = props.match.params
 return{
     authedUser,
     questions,
     id
 }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
  });

export default connect(mapStateToProps,mapDispatchToProps)(Question)