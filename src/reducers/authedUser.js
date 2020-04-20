export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.id;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
