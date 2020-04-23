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

const AddBranch = (props) => {
  //start

  const principalContext = useContext(PrincipalContext);

  const {
    error,
    clearError,
    user,
    addBranch,
    getAllBranches,
  } = principalContext;
  const [branch, setbranch] = useState({
    name: "",
    hod: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, hod, code } = branch;

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
    setbranch({
      ...branch,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("working");

    addBranch({
      name,
      hod,
      code,
      institute_id: user.institute_id,
    });
    setbranch({ name: "", hod: "", code: "" });
    getAllBranches({ institute_id: user.institute_id });
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
                      <b>ADD BRANCH</b>
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
                        name='hod'
                        value={hod}
                        placeholder='HOD Name'
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
                      ADD Branch
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
export default AddBranch;
