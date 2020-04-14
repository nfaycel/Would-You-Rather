export const LOAD_USERS  = 'LOAD_USERS'

export default function users(state={},action){
    switch(action.type){
        case LOAD_USERS:
            return {
                ...state,
                ...action.users
            }

        default:
            return state
    }
}
