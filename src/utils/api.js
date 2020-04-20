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

export function saveQuestion(data){
    return _saveQuestion(data)
}

export function saveQuestionAnswer(data){
    console.log("the data of action is",data)
    return _saveQuestionAnswer(data)
}