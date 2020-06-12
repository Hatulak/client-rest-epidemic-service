import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNewsById, addComment, getCommentsByNewsId, deleteComment } from "../actions/news";
import { Link } from "react-router-dom";
import moment from "moment";

class NewsDetails extends Component {
  static propTypes = {
    newsById: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    getCommentsByNewsId: PropTypes.func.isRequired,
    getNewsById: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    deleteComment: PropTypes.func.isRequired,
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
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Add Comment</h4>
          <hr className="my-4" />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                onChange={this.onChange}
                name="comment"
                value={comment}
                placeholder={"Put your comment here"}
              ></textarea>
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

  renderDeleteButton(_comment) {
    if (this.props.user !== null) {
      if (
        this.props.user.role.includes("ADMIN") ||
        this.props.user.role.includes("EDITOR")
      ) {
        return (
            <div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="close"
                onClick={this.props.deleteComment.bind(this,_comment)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        );
      }
    }
  }

  render() {
    const { comment } = this.state;
    if (this.props.comments && this.props.comments.length == 0) {
      this.props.getCommentsByNewsId(this.props.newsById._id);
    }
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
          <div className="card border-primary mb-3" key={_comment._id}>
            <div className="card-header">
              <div className="page-header">
                <div className="float-left">{_comment.author}</div>
                <div className="float-right">
                  <small className="text-right">
                    {moment(_comment.date).format("DD-MM-yyyy hh:mm:ss")}
                  </small>
                  {this.renderDeleteButton(_comment)}
                </div>
                <div className="clearfix"></div>
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
  user: state.auth.user,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getNewsById,
  addComment,
  getCommentsByNewsId,
  deleteComment,
})(NewsDetails);
