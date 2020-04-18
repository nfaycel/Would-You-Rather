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
      console.log("action from save_action_answer", action);
      console.log("the state=",{...state});
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
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      return {
        ...state,
            [id]:
            {
                author:action.authedUser,
                id:id,
                timestamp: Date.now(),
                optionOne:{
                    votes:[],
                    text:action.optionOne
                },
                optionTwo:{
                    votes:[],
                    text:action.optionTwo
                },
            }
      };

    default:
      return state;
  }
}
