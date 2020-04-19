import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"

const NotFound = () => (
  <div>
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <h2>Oops!This page could Not Be Found</h2>
        <Link to="/">Go To HomePage</Link>
      </div>
    </div>
  </div>
);

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(NotFound);
