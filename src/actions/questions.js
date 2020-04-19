import { saveQuestionAnswer } from "../utils/api";
import { saveQuestion } from "../utils/api";
import { saveQuestionResponseUser } from "../actions/users";
import { AddQuestionUser } from "../actions/users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"; //authedUser, qid, answer
export const ADD_QUESTION = "ADD_QUESTION";

export function loadQuestions(questions) {
  return {
    type: LOAD_QUESTIONS,
    questions,
  };
}

export function saveQuestionResponse({ author, qId, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser: author,
    qId,
    answer,
  };
}

export function handleSaveQuestionResponse(qId, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const author = getState().authedUser;

    return saveQuestionAnswer({ authedUser: author, qid: qId, answer })
      .then(() =>{
       dispatch(saveQuestionResponse({ author, qId, answer }))
       dispatch(saveQuestionResponseUser({ author, qId, answer }))
      })
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOne, optionTwo, authedUser) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((question) =>{
        dispatch(addQuestion(question))
        dispatch(AddQuestionUser({ qId: question.id, author: authedUser }))
      }
      )
      .then(() => hideLoading());
  };
}
