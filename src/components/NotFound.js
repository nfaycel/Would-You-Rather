import React from 'react'
import { connect } from 'react-redux'


const NotFound = () => (
  <div>
    <h1>Not found </h1>
  </div>
);
function mapStateToProps ({authedUser}) {
  return {
   authedUser,
 }
}
export default connect(mapStateToProps)(NotFound)