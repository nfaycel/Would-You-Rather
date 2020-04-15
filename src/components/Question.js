import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container,Col,Row, Card } from 'react-bootstrap'
import { CardTitle } from 'react-bootstrap/Card'
import login from "../shared/img/login.png";
import Avatar from 'react-avatar';

class Question extends Component {

    render() {
        console.log("the id =",this.props.id)
        const poll = this.props.questions[this.props.id]
        console.log(poll)
        if(this.props.authedUser=== null) return (<Redirect to="/Login" />)
        return (
            
            <div>
                {!(poll.optionOne.votes.includes(this.props.authedUser))&&
                    !(poll.optionTwo.votes.includes(this.props.authedUser))
                ? ( <div className="container py-3">
                <div className="card">
                    <div className='card-header'>Would you rather </div>
                  <div className="row mr-5">
                    <div className="col-md-2 d-flex justify-content-md-center align-items-center ">
                       
                        <Avatar color={"#C28EFC"} src={login} size="90" round={true}/>

                      </div>
                      <div className="col-md-10 px-3" style={{borderLeft: "solid",borderColor:"#FEFBDF", margin: "3px 0 3px 0"}}>
                        <div className="card-block px-3">
                          <h4 className="card-title">Lorem ipsum dolor sit amet</h4>
                          <p className="card-text">Consectetur s nisi ut aliquip ex ea commodo consequat. </p>
                          <p className="card-text">Duis aute irure ficia deserunt mollit anim id est laborum.</p>
                          <a href="#" className="btn btn-primary">Read More</a>
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