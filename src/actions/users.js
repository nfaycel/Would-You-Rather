export const LOAD_USERS = 'LOAD_USERS'
export const SAVE_QUESTION_ANSWER_USER = 'SAVE_QUESTION_ANSWER_USER'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export function loadUsers(users){
    return{
        type: LOAD_USERS,
        users
    }
}

export function saveQuestionResponseUser({author,qId,answer}){
    return{
        type: SAVE_QUESTION_ANSWER_USER,
        author,
        qId,
        answer,
    }
}

export function AddQuestionUser({author,qId}){
    return{
        type: ADD_QUESTION_USER,
        qId,
        author
    }
}