import React, { useReducer } from "react";
import axios from "axios";
import SuperAdminContext from "./superadminContext";
import SuperAdminReducer from "./superadminReducers";

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
  GET_ALLINSTITUTE,
  UPDATE_INSTITUTE_SUCCESS,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";
// import ContextDevTool from "react-context-devtool";

const SuperAdminState = (props) => {
  const initialState = {
    token: null,
    user: null,
    isAuth: null,
    loading: true,
    error: null,
    isAdmin: false,
    msg: "",
    isInst: null,
    allInstitutes: null,
    inst: null,
  };

  const [state, dispatch] = useReducer(SuperAdminReducer, initialState);

  // Load User
  const loadUser = async () => {
    //load token to global
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/auth/superAdmin");
      // console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      console.log("user loaded...");
    } catch (e) {
      console.log(e);
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  // const loadUser = () => (dispatch, getState) => {
  //   // User loading
  //   // dispatch({ type: USER_LOADING });

  //   axios
  //     .get("/api/auth/")
  //     .then((res) =>
  //       dispatch({
  //         type: USER_LOADED,
  //         payload: res.data,
  //       })
  //     )
  //     .catch((err) => {
  //       // dispatch(returnErrors(err.response.data, err.response.status));
  //       dispatch({
  //         type: AUTH_ERROR,
  //       });
  //       console.log("error");
  //     });
  // };

  //Register
  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/admin/adminR", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log("register success");
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg,
      });
      console.log("register fail");
    }
  };

  //Login
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
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

  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Add institute
  const add = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/institute/addInstitute",
        formData,
        config
      );

      dispatch({
        type: INSTITUTE_SUCCESS,
        payload: res.data,
      });
      console.log("institute successfully added");
    } catch (e) {
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: e.response.data.msg,
      // });
      console.log("Institute adding fail");
    }
  };

  //Display Institute
  const getAllInstitutes = async () => {
    try {
      const res = await axios.get("/api/Institute/getAllInstitutes");
      dispatch({
        type: GET_ALLINSTITUTE,
        payload: res.data,
      });
    } catch (e) {
      console.log("Institute display fail");
    }
  };

  //Update institute
  const update = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "/api/institute/updateInstitute",
        formData,
        config
      );

      dispatch({
        type: UPDATE_INSTITUTE_SUCCESS,
        payload: res.data,
      });
      console.log("institute successfully added");
    } catch (e) {
      // dispatch({
      //   type: REGISTER_FAIL,
      //   payload: e.response.data.msg,
      // });
      console.log("Institute adding fail");
    }
  };

  //Clear Error
  const clearError = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <SuperAdminContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        error: state.error,
        isInst: state.isInst,
        allInstitutes: state.allInstitutes,
        inst: state.inst,
        register,
        login,
        loadUser,
        logout,
        clearError,
        add,
        getAllInstitutes,
        update,
      }}
    >
      {/* <ContextDevTool
        context={SuperAdminContext}
        id="uniqContextId"
        displayName="Context Display Name"
      /> */}
      {props.children}
    </SuperAdminContext.Provider>
  );
};

export default SuperAdminState;
