import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Spinner,
} from "reactstrap";
import src1 from "../../assets/register.svg";
import SuperAdminContext from "../../context/superadmin/superadminContext";
import SideNavigation from "./sideNavigation";

const RegisterPage = (props) => {
  //start

  const superadminContext = useContext(SuperAdminContext);

  const {
    isAuth,
    isAdmin,
    error,
    register,
    clearError,
    msg,
    token,
  } = superadminContext;
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password } = user;

  useEffect(() => {
    if (isAuth) {
      // console.log("is admin" + isAdmin);
      // if (isAdmin) {
      // alert("LOGGED IN");
      setLoading(false);
      props.history.push("/superAdminlogin");
    }

    if (error) {
      setLoading(false);
      alert(error);
      props.history.push("/superAdminRegister");
    }

    // console.log(msg);
    clearError();
  }, [error, props.history, loading, token]);

  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (name === "" || email === "" || password === "") {
      // setAlert("Please enter all fields", "danger");
    } else {
      register({
        name,
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
                <CardImg className="img-fluid" src={src1} />
              </Col>
              <Col md="2" className="mb-5"></Col>
              <Col md="4" className="mb-5 loginData text-center">
                <CardBody>
                  <form onSubmit={onSubmit}>
                    <h2>
                      <b>Super Admin Registration</b>
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
export default RegisterPage;
