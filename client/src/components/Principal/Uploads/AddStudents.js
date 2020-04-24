import React, { Fragment, useState, useEffect, useContext } from "react";
import Message from "../Message";
import Progress from "../Progress";
import axios from "axios";
import SideNavigation from "../sideNavigation";
import PrincipalContext from "../../../context/principal/principalContext";

const AddStudents = (props) => {
  const principalContext = useContext(PrincipalContext);

  const {
    error,
    allbranches,
    allsemesters,
    user,
    clearError,
    getAllBranches,
    getAllSemester,
  } = principalContext;

  useEffect(() => {
    getAllBranches();
    getAllSemester();
  }, []);

  const [student, setStudent] = useState({
    branch_id: "",
    semester_id: "",
  });

  const { branch_id, semester_id } = student;

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSelectChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(filename.split(".")[1]);
    if (filename.split(".")[1] === "csv") {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("institute_id", user.institute_id);
      formData.append("branch_id", branch_id);
      formData.append("semester_id", semester_id);

      try {
        const res = await axios.post(
          "/api/principalStudent/studentUpload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );

              // Clear percentage
              setTimeout(() => setUploadPercentage(0), 10000);
            },
          }
        );

        const { fileName } = res.data;

        setUploadedFile({ fileName });

        setMessage("Student Data Uploaded");
      } catch (err) {
        if (err.response.status === 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    } else {
      alert("Please Upload .CSV file");
    }
  };

  return (
    <Fragment>
      <SideNavigation></SideNavigation>

      <br />
      <br />
      <h1>UPLOAD STUDENT DATA</h1>
      <br />
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <select
            value={branch_id}
            type='select'
            name='branch_id'
            onChange={onSelectChange}
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
        </div>

        <div className='custom-file mb-4'>
          <select
            value={semester_id}
            type='select'
            name='semester_id'
            onChange={onSelectChange}
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
        </div>

        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
            required
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            {/* <img style={{ width: "100%" }} src={uploadedFile.filePath} alt='' /> */}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default AddStudents;
