import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editCategory, getCategoryById } from "../actions/category";

class EditCategory extends Component {
  static propTypes = {
    editCategory: PropTypes.func.isRequired,
    getCategoryById: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    redirectAfterEdition: PropTypes.bool.isRequired,
  };
  state = {
    name: "",
    _id: "",
  };

  componentDidMount = () => {
    if (
      this.props.category ||
      this.props.category._id !== this.props.match.params.id
    ) {
      this.props.getCategoryById(this.props.match.params.id);
      // this.setState(this.props.category);
    }
    this.setState(this.props.category);
  };

  componentDidUpdate = () => {
    if (this.props.category._id !== this.state._id)
      this.setState({
        name: this.props.category.name,
        _id: this.props.category._id,
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editCategory(this.state)
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.redirectAfterEdition) {
      return <Redirect to="/categories" />;
    }
    const { name, _id } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Edit category</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Category Name</label>
              <input
                key={name, _id}
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.category.category,
  redirectAfterEdition: state.category.redirectAfterEdition,
});

export default connect(mapStateToProps, { editCategory, getCategoryById })(
  EditCategory
);
