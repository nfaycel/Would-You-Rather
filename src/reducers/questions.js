export const LOAD_QUESTIONS  = 'LOAD_QUESTIONS'


export default function questions(state={},action){
    switch(action.type){
        case LOAD_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        default:
            return state
    }
}
