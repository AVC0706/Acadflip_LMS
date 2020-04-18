import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const TopNavigation = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <ListGroup className="list-group-flush mt-5">
        <NavLink exact={true} to="/" activeClassName="activeClass">
          <ListGroupItem>Dashboard</ListGroupItem>
        </NavLink>
        <NavLink to="/profile" activeClassName="activeClass">
          <ListGroupItem>Profile</ListGroupItem>
        </NavLink>
        <NavLink to="/login" activeClassName="activeClass">
          <ListGroupItem>Login</ListGroupItem>
        </NavLink>
      </ListGroup>
    </div>
  );
};

export default TopNavigation;
