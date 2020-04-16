import { saveQuestionAnswer } from "../utils/api";
import { saveQuestion } from "../utils/api"
import { saveQuestionResponseUser } from "../actions/users";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"; //authedUser, qid, answer
export const ADD_QUESTION = "ADD_QUESTION";

export function loadQuestions(questions) {
  return {
    type: LOAD_QUESTIONS,
    questions,
  };
}

export function saveQuestionResponse({ authedUser, qId, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qId,
    answer,
  };
}

export function handleSaveQuestionResponse(qId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser,
      qid: qId,
      answer,
    })
      .then(dispatch(saveQuestionResponse({ authedUser, qId, answer })))
      .then(dispatch(saveQuestionResponseUser({ authedUser, qId, answer })));
  };
}

export function addQuestion({ optionOne, optionTwo, authedUser }) {
  return {
    type: ADD_QUESTION,
    optionOne,
    optionTwo,
    authedUser
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  //{ optionOneText, optionTwoText, author }
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
        optionOneText:optionOne,
        optionTwoText:optionTwo,
        author:authedUser,
    }).then(dispatch(addQuestion({ optionOne, optionTwo, authedUser })))
  };
}

