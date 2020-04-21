import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        isAdmin: action.payload.user.admin,
        user: action.payload.user,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuth: true,
        isAdmin: action.payload.user.admin,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        ...action.payload,
        token: null,
        loading: false,
        user: null,
        isAuth: false,
        isAdmin: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        isAdmin: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        ...action.payload,
        token: null,
        loading: false,
        user: null,
        isAuth: false,
        error: action.payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
