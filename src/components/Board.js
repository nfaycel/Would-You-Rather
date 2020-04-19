import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import login from "../shared/img/login.png";
import Avatar from "react-avatar";



class Board extends Component {
  render() {
    if (this.props.authedUser === null) return <Redirect to="/Login" />;

    return (
      <div>
        {this.props.users.map((user, index) => 
        {
          const  trophy =
            index === 0?
            {
              position: "absolute",
              top: -27,
              right: -10,
              color: "yellow",
              backgroundColor: "lightgray",
              borderStyle: "double",
              borderRadius: "10px",
            }
            : index === 1?
            {
              position: "absolute",
              top: -27,
              right: -10,
              color: "#D3D3D3",
              backgroundColor: "white",
              borderStyle: "double",
              borderRadius: "10px",
            }
            : index === 2?
            {
              position: "absolute",
              top: -27,
              right: -10,
              color: "#cd7f32",
              backgroundColor: "white",
              borderStyle: "double",
              borderRadius: "10px",
            }:{}
          return <UserBoard user={user} trophy={trophy} key={user.id}/>
        })}
      </div>
    );
  }
}

const UserBoard = (props) => {
  const user = props.user;
  const answers = Object.keys(user.answers).length
  const questions = user.questions.length
  return (
    <div className="container col-sm-10 col-md-8" key={user.id}>
      <div className="card py-3 mb-4">
        <sup>
          <span
          
            style={props.trophy}
          >
            <i className="fa fa-trophy fa-3x"></i>
          </span>
        </sup>
        <div className="row mr-5">
          <div className="col-md-3 d-flex justify-content-md-center align-items-center ">
            <Avatar color={"#C28EFC"} src={login} size="90" round={true} />
          </div>
          <div
            className="col px-3"
            style={{
              borderLeft: "solid",
              borderColor: "#FEFBDF",
              margin: "3px 0 3px 0",
            }}
          >
            <h5>{user.name}</h5>
            <div className="Row d-flex">
              <div className="col-10">Answerd questions:</div>
              <div className="col-2">{answers}</div>
            </div>
            <div className="Row d-flex">
              <div className="col-10">Created questions:</div>
              <div className="col-2">{questions}</div>
            </div>
          </div>
          <div
            className="col-md-3 px-3"
            style={{
              borderLeft: "solid",
              borderColor: "#FEFBDF",
              margin: "3px 0 3px 0",
            }}
          >
            Score:{questions+answers}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const sortedUsers = [];
  Object.entries(users).forEach(([key, value]) => {
    sortedUsers.push(value);
  });
  sortedUsers.sort((a,b)=>(b.questions.length+Object.keys(b.answers).length)-(a.questions.length+Object.keys(a.answers).length))
  
  return {
    authedUser,
    users: sortedUsers,
  };
};

export default connect(mapStateToProps)(Board);
