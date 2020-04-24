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

const AddSubject = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const {
    error,
    allbranches,
    allsemesters,
    clearError,
    user,
    getAllBranches,
    getAllSemester,
  } = principalContext;
  const [subject, setSubject] = useState({
    name: "",
    code: "",
    branch_id: "",
    semester_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [sems, setSems] = useState([]);

  const { name, code, branch_id, semester_id } = subject;

  useEffect(() => {
    getAllBranches();
    console.log(allbranches);
    getAllSemester();
    console.log(allsemesters);

    clearError();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setSubject({
      ...subject,
      [e.target.name]: e.target.value,
    });
    console.log(subject);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("code", code);
      formData.append("branch_id", branch_id);
      formData.append("semester_id", semester_id);

      const res = await axios.post(
        "/api/principalSubject/addSubject",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Subject Uploaded");
      setLoading(false);
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
                      <select
                        value={semester_id}
                        type='select'
                        name='semester_id'
                        onChange={onChange}
                        required
                      >
                        <option>----SELECT SEMESTER----</option>
                        {allsemesters &&
                          allsemesters.map((sem) => (
                            <option key={sem._id} value={sem._id}>
                              {sem.name}
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
                        type='text'
                        name='code'
                        value={code}
                        placeholder='Branch Code'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <Button block type='submit' className='btn-success mt-5'>
                      ADD SUBJECT
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
export default AddSubject;
