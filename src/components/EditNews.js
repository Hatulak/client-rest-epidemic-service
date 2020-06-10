import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createNews, setRedirectAfterCreationToFalse, getNewsById, editNews } from "../actions/news";
import { getCategories } from "../actions/category";

class CreateNews extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getNewsById: PropTypes.func.isRequired,
    editNews: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    newsById: PropTypes.object.isRequired,
  };
  state = {
    id: '',
    title: "",
    description: "",
    cconst: "",
    file: "",
    inputRef : React.createRef(),
  };

  componentDidMount = () => {
    if (this.props.categories) {
      this.props.getCategories();
    }
    if (
      this.props.newsById ||
      this.props.getNewsById._id !== this.props.match.params.id
    ) {
      this.props.getNewsById(this.props.match.params.id);
    }
    this.setState({...this.props.newsById, file: ""});
  };

  componentDidUpdate = () => {
    if (this.props.newsById._id !== this.state.id)
      this.setState({
        title: this.props.newsById.title,
        id: this.props.newsById._id,
        description: this.props.newsById.description,
        cconst: this.props.newsById.cconst,
        // file: this.props.newsById.file,
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editNews(this.state);
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { title, description, cconst, file, inputRef } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Edit news</h2>
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
                name="cconst"
                value={cconst}
                // defaultValue={cconst}
              >
                {this.props.categories.map((cat) => (
                  <option key={cat.cconst} value={cat.cconst}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="file"
              className="form-control-file"
              aria-describedby="fileHelp"
              onChange={() => this.setState({file:inputRef.current.files[0]})}
              name="file"
              ref={inputRef}
            ></input>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Edit
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
  newsById: state.news.newsById,
});

export default connect(mapStateToProps, { createNews, getCategories, getNewsById, editNews })(
  CreateNews
);
