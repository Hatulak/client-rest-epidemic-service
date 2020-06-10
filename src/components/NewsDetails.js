import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNewsById, addComment, getCommentsByNewsId } from "../actions/news";
import { Link } from "react-router-dom";
import moment from "moment";

class NewsDetails extends Component {
  static propTypes = {
    newsById: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    getCommentsByNewsId: PropTypes.func.isRequired,
    getNewsById: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
  };

  state = {
    comment: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addComment(this.state, this.props.newsById._id);
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    if (
      this.props.newsById ||
      this.props.newsById._id !== this.props.match.params.id
    ) {
      console.log(this.props);
      this.props.getNewsById(this.props.match.params.id);
      this.props.getCommentsByNewsId(this.props.match.params.id);
    }
  }

  renderImage() {
    if (this.props.newsById.file) {
      return (
        <img
          src={`http://localhost:3000/news/download/${this.props.newsById.file}`}
        />
      );
    }
  }

  renderCommentForm(comment) {
    return (
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Add Comment</h4>
          <hr className="my-4" />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="comment"
                onChange={this.onChange}
                value={comment}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    const { comment } = this.state;

    return (
      <div className="jumbotron">
        <h1>{this.props.newsById.title}</h1>
        <p className="lead">
          Autor: {this.props.newsById.author}, dnia{" "}
          {moment(this.props.newsById.date).format("DD-MM-yyyy")}
        </p>
        <hr className="my-4" />
        <p>{this.props.newsById.description}</p>
        {this.renderImage()}
        <hr className="my-4" />
        <h3>Comments section</h3>
        <hr className="my-4" />
        {this.renderCommentForm(comment)}
        <hr className="my-4" />

        {this.props.comments.map((_comment) => (
          <div className="card border-primary mb-3">
            <div className="card-header">
              <div class="page-header">
                <div class="float-left">{_comment.author}</div>
                <div class="float-right">
                  <small class="text-right">{moment(_comment.date).format("DD-MM-yyyy")}</small>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{_comment.details} </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newsById: state.news.newsById,
  comments: state.news.comments,
});
export default connect(mapStateToProps, {
  getNewsById,
  addComment,
  getCommentsByNewsId,
})(NewsDetails);
