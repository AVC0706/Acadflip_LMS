import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import SuperAdminContext from "../../context/superadmin/superadminContext";

const TopNavigation = () => {
  const authContext = useContext(SuperAdminContext);
  const { isAuth, logout, user, loadUser } = SuperAdminContext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
    //console.log(isAdmin);
    // eslint-disable-next-line
    // clearErrors();
  }, [user, isAuth]);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  if (isAuth) {
    return (
      <Fragment>
        <div className='sidebar-fixed position-fixed'>
          <ListGroup className='list-group-flush mt-5'>
            <NavLink to='/superAdminlogin' activeClassName='activeClass'>
              <ListGroupItem>Login</ListGroupItem>
            </NavLink>
            <NavLink to='/superAdminRegister' activeClassName='activeClass'>
              <ListGroupItem>Add Institute</ListGroupItem>
            </NavLink>
            <NavLink
              to='/superAdminlogin'
              activeClassName='activeClass'
              onClick={onLogout}
            >
              <ListGroupItem>Logout</ListGroupItem>
            </NavLink>
          </ListGroup>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className='sidebar-fixed position-fixed'>
          <ListGroup className='list-group-flush mt-5'>
            <NavLink to='/superAdminlogin' activeClassName='activeClass'>
              <ListGroupItem>Login</ListGroupItem>
            </NavLink>
          </ListGroup>
        </div>
      </Fragment>
    );
  }
};

export default TopNavigation;
