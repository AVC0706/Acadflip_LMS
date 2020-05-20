import React, {useReducer} from 'react'
import axios from "axios";
import teacherContex from "./teacherContex";
import teacherReducer from './teacherReducer'

import { USER_LOADED,
         AUTH_ERROR,
        LOGIN_SUCCESS,
         LOGIN_FAIL,
        LOGOUT,
         CLEAR_ERRORS,
         GETALLASSIGNSUBJECT_SUCCESS,
         ADDUNIT_SUCCESS,
         ADDUNIT_FAIL,
         GETALLUNIT_SUCCESS,
         ADDTOPIC_SUCCESS,
         ADDTOPIC_FAIL,
         GETALLTOPIC_SUCCESS,BRANCH_FAIL} from "../types";
import setAuthToken from '../../utils/setAuthToken';

const TeacherState = (props) => {
    const initialState = {
        token: null,
        user:null,
        isAuth: null,
        loading: false,
        error: null,
        allassignsub:[],
        allunits: [],
        alltopic:[],
        msg: '',
    }
    const [state, dispatch] = useReducer(teacherReducer, initialState);
    const loadUser = async ()=> {
        if(localStorage.getItem("token")) {
            setAuthToken(localStorage.getItem("token"))
        }

        try {
            const res = await axios.get("/api/teacher/isTeacher");
            dispatch({
                type:USER_LOADED,
                payload: res.data
            })
        } catch(e) {
           dispatch({
            type: AUTH_ERROR,
            payload: e.response.data.msg
           })
        }
    }
    
    const login = async (formData) => {
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
        }
        try {
            const res = await axios.post("/api/teacher/login", formData,config)
  
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data                
            })
            console.log(res.data.token)
        } catch(e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.msg
            })
            console.log('failed')
        }
    };
    const logout = () => dispatch({type: LOGOUT});

    const addUnit = async (formData) => {
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const res = await axios.post("/api/teacher/createUnit", formData,config);
            dispatch({
                type: ADDUNIT_SUCCESS,
                payload: res.data
            })
        } catch(e) {
            dispatch({
                type: ADDUNIT_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const getAssignedSub = async () => {
        try {
            const res = await axios.get("/api/teacher/particularAssignedSub")
            dispatch({
                type: GETALLASSIGNSUBJECT_SUCCESS,
                payload: res.data
            })
        } catch(e) {
            dispatch({
                type: BRANCH_FAIL,
                payload: "error message"
            })
        }
    }

    const getUnit = async () => {
        try {
            const res = await axios.get("/api/teacher/getUnit")
            dispatch({
                type: GETALLUNIT_SUCCESS,
                payload: res.data
            })
        } catch(e) {
            dispatch({
                type: BRANCH_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const addTopic = async (formData) => {
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.post("/api/teacher/createTopic", formData,config);
            dispatch({
                type: ADDTOPIC_SUCCESS,
                payload: res.data
            })
        } catch(e) {
            dispatch({
                type: ADDTOPIC_FAIL,
                payload: e.payload.data.msg
            })
        }
    }

    const getTopic = async ()=> {
        try {
            const res = await axios.get("/api/teacher/getTopic")
            dispatch({
                type: GETALLTOPIC_SUCCESS,
                payload: res.data
            })
        } catch(e) {
            dispatch({
                type: BRANCH_FAIL,
                payload: e.response.data.msg
            })
        }
    }

    const clearError = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <teacherContex.Provider 
        value={{
            token: state.token,
            user: state.user,
            loading: state.loading,
            isAuth: state.isAuth,
            error: state.error,
            allassignsub: state.allassignsub,
            alltopic: state.alltopic,
            allunits:state.allunits,
            login,
            loadUser,
            logout,
            addTopic,
            addUnit,
            getAssignedSub,
            getTopic,
            getUnit,
            clearError
        }}
        >
            {props.children}
        </teacherContex.Provider>
    );
}

export default TeacherState;