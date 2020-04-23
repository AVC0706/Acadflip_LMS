import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import PLoginPage from "./LoginPage";
import AddStudents from "./Uploads/AddStudents";
import AddBranch from "./Uploads/AddBranch";
import AddSemester from "./Uploads/AddSemester";
import AddSubject from "./Uploads/AddSubject";

class PrincipalRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/studentCsvUpload' component={AddStudents} />
          <Route path='/principaldashboard' component={DashboardPage} />
          <Route path='/principalprofile' component={ProfilePage} />
          <Route path='/principallogin' component={PLoginPage} />
          <Route path='/principaladdBranch' component={AddBranch} />
          <Route path='/principaladdSemester' component={AddSemester} />
          <Route path='/principaladdSubject' component={AddSubject} />
        </Switch>
      </div>
    );
  }
}

export default PrincipalRoutes;
