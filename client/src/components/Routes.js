import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import FileUpload from "./Principal/FileUpload";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={DashboardPage} />
        <Route path='/studentCsvUpload' component={FileUpload} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    );
  }
}

export default Routes;
