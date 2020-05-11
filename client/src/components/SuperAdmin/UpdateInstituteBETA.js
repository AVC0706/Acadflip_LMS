<h1> WORK IN PROGRESS</h1>;
import React, { Component } from "react";
import axios from "axios";

const customStyle = {
  width: "300px",
  margin: "0 auto",
};

class UpdateInstitute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      iuser: "",
      email: "",
      password: "",
    };
  }

  componentDidMount = () => {
    this.getInstituteById();
  };

  // To get employee based on ID
  getInstituteById() {
    axios
      .get("/api/institute/editInstitute/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          iuser: response.data.iuser,
          email: response.data.email,
          password: response.data.password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // To update the record on submit
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, iuser, email, password } = this.state;
    axios
      .post("/api/institute/updateInstitute" + this.props.match.params.id, {
        name: name,
        iuser: iuser,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container">
        <form style={customStyle} onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              name="iuser"
              type="text"
              value={this.state.iuser}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            Email
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <label>
            password No
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <br />
          <input type="submit" value="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default UpdateInstitute;
