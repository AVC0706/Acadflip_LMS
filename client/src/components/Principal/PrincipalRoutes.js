import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import FileUpload from "./FileUpload";

class PrincipalRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/studentCsvUpload' component={FileUpload} />
          <Route path='/principaldashboard' component={DashboardPage} />
          <Route path='/principalprofile' component={ProfilePage} />
          <Route path='/principallogin' component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default PrincipalRoutes;
