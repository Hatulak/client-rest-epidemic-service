import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNews, setRedirectAfterCreationToFalse } from "../actions/news";
import { getCategories } from "../actions/category";
import { returnErrors } from "../actions/message";

class CreateNews extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    setRedirectAfterCreationToFalse: PropTypes.func.isRequired,
    redirectAfterCreation: PropTypes.bool.isRequired,
    createNews: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  };
  state = {
    title: "",
    description: "",
    categoryId: "",
    file: "",
    inputRef: React.createRef(),
  };

  componentDidMount = () => {
    if (this.props.categories) {
      this.props.getCategories();
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.categoryId !== "") {
      this.props.createNews(this.state);
    } else{
      this.props.returnErrors({ categoryIdIsEmpty: "Category Id was not chosen" });
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.redirectAfterCreation) {
      return <Redirect to="/news" />;
    }
    const { title, description, categoryId, file, inputRef } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Create news</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>News title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={this.onChange}
                value={title}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                onChange={this.onChange}
                name="description"
                value={description}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Choose category</label>
              <select
                className="form-control"
                onChange={this.onChange}
                name="categoryId"
                value={categoryId}
              >
                <option value="select">Select an Option</option>
                {this.props.categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="file"
              className="form-control-file"
              aria-describedby="fileHelp"
              onChange={() =>
                this.setState({ file: inputRef.current.files[0] })
              }
              name="file"
              ref={inputRef}
            ></input>
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
  redirectAfterCreation: state.news.redirectAfterCreation,
});

export default connect(mapStateToProps, { createNews, getCategories, returnErrors, setRedirectAfterCreationToFalse })(
  CreateNews
);
