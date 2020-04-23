import React, { useEffect, useContext } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PrincipalContext from "../../context/principal/principalContext";

const TopNavigation = () => {
  const principalContext = useContext(PrincipalContext);
  const { isAuth, logout, loadUser, loading } = principalContext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
    //console.log(isAdmin);
    // // eslint-disable-next-line
    // // clearErrors();
  }, [loading]);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  if (isAuth) {
    return (
      <div className='sidebar-fixed position-fixed'>
        <ListGroup className='list-group-flush mt-5'>
          <NavLink
            exact={true}
            to='/principaldashboard'
            activeClassName='activeClass'
          >
            <ListGroupItem>Dashboard</ListGroupItem>
          </NavLink>
          <NavLink to='/principalprofile' activeClassName='activeClass'>
            <ListGroupItem>Profile</ListGroupItem>
          </NavLink>
          <NavLink
            to='/principallogin'
            activeClassName='activeClass'
            onClick={onLogout}
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
          <NavLink to='/principallogin' activeClassName='activeClass'>
            <ListGroupItem>Login</ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    );
  }
};

export default TopNavigation;
