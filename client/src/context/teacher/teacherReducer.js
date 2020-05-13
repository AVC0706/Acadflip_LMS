import { USER_LOADED,
    AUTH_ERROR,
   LOGIN_SUCCESS,
    LOGIN_FAIL,
   LOGOUT,
    CLEAR_ERRORS,
    GETALLASSIGNSUBJECT_SUCCESS,
    ADDUNIT_SUCCESS,
    GETALLUNIT_SUCCESS,
    ADDTOPIC_SUCCESS,
    GETALLTOPIC_SUCCESS,BRANCH_FAIL} from "../types";

    export default (state,action) => {
        switch(action.type) {
            case USER_LOADED: 
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                loading: false,
                user: action.payload.user
            };
            case LOGIN_SUCCESS: 
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading: false,
                isAuth: true,
            }
            case LOGIN_FAIL:
            case AUTH_ERROR:
                return {
                ...state,
                ...action.payload,
                token: null,
                loading: false,
                user: null,
                isAuth: false,
                error: action.payload,
            };
            case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: action.payload,
            };
            case GETALLASSIGNSUBJECT_SUCCESS: 
            console.log(action.payload)
            return {
                ...state,
                allassignsub: action.payload,
                error: null
            };
            
            case ADDUNIT_SUCCESS: 
            return {
                ...state,
                ...action.payload,
                error: null
            };
            case GETALLUNIT_SUCCESS: 
            console.log(action.payload)
            return {
                ...state,
                allunits: action.payload,
                error: null
            };
            
            case ADDTOPIC_SUCCESS: 
            return {
                ...state,
                ...action.payload,
                error: null
            };

            case GETALLTOPIC_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                alltopic: action.payload,
                error: null
            };
            case BRANCH_FAIL:
                return {
                  ...state,
          
                  loading: false,
                  error: action.payload,
                  branches: null,
                };
                case CLEAR_ERRORS:
                    return {
                      error: null,
                    };
                  default:
                    return state;
        }
    }