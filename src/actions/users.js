export const LOAD_USERS = 'LOAD_USERS'
export const SAVE_QUESTION_ANSWER_USER = 'SAVE_QUESTION_ANSWER_USER'

export function loadUsers(users){
    return{
        type: LOAD_USERS,
        users
    }
}

export function saveQuestionResponseUser({authedUser,qId,answer}){
    return{
        type: SAVE_QUESTION_ANSWER_USER,
        authedUser,
        qId,
        answer,
    }
}