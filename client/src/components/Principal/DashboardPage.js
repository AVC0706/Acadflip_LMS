import React from "react";
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
import SideNavigation from "./sideNavigation";

const DashboardPage = () => {
  return (
    <React.Fragment>
      <SideNavigation></SideNavigation>

      <Row className='justify-content-center'>
        <Col md='6' lg='9'>
          <section className='text-center pb-3'>
            <Row className='d-flex justify-content-center'>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>Add Branches</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/principaladdBranch' className='p-2'>
                        <Button color='primary'>ADD Branch</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>Add Semester </strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='principaladdSemester' className='p-2'>
                        <Button color='primary'>ADD SEMESTER</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>ADD Subject</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/principaladdSubject' className='p-2'>
                        <Button color='primary'>ADD SUBJECT</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>ADD Teacher</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/principaladdTeacher' className='p-2'>
                        <Button color='primary'>ADD TEACHER</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>ADD Student</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/principalstudentUpload' className='p-2'>
                        <Button color='primary'>ADD STUDENT</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col lg='6' xl='5' className='mb-3'>
                <Card className='d-flex mb-5 p-5'>
                  <CardBody>
                    <CardTitle className='font-bold mb-3'>
                      <strong>ASSIGN Subject</strong>
                    </CardTitle>
                    <CardText></CardText>
                    <br />
                    <br />
                    <span className='right'>
                      <Link to='/principalassignSubject' className='p-2'>
                        <Button color='primary'>ASSIGN SUBJECT</Button>{" "}
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
