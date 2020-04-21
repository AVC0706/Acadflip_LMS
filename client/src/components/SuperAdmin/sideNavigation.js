import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import SuperAdminContext from "../../context/superadmin/superadminContext";

const TopNavigation = () => {
  const superadminContext = useContext(SuperAdminContext);
  const { isAuth, logout, user, loadUser, loading } = superadminContext;

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   // loadUser();
    // }
    // //console.log(isAdmin);
    // // eslint-disable-next-line
    // // clearErrors();
    if (isAuth) console.log("sidenav is auth");
  }, [loading]);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  if (isAuth) {
    return (
      <Fragment>
        <div className="sidebar-fixed position-fixed">
          <ListGroup className="list-group-flush mt-5">
            <NavLink to="/superAdminAdd" activeClassName="activeClass">
              <ListGroupItem>Add Institute</ListGroupItem>
            </NavLink>
            <NavLink
              to="/superAdminlogin"
              activeClassName="activeClass"
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
        <div className="sidebar-fixed position-fixed">
          <ListGroup className="list-group-flush mt-5">
            <NavLink to="/superAdminlogin" activeClassName="activeClass">
              <ListGroupItem>Login</ListGroupItem>
            </NavLink>
            <NavLink to="/superAdminRegister" activeClassName="activeClass">
              <ListGroupItem>Register</ListGroupItem>
            </NavLink>
          </ListGroup>
        </div>
      </Fragment>
    );
  }
};

export default TopNavigation;
