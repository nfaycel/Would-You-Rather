export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION"

export default function questions(state = {}, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
          ...action.questions,
      };
    case SAVE_QUESTION_ANSWER:
      return {
          ...state,
          [action.qId]: {
            ...state[action.qId],
            [action.answer]: {
              ...state[action.qId][action.answer],
              votes: state[action.qId][action.answer].votes.concat([
                action.authedUser,
              ]),
            },
          }
      };

      case ADD_QUESTION:
      return {
        ...state,
            [action.question.id]: action.question
      };

    default:
      return state;
  }
}
