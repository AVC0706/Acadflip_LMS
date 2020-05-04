import React, { useEffect, useContext, useState } from "react";
import SideNavigation from "../sideNavigation";
import PrincipalContext from "../../../context/principal/principalContext";
import { Spinner, Button, Table } from "react-bootstrap";

import axios from "axios";

const ViewStudent = () => {
  const principalContext = useContext(PrincipalContext);

  useEffect(() => {
    principalContext.getAllStudent();
    console.log(principalContext.allStudents);
  }, []);

  const [loading, setLoading] = useState(false);

  const deleteStudent = (e, student) => {
    e.preventDefault();
    setLoading(true);
    const id = student._id;
    console.log(student);

    axios
      .delete(`/api/principalStudent/deleteStudent/${id}`)
      .then(() => {
        alert("Student Deleted");
        principalContext.getAllStudent();

        setLoading(false);
      })

      .catch((err) => {
        alert(err.response.data.msg);

        setLoading(false);
      });
  };
  if (loading) {
    return (
      <React.Fragment>
        <div>
          {" "}
          <Spinner color='primary' />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <SideNavigation></SideNavigation>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Roll NO.</th>
              <th>Name</th>
              <th>View/Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {principalContext.allStudents !== null ? (
              principalContext.allStudents.map((student) => (
                <tr key={student.id}>
                  <td> {student.rollNo} </td>
                  <td> {student.name} </td>
                  <td>
                    {" "}
                    <Button color='info'> View/Update</Button>{" "}
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant='danger'
                      onClick={(e) => deleteStudent(e, student)}
                    >
                      {" "}
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default ViewStudent;
