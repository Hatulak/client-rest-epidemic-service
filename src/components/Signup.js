import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/auth";
import { returnErrors } from "../actions/message";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
  };
  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    redirect: PropTypes.bool,
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { username, password, password2 } = this.state;
    if (username.length > 150) {
      this.props.returnErrors({ passwordNotMatch: "Username is too long" });
      return;
    }
    if (password.length <= 5) {
      this.props.returnErrors({
        passwordNotMatch:
          "Password is too short - must be at least 6 characters",
      });
      return;
    }
    if (password.length >= 50) {
      this.props.returnErrors({ passwordNotMatch: "Password is too long" });
      return;
    }
    if (password !== password2) {
      this.props.returnErrors({ passwordNotMatch: "Password do not match" });
    } else {
      const newUser = {
        username,
        password,
      };
      this.props.register(newUser);
    }
  };
  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    else if (this.props.redirect) {
      return <Redirect to="/signin" />;
    }
    const { username, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  redirect: state.auth.redirect,
});

export default connect(mapStateToProps, { register, returnErrors })(Signup);
