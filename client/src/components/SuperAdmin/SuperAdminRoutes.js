import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SideNavigation from "./sideNavigation";
import AddInstitute from "./AddInstitute";

class SuperAdminRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/superAdminlogin" component={LoginPage} />
          <Route path="/superAdminRegister" component={RegisterPage} />
          <Route path="/superAdminDashboard" component={DashboardPage} />
          <Route path="/superAdminAdd" component={AddInstitute} />
        </Switch>
      </div>
    );
  }
}

export default SuperAdminRoutes;
