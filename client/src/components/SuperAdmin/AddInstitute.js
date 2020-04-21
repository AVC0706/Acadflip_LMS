import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import SuperAdminContext from "../../context/superadmin/superadminContext";
import SideNavigation from "./sideNavigation";

const AddInstitute = (props) => {
  const superadminContext = useContext(SuperAdminContext);

  const { error, add, clearError, isInst } = superadminContext;
  const [user, setuser] = useState({
    name: "",
    iuser: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  superadminContext.isAuth = useState(true);

  const { name, iuser, email, password } = user;

  useEffect(() => {
    if (isInst) {
      setLoading(false);
      alert("INSTITUTE ADDED");
      props.history.push("/superAdmindashboard");
    }

    if (error) {
      setLoading(false);
      alert(error);
      props.history.push("/superAdminRegister");
    }

    clearError();
  }, [error, isInst, loading]);

  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (name === "" || iuser === "" || email === "" || password === "") {
    } else {
      add({
        name,
        iuser,
        email,
        password,
      });
    }
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
        <div className="container-fluid">
          <Card className="loginCard">
            <Row className="justify-content-center align-middle">
              <Col md="4" className="">
                {/* <CardImg className="img-fluid" src={src1} /> */}
              </Col>
              <Col md="2" className="mb-5"></Col>
              <Col md="4" className="mb-5 loginData text-center">
                <CardBody>
                  <form onSubmit={onSubmit}>
                    <h2>
                      <b>Add Institute</b>
                    </h2>
                    <br />
                    <FormGroup>
                      <Input
                        autoFocus
                        type="text"
                        name="name"
                        value={name}
                        placeholder="name"
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="iuser"
                        value={undefined}
                        placeholder="user"
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="email"
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <Button block type="submit" className="btn-success mt-5">
                      Register
                    </Button>
                  </form>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
};
export default AddInstitute;
