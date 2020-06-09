import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCategory } from "../actions/category";

class CreateNewCategory extends Component {
  state = {
      name: "",
  };
  static propTypes = {
    createCategory: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createCategory(this.state.name);
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Create category</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    categories: state.category.categories,
});

export default connect(mapStateToProps, { createCategory })(CreateNewCategory);
