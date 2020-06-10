import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers, deleteUserById, setUserRole } from "../actions/users";
import { Link, Redirect } from "react-router-dom";
import { returnErrors } from "../actions/message";

class UserRole extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    deleteUserById: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    setUserRole: PropTypes.func.isRequired,
    redirectAfterSetRole: PropTypes.bool.isRequired,
  };
  state = {
    username: "",
    role: "",
  };

  componentDidMount = () => {
    if (this.props.users) {
      this.props.getUsers();
    }
    this.setState(
      this.props.users.find((x) => x.id == this.props.match.params.id)
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.role !== "") {
      this.props.setUserRole(this.state);
    } else {
      this.props.returnErrors({
        setRoleError: "Role was not chosen",
      });
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.redirectAfterSetRole) {
      return <Redirect to="/users" />;
    }
    const { username, role } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Set User Role</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={username}
                disabled={true}
              />
            </div>
            <div className="form-group">
              <label>Choose Role</label>
              <select
                className="form-control"
                onChange={this.onChange}
                name="role"
                value={role}
              >
                <option key="NORMAL" value="NORMAL">
                  NORMAL
                </option>
                <option key="EDITOR" value="EDITOR">
                  EDITOR
                </option>
                <option key="ADMIN" value="ADMIN">
                  ADMIN
                </option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Set Role
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  redirectAfterSetRole: state.users.redirectAfterSetRole,
});

export default connect(mapStateToProps, {
  getUsers,
  deleteUserById,
  setUserRole,
})(UserRole);
