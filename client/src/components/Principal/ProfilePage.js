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
} from "reactstrap";
import src1 from "../../assets/img-1.jpg";

const ProfilePage = () => {
  return (
    <React.Fragment>
      <Row className='justify-content-center'>
        <Col sm='12' md='6' lg='3' className='mb-5 p-5'>
          <Card>
            <CardImg className='img-fluid' src={src1} />
            <CardBody>
              <CardTitle className='text-center mb-2 font-bold'>XYZ</CardTitle>
              <CardTitle className='text-center mb-2'>
                Teacher/Student
              </CardTitle>
              <CardTitle className='text-center mb-2'>-Subject</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center text-center'>
        <Col lg='6' xl='5' className='mb-3 '>
          <Card className='d-flex mb-5 p-5'>
            <CardBody>
              <CardTitle className='font-bold mb-3'>
                <strong>Title</strong>
              </CardTitle>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardText>
            </CardBody>
            <CardFooter className='links-light profile-card-footer'>
              <span className='right'>
                <a className='p-2' href='#'>
                  View
                </a>
              </span>
            </CardFooter>
          </Card>
        </Col>
        <Col lg='6' xl='5' className='mb-3'>
          <Card className='d-flex mb-5 p-5'>
            <CardBody>
              <CardTitle className='font-bold mb-3'>
                <strong>Title</strong>
              </CardTitle>
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardText>
            </CardBody>
            <CardFooter className='links-light profile-card-footer'>
              <span className='right'>
                <a className='p-2' href='#'>
                  View
                </a>
              </span>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProfilePage;
