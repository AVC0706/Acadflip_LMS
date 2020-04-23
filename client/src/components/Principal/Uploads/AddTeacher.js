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
import src1 from "../../assets/login.svg";
import SideNavigation from "./sideNavigation";
import PrincipalContext from "../../context/principal/principalContext";

const PLoginPage = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const { isAuth, error, login, isPrincipal, clearError } = principalContext;
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { email, password } = user;

  useEffect(() => {
    if (isAuth) {
      // console.log("is admin" + isAdmin);
      if (isPrincipal) {
        // alert("LOGGED IN");
        setLoading(false);
        props.history.push("/principaldashboard");
      }
    } else {
      console.log("non");

      setLoading(false);
      props.history.push("/principallogin");
    }

    if (error === "Invalid Email or Password") {
      setLoading(false);

      alert(error);
    }

    clearError();
    // eslint-disable-next-line
  }, [error, isAuth, props.history, isPrincipal, loading]);

  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("working");
    if (email === "" || password === "") {
      // setAlert("Please enter all fields", "danger");
    } else {
      login({
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
          <Spinner color='primary' />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <SideNavigation></SideNavigation>
        <div className='container-fluid'>
          <Card className='loginCard'>
            <Row className='justify-content-center align-middle'>
              <Col md='2' className='mb-5'></Col>
              <Col md='4' className='mb-5 loginData text-center'>
                <CardBody>
                  <form onSubmit={onSubmit}>
                    <h2>
                      <b>Member Login</b>
                    </h2>
                    <br />
                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='name'
                        value={email}
                        placeholder='Name'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        autoFocus
                        type='email'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </FormGroup>
                    <Button block type='submit' className='btn-success mt-5'>
                      Login
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
export default PLoginPage;
