export const LOAD_USERS = "LOAD_USERS";
export const SAVE_QUESTION_ANSWER_USER = "SAVE_QUESTION_ANSWER_USER";

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
    default:
      return state;
  }
}
