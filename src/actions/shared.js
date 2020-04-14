import { loadUsers } from "../actions/users";
import { loadQuestions } from "../actions/questions";
import { loadInitialData } from "../utils/api";

export function getInitialData() {
  return (dispatch) => {
    return loadInitialData().then(({ questions, users }) => {
      dispatch(loadQuestions(questions));
      dispatch(loadUsers(users));
    });
  };
}
