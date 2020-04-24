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

const AddTeacher = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const {
    error,
    allbranches,
    allsemesters,
    clearError,
    user,
    getAllBranches,
  } = principalContext;
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: "",
    branch_id: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password, branch_id } = teacher;

  useEffect(() => {
    getAllBranches();
    console.log(allbranches);
    clearError();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
    console.log(teacher);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (branch_id !== "") {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("branch_id", branch_id);
        formData.append("institute_id", user.institute_id);

        const res = await axios.post(
          "/api/principalTeacher/addTeacher",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Teacher Uploaded");
        setTeacher({ name: "", email: "", password: "", branch_id: "" });
        setLoading(false);
      } catch (err) {
        alert(err.response.data.msg);
        setTeacher({ name: "", email: "", password: "", branch_id: "" });

        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("Select Branch");
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
                      <b>ADD Teacher</b>
                    </h2>
                    <br />

                    <FormGroup>
                      <select
                        value={branch_id}
                        type='select'
                        name='branch_id'
                        onChange={onChange}
                        required
                      >
                        <option>----SELECT BRANCH----</option>
                        {allbranches &&
                          allbranches.map((branch) => (
                            <option key={branch._id} value={branch._id}>
                              {branch.name}
                            </option>
                          ))}
                      </select>
                    </FormGroup>

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
                        type='email'
                        name='email'
                        value={email}
                        placeholder='EMAIL ID'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        autoFocus
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <Button block type='submit' className='btn-success mt-5'>
                      ADD Teacher
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
export default AddTeacher;
