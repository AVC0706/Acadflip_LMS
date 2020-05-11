import React, { useEffect, useContext, useState } from "react";
import SideNavigation from "./sideNavigation";
import { Spinner, Button, Table } from "react-bootstrap";
import SuperAdminContext from "../../context/superadmin/superadminContext";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewInstitute = (props) => {
  const superAdminContext = useContext(SuperAdminContext);
  const { isAuth, allInstitutes } = superAdminContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth === false || isAuth === null) {
      props.history.push("/superAdminlogin");
    }
    superAdminContext.getAllInstitutes();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // if (allInstitutes) setLoading(false);
    console.log(loading);
  }, []);

  const deleteInstitute = (e, institute) => {
    e.preventDefault();
    setLoading(true);
    const id = institute._id;
    console.log(institute);

    axios
      .delete(`/api/institute/deleteInstitute/${id}`)
      .then(() => {
        alert("institute Deleted");
        superAdminContext.getAllInstitutes();

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
          <Spinner color="primary" />
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
              <th>Name</th>
              <th>View/Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {superAdminContext.allInstitutes !== null ? (
              superAdminContext.allInstitutes.map((institute) => (
                <tr key={institute._id}>
                  <td> {institute.name} </td>
                  <td>
                    <Link
                      to={"/superAdminUpdate/" + institute._id}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={(e) => deleteInstitute(e, institute)}
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

export default ViewInstitute;
