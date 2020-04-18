import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA'

export function loadInitialData(){
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([questions, users]) => ({
        questions,
        users
    }))
}

export function saveQuestion(data){ // data = question object
    return _saveQuestion(data)
}

export function saveQuestionAnswer(data,questions){
    console.log("the data of action is",data) // data = { authedUser, qid, answer }
    console.log("the questions are : ",questions)
    return _saveQuestionAnswer(data,questions)
}