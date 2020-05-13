import React from 'react'
import {Route, Switch} from "react-router-dom"
import Tlogin from './LoginPage'
import TeacherDashboard from './TeacherDashboard'
import TeacherContext from '../../context/teacher/teacherContex';

class TeacherRoutes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/teacherlogin' component={Tlogin} />
                    <Route path='/teacherDashboard' component={TeacherDashboard}/>
                </Switch>
            </div>
        );
    }
}

export default TeacherRoutes;