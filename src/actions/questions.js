import {saveQuestionAnswer} from '../utils/api'

export const LOAD_QUESTIONS = "LOAD_QUESTIONS"
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER" //authedUser, qid, answer
export function loadQuestions(questions){
    return{
        type: LOAD_QUESTIONS,
        questions
    }
}

export function saveQuestionResponse({authedUser,qId,answer}){
    return{
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qId,
        answer,
    }
}

export function handleSaveQuestionResponse(qId,answer){
    return(dispatch,getState) =>{
        const { authedUser } = getState()
        return saveQuestionAnswer({
            authedUser,
            qid:qId,
            answer,
        })
        .then(dispatch(saveQuestionResponse({authedUser,qId,answer})))
        
    }
}
