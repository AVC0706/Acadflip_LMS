import React, { useState, useEffect,useContext } from 'react';
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
  import SideNav from './sideNavigation';
  import TeacherContext from '../../context/teacher/teacherContex';
  import axios from "axios"

  const AddTopic = (props) => {
      const teacherContext = useContext(TeacherContext);

      const {error, allunits,alltopic,allassignsub,addTopic,getAssignedSub,getTopic,getUnit,clearError} = teacherContext;

      const [topic,setTopic] = useState({
        name: "",
        description: "",
        is_active: false,
        unit_id: "",
      });
      const [loading,setLoading] = useState(false);
      useEffect(()=> {
          getAssignedSub();
          getUnit();
          clearError();
      },[]);

      const change = (e) => {
        setTopic({
            ...topic,
            [e.target.name]: e.target.value
        });
      }

      const submit = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("is_active", is_active);
            formData.append("unit_id", unit_id);

            const res = await axios.post("/api/teacher/createTopic", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            alert("topic added");
            setLoading(false)
          } catch(e) {
              alert(e.response.data.msg)
              setLoading(false);
          }
      };

      if(loading) {
          return (
              <React.Fragment>
                  <div>
                      {" "}
                      <Spinner color="primary" />
                  </div>
              </React.Fragment>
          );
      } else {
          <div>
              <SideNav></SideNav>
              <div className='container-fluid'>
          <Card className='loginCard'>
            <Row className='justify-content-center align-middle'>
              <Col md='4' className='mb-5 loginData text-center'>
                <CardBody>
                  <form onSubmit={submit}>
                    <h2>
                      <b>ADD Topic</b>
                    </h2>
                    <br />

                    <FormGroup>
                      <select
                        value={unit_id}
                        type='select'
                        name='unit_id'
                        onChange={change}
                        required
                      >
                        <option>----SELECT TEACHER----</option>
                        {allunits &&
                          allunits.map((unit) => (
                            <option key={unit._id} value={unit._id}>
                              {unit.name}
                            </option>
                          ))}
                      </select>
                    </FormGroup>


                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='description'
                        value={description}
                        placeholder='Description'
                        onChange={change}
                        required
                      />
                    </FormGroup>

                    <Button block type='submit' className='btn-success mt-5'>
                      ADD topic
                    </Button>
                  </form>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </div>
          </div>
      }
  }
