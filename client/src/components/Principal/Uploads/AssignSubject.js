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

const AssignSubject = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const {
    error,
    allsubjects,
    allteachers,
    clearError,
    user,
    getAllTeacher,
    getAllSubject,
  } = principalContext;
  const [subject, setSubject] = useState({
    teacher_id: "",
    subject_id: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);

  const { desc, subject_id, teacher_id } = subject;

  useEffect(() => {
    getAllTeacher();
    console.log(allteachers);
    getAllSubject();
    console.log(allsubjects);
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
      formData.append("desc", desc);
      formData.append("teacher_id", teacher_id);
      formData.append("subject_id", subject_id);

      const res = await axios.post(
        "/api/principalTeacher/assignSubject",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Subject Assigned");
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
      setLoading(false);
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
                      <b>ADD Subject</b>
                    </h2>
                    <br />

                    <FormGroup>
                      <select
                        value={teacher_id}
                        type='select'
                        name='teacher_id'
                        onChange={onChange}
                        required
                      >
                        <option>----SELECT TEACHER----</option>
                        {allteachers &&
                          allteachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                              {teacher.name}
                            </option>
                          ))}
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <select
                        value={subject_id}
                        type='select'
                        name='subject_id'
                        onChange={onChange}
                        required
                      >
                        <option>----SELECT SUBJECT----</option>
                        {allsubjects &&
                          allsubjects.map((subject) => (
                            <option key={subject._id} value={subject._id}>
                              {subject.name}
                            </option>
                          ))}
                      </select>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='desc'
                        value={desc}
                        placeholder='Description'
                        onChange={onChange}
                        required
                      />
                    </FormGroup>

                    <Button block type='submit' className='btn-success mt-5'>
                      ASSIGN SUBJECT
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
export default AssignSubject;
