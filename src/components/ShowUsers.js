import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getUsers,
  deleteUserById,
  setRedirectAfterSetUserRole,
} from "../actions/users";
import { Link } from "react-router-dom";

class ShowUsers extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    deleteUserById: PropTypes.func.isRequired,
    setRedirectAfterSetUserRole: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    redirectAfterSetRole: PropTypes.bool.isRequired,
  };
  componentDidMount() {
    if (this.props.users) {
      this.props.getUsers();
    }
    if (this.props.redirectAfterSetRole) {
      this.props.setRedirectAfterSetUserRole();
    }
  }

  renderDeleteButton(id) {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.props.deleteUserById.bind(this, id)}
      >
        Delete
      </button>
    );
  }

  render() {
    return (
      <div>
        <h1>Users:</h1>
        <table className="table table-striped" datapagesize={5}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/setUserRole/${user.id}`}
                    className={"btn btn-primary"}
                  >
                    Set Role
                  </Link>
                  {this.renderDeleteButton(user.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  setRedirectAfterSetUserRole,
})(ShowUsers);
