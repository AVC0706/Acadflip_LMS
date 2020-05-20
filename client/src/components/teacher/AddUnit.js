import React, { useState, useEffect, useContext } from 'react'
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
  import SideNav from './sideNavigation'
import TeacherContext from '../../context/teacher/teacherContex';
import PrincipleContext from '../../context/principal/principalContext'
import axios from "axios"

const AddUnit = (props) => {
    const teacherContext = useContext(TeacherContext);
    const principalContext = useContext(PrincipleContext)
    const {error, allunits,getallunits, getAssignedSub ,allasignsub,clearError} = teacherContext;
    const {getAllSubject,allsubjects} = principalContext;
    const [unit, setUnit] = useState({
        name:"",
        unit_no: 0,
        subject_id: "",
        description: "",
    })

    const [loading,setLoading] = useState(false);
    const {name, unit_no, subject_id, description } = unit

    useEffect(()=> {
        getAllSubject();
        console.log(allsubjects);
        getAssignedSub();
        console.log(allasignsub);
        clearError(); 
    },[])

    const Change = (e) => {
        setUnit({
            ...unit,
            [e.target.name]: e.target.value
        });
    }

    const Submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("unit_no", unit_no);
            formData.append("subject_id", subject_id);
            formData.append("description", description);
            
            const res = await axios.post("/api/teacher/createUnit", formData, 
            {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
            });

            alert("unit created");
            setLoading(false)
        } catch(e) {
            alert(e.response.data.msg)
        }
    };
    if(loading) {
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
            <SideNav></SideNav>
            <div className='container-fluid'>
          <Card className='loginCard'>
            <Row className='justify-content-center align-middle'>
              <Col md='4' className='mb-5 loginData text-center'>
                <CardBody>
                  <form onSubmit={Submit}>
                    <h2>
                      <b>ADD unit</b>
                    </h2>
                    <br />

                    <FormGroup>
                      <select
                        value={subject_id}
                        type='select'
                        name='subject_id'
                        onChange={Change}
                        required
                      >
                        <option>----SELECT SUBJECT----</option>
                        {allsubjects && allsubjects.map((subject)=>(
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
                        name='name'
                        value={name}
                        placeholder='Name'
                        onChange={Change}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        autoFocus
                        type='Number'
                        name='unit_no'
                        value={unit_no}
                        placeholder='Unit No'
                        onChange={Change}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        autoFocus
                        type='text'
                        name='description'
                        value={description}
                        placeholder='description'
                        onChange={Change}
                        required
                      />
                    </FormGroup>
                    <Button block type='submit' className='btn-success mt-5'>
                      ADD unit
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

export default AddUnit

