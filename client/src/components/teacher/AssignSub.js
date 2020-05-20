import React, {useState,useEffect,useContext} from 'react';

// import {
//     Button,
//     FormGroup,
//     Input,
//     Row,
//     Col,
//     Card,
//     CardBody,
//     CardImg,
//     Spinner,
//   } from "reactstrap";

  import sideNav from "./sideNavigation";
  import TeacherContext from "../../context/teacher/teacherContex";
  import axios from "axios";

  const AssignedSub = (props) => {
      const teacherContext = useContext(TeacherContext);

      const {getAssignedSub,allassignsub} = teacherContext;
      

     useEffect(()=> {
         getAssignedSub();

 
     }, []);

     return (
            <div>
{allassignsub && allassignsub.map((assignedsub)=> (

    <div key={assignedsub._id}>
        {assignedsub.description}
         </div>
))}
 </div>
     );

  }

  export default AssignedSub