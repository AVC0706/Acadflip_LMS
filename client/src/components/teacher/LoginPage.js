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
import TeacherContext from '../../context/teacher/teacherContex'


const Tlogin = (props) => {
    const teacherContext = useContext(TeacherContext);
    const {isAuth, error,login,clearError} = teacherContext;
    const [user,setUser] = useState({
        email: "",
        password: "",
    });
    const [loading,setLoading] = useState(false);
    const {email,password} = user;

    useEffect(()=> {
        if(isAuth) {
            setLoading(false);
            props.history.push('/teacherDashboard')   
  
        } else {
            setLoading(false);
            props.history.push('/teacherlogin')
        }
        
        if(error==="Invalid email pass") {
            setLoading(false);

            alert(error)
        }

        clearError();
    }, [error,isAuth,props.history, loading]);

    const onChange = (e) => {
      console.log(user)
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("login successfull")
            login({
                email,
                password
            })
    };

    if(loading) {
        return (
            <React.Fragment>
                <div>
                    {" "}
                    <Spinner color='primary'/>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <div>
              <div className='container-fluid'>
                <Card className='loginCard'>
                  <Row className='justify-content-center align-middle'>
                    <Col md='4' className=''>
                      <CardImg className='img-fluid' src={src1} />
                    </Col>
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
}

export default Tlogin;