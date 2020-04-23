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
import SideNavigation from "../sideNavigation";
import PrincipalContext from "../../../context/principal/principalContext";
import axios from "axios";

const AddSemester = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const { error, branc, clearError, user, addBranch } = principalContext;
  const [sem, setsem] = useState({
    name: "",

    code: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, code } = sem;

  useEffect(() => {
    if (!error) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);

      alert(error);
    }

    clearError();
    // eslint-disable-next-line
  }, [error, loading]);

  const onChange = (e) => {
    setsem({
      ...sem,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);

      const res = await axios.post("/api/principal/addSemester", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Semester Uploaded");
    } catch (err) {
      alert(err.response.data.msg);
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
              <Col md='4' className='mb-5 loginData text-center'>
                <CardBody>
                  <form onSubmit={onSubmit}>
                    <h2>
                      <b>ADD Semester</b>
                    </h2>
                    <br />
                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='name'
                        value={name}
                        placeholder='Name'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='code'
                        value={code}
                        placeholder='Branch Code'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <Button block type='submit' className='btn-success mt-5'>
                      ADD Semester
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
export default AddSemester;
