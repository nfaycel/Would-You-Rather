import { loadUsers } from "../actions/users";
import { loadQuestions } from "../actions/questions";
import { loadInitialData } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading-bar'


export function getInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return loadInitialData().then(({ questions, users }) => {
      dispatch(loadQuestions(questions));
      dispatch(loadUsers(users));
      dispatch(hideLoading())
    })
  };
}
