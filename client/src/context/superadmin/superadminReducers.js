import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  INSTITUTE_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        // ...action.payload,
        isAuth: true,
        loading: false,
        isAdmin: action.payload.user.admin,
        user: action.payload.superadmin,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuth: true,
        isAdmin: action.payload.superadmin.admin,
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
        isAuth: true,
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

    // case REGISTER_FAIL:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    case INSTITUTE_SUCCESS:
      return {
        ...state,
        // ...action.payload,
        isInst: true,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
