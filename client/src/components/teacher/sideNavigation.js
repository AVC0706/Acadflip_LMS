import React, {useEffect, useContext} from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import TeacherContext from '../../context/teacher/teacherContex';
import { NavLink } from "react-router-dom";

const SideNav = () => {
    const teacherContext = useContext(TeacherContext)
    const {isAuth, logout,loadUser,loading} = teacherContext;

    useEffect(()=> {
        if(localStorage.getItem("token")) {
            loadUser();
        }
    }, [loading]);

    const logoutT = ()=> {
        logout();
    }

    if(isAuth) {
        return (
            <div className='sidebar-fixed position-fixed'>
            <ListGroup className='list-group-flush mt-5'>
              <NavLink
                exact={true}
                to='/teacherDashboard'
                activeClassName='activeClass'
              >
                <ListGroupItem>Dashboard</ListGroupItem>
              </NavLink>
              <NavLink to='/principalprofile' activeClassName='activeClass'>
                <ListGroupItem>Profile</ListGroupItem>
              </NavLink>
              <NavLink
                to='/teacherlogin'
                activeClassName='activeClass'
                onClick={logoutT}
              >
                <ListGroupItem>Logout</ListGroupItem>
              </NavLink>
            </ListGroup>
          </div>
        );     
        
    } else {
        return (
          <div className='sidebar-fixed position-fixed'>
            <ListGroup className='list-group-flush mt-5'>
              <NavLink to='/teacherlogin' activeClassName='activeClass'>
                <ListGroupItem>Login</ListGroupItem>
              </NavLink>
            </ListGroup>
          </div>
        );
      }
}

export default SideNav;
