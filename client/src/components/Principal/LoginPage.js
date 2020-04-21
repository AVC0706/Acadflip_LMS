import React from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
} from "reactstrap";
import src1 from "../../assets/login.svg";

const LoginPage = () => {
  return (
    <div className='container-fluid'>
      <Card className='loginCard'>
        <Row className='justify-content-center align-middle'>
          <Col md='4' className=''>
            <CardImg className='img-fluid' src={src1} />
          </Col>
          <Col md='2' className='mb-5'></Col>
          <Col md='4' className='mb-5 loginData text-center'>
            <CardBody>
              <form>
                <h2>
                  <b>Member Login</b>
                </h2>
                <br />
                <FormGroup controlId='email' bsSize='large'>
                  <Input autoFocus type='email' placeholder='Email' />
                </FormGroup>
                <FormGroup controlId='password' bsSize='large'>
                  <Input type='password' placeholder='Password' />
                </FormGroup>
                <Button
                  block
                  bsSize='large'
                  type='submit'
                  className='btn-success mt-5'
                >
                  Login
                </Button>
              </form>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default LoginPage;
