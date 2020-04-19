export const LOAD_USERS = "LOAD_USERS";
export const SAVE_QUESTION_ANSWER_USER = "SAVE_QUESTION_ANSWER_USER";
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export default function users(state = {}, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_QUESTION_ANSWER_USER:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
            answers:{
                ...state[action.author].answers,
                    [action.qId]:action.answer
            }
        },
      };
      case ADD_QUESTION_USER:
        console.log("question is here",action)
        return {
          ...state,
          [action.author]: {
            ...state[action.author],
              questions: state[action.author].questions.concat(action.qId)
          },
        };
    default:
      return state;
  }
}
