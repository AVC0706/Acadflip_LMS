import React, { Component } from "react";
import PrincipalRoutes from "../src/components/Principal/PrincipalRoutes";
import "./index.css";
import SuperAdminRoutes from "./components/SuperAdmin/SuperAdminRoutes";
import SuperAdminState from "./context/superadmin/SuperAdminStates";
import PrincipalState from "./context/principal/PrincipalState";

class App extends Component {
  render() {
    return (
      <SuperAdminState>
        <PrincipalState>
          <div className='flexible-content'>
            {/* <SideNavigation /> */}
            <main id='content' className='p-5'>
              <PrincipalRoutes />
              <SuperAdminRoutes />
            </main>
          </div>
        </PrincipalState>
      </SuperAdminState>
    );
  }
}

export default App;
