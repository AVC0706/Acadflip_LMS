import React, { Component } from "react";
import PrincipalRoutes from "../src/components/Principal/PrincipalRoutes";
import "./index.css";
import SuperAdminRoutes from "./components/SuperAdmin/SuperAdminRoutes";
import SuperAdminState from "./context/superadmin/SuperAdminStates";

class App extends Component {
  render() {
    return (
      <SuperAdminState>
        <div className="flexible-content">
          {/* <SideNavigation /> */}
          <main id="content" className="p-5">
            <PrincipalRoutes />
            <SuperAdminRoutes />
          </main>
        </div>
      </SuperAdminState>
    );
  }
}

export default App;
