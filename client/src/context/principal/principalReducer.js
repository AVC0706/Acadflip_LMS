import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADDBRANCH_SUCCESS,
  BRANCH_FAIL,
  GETALLBRANCH_SUCCESS,
  GETALLSEMESTER_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
        isPrincipal: action.payload.isPrincipal,
        user: action.payload.user,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuth: true,
        isPrincipal: action.payload.principal.isPrincipal,
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
        isPrincipal: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        isPrincipal: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case ADDBRANCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case GETALLBRANCH_SUCCESS:
      console.log(action.payload);
      return {
        ...state,

        allbranches: action.payload,
        error: null,
      };

    case GETALLSEMESTER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,

        allsemesters: action.payload.sems,
        error: null,
      };

    case BRANCH_FAIL:
      return {
        ...state,

        loading: false,
        error: action.payload,
        branches: null,
      };

    // case REGISTER_FAIL:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};
