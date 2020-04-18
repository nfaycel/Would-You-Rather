import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Container, Jumbotron } from "react-bootstrap";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Board from "./components/Board";
import Poll from "./components/Poll";
import AddQuestion from "./components/AddQuestion";
import NotFound from "./components/NotFound";

import Login from "./components/Login";
import { Component } from "react";
import LoadingBar from "react-redux-loading-bar";

// import {getInitialData} from './actions/shared'

class App extends Component {
  componentDidMount() {
    // this.props.dispatch(getInitialData())
  }

  render() {
    console.log(this.props);
    return (
      <>
      
      <Router>
        <LoadingBar />
        <div className="App">

          <Container className='mt-3'>
            <Menu />
            <Jumbotron>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/questions/:id" component={Poll} />
                <Route path="/notfound" component={NotFound} />
                <Route path="/leaderboard" component={Board} />
                <Route path="/add" component={AddQuestion} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Home} />
              </Switch>
            </Jumbotron>
          </Container>
        </div>
      </Router>
      </>
    );
  }
}

export default (App);
