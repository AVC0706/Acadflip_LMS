import React, { useReducer } from "react";
import axios from "axios";
import PrincipalContext from "./principalContext";
import PrincipalReducer from "./principalReducer";

import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADDBRANCH_SUCCESS,
  GETALLBRANCH_SUCCESS,
  BRANCH_FAIL,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const PrincipalState = (props) => {
  const initialState = {
    token: null,
    user: null,
    isAuth: null,
    loading: false,
    error: null,
    isPrincipal: false,
    allbranches: [],
    msg: "",
  };

  const [state, dispatch] = useReducer(PrincipalReducer, initialState);

  // Load User
  const loadUser = async () => {
    //load token to global
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/principal/isPrincipal");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  //--------Login----------
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/principal/login", formData, config);
      // console.log("this is admin status:" + res.data.superadmin.admin);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log("login success");
      loadUser();
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response.data.msg,
      });
      console.log("login fail");
    }
  };

  //-----------Logout----------
  const logout = () => dispatch({ type: LOGOUT });

  //---------Add Branch-------------
  const addBranch = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/principalBranch/addBranch",
        formData,
        config
      );

      dispatch({
        type: ADDBRANCH_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: BRANCH_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //-----------Get All branches---------------
  const getAllBranches = async (f) => {
    try {
      const res = await axios.get("/api/principalBranch/getAllBranch");

      dispatch({
        type: GETALLBRANCH_SUCCESS,
        payload: res.data,
      });
      console.log(state.allbranches);
    } catch (e) {
      dispatch({
        type: BRANCH_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //Clear Error
  const clearError = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <PrincipalContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuth: state.isAuth,
        isPrincipal: state.isPrincipal,
        error: state.error,
        allbranches: state.allbranches,
        login,
        loadUser,
        logout,
        clearError,
        addBranch,
        getAllBranches,
      }}
    >
      {/* <ContextDevTool
        context={PrincipalContext}
        id='uniqContextId'
        displayName='Context Display Name'
      /> */}
      {props.children}
    </PrincipalContext.Provider>
  );
};

export default PrincipalState;
