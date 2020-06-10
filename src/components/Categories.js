import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories, setRedirectToFalse, setRedirectAterEditionToFalse, deleteCategoryById } from "../actions/category";
import { Link } from "react-router-dom";
import moment from "moment";

class Categories extends Component {
  static propTypes = {
    setRedirectToFalse: PropTypes.func.isRequired,
    deleteCategoryById: PropTypes.func.isRequired,
    setRedirectAterEditionToFalse: PropTypes.func.isRequired,
    redirectAfterCreation: PropTypes.bool.isRequired,
    redirectAfterEdition: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.redirectAfterCreation) {
      this.props.setRedirectToFalse();
    }
    if (this.props.redirectAfterEdition) {
      this.props.setRedirectAterEditionToFalse();
    }
    if (this.props.categories) {
      this.props.getCategories();
      console.log(this.props.categories);
    }
  }

  renderDeleteButton(id) {
    if (this.props.user !== null) {
      if (
        this.props.user.role.includes("ADMIN") ||
        this.props.user.role.includes("EDITOR")
      ) {
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.deleteCategoryById.bind(this, id)}
          >
            Delete
          </button>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Categories:</h1>
        <Link to={"/createCategory"} className={"btn btn-primary"}>
          Create Category
        </Link>
        <table className="table table-striped" datapagesize={5}>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>
                  <Link
                    to={`/editCategory/${cat._id}`}
                    className={"btn btn-primary"}
                  >
                    Edit
                  </Link>
                  {this.renderDeleteButton(cat._id)}
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
  categories: state.category.categories,
  redirectAfterCreation: state.category.redirectAfterCreation,
  redirectAfterEdition: state.category.redirectAfterEdition,
  user: state.auth.user,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCategories,
  setRedirectToFalse,
  setRedirectAterEditionToFalse,
  deleteCategoryById
})(Categories);
