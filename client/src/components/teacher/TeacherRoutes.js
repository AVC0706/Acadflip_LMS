import React from 'react'
import {Route, Switch} from "react-router-dom"
import Tlogin from './LoginPage'
import TeacherDashboard from './TeacherDashboard'
import TeacherContext from '../../context/teacher/teacherContex';
import AssignedSub from './AssignSub';
import AddUnit from './AddUnit';

class TeacherRoutes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/teacherlogin' component={Tlogin} />
                    <Route path='/teacherDashboard' component={TeacherDashboard}/>
                    <Route path='/assignedSubject' component={AssignedSub}/>
                    <Route path='/addUnit' component={AddUnit}/>
                </Switch>
            </div>
        );
    }
}

export default TeacherRoutes;