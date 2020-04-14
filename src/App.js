import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Container , Jumbotron  } from "react-bootstrap";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Board from "./components/Board";
import Question from "./components/Question";
import AddQuestion from "./components/AddQuestion";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Menu />
          <Switch>
            <Jumbotron>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/questions/:id">
                <Question />
              </Route>
              <Route path="/leaderboard">
                <Board />
              </Route>
              <Route path="/add">
                <AddQuestion />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Jumbotron>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
