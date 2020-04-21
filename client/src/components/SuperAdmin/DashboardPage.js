import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Col,
  Row,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  button,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import SuperAdminContext from "../../context/superadmin/superadminContext";

const DashboardPage = (props) => {
  const authContext = useContext(SuperAdminContext);

  const { isAuth, error, loadUser, token, clearError } = SuperAdminContext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }

    // clearError();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Row className='justify-content-center'>
        <Col md='6' lg='9'>
          <section className='text-center pb-3'>
            <Row className='d-flex justify-content-center'>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>Add Institute</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/add' className='p-2'>
                        <Button color='primary'>ADD Institute</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>Update Details </strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/' className='p-2'>
                        <Button color='primary'>UPDATE INSTITUTE</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashboardPage;
