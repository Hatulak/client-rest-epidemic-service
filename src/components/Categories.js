import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories, setRedirectToFalse, setRedirectAterEditionToFalse } from "../actions/category";
import { Link } from "react-router-dom";
import moment from "moment";

class Categories extends Component {
  static propTypes = {
    setRedirectToFalse: PropTypes.func.isRequired,
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
});
export default connect(mapStateToProps, {
  getCategories,
  setRedirectToFalse,
  setRedirectAterEditionToFalse,
})(Categories);
