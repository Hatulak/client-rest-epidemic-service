import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getNews,
  getNewsById,
  deleteNewsById,
  getNewsPublished,
  publishNewsById,
  setRedirectAfterEditionToFalse,
  setRedirectAfterCreationToFalse,
  setRedirectAfterStatusChangeToFalse,
} from "../actions/news";
import { Link } from "react-router-dom";
import moment from "moment";

class News extends Component {
  static propTypes = {
    news: PropTypes.array.isRequired,
    getNews: PropTypes.func.isRequired,
    deleteNewsById: PropTypes.func.isRequired,
    getNewsPublished: PropTypes.func.isRequired,
    getNewsById: PropTypes.func.isRequired,
    publishNewsById: PropTypes.func.isRequired,
    setRedirectAfterCreationToFalse: PropTypes.func.isRequired,
    setRedirectAfterStatusChangeToFalse: PropTypes.func.isRequired,
    setRedirectAfterEditionToFalse: PropTypes.func.isRequired,
    redirectAfterCreation: PropTypes.bool.isRequired,
    redirectAfterEdition: PropTypes.bool.isRequired,
    redirectAfterStatusChange: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  componentDidMount() {
    if(this.props.redirectAfterCreation){
      this.props.setRedirectAfterCreationToFalse();
    }
    if(this.props.redirectAfterEdition){
      this.props.setRedirectAfterEditionToFalse();
    }
    if(this.props.redirectAfterStatusChange){
      this.props.setRedirectAfterStatusChangeToFalse();
    }
    if (this.props.news) {
      if (this.props.user !== null)
        if (
          this.props.user.role.includes("ADMIN") ||
          this.props.user.role.includes("EDITOR")
        ) {
          this.props.getNews();
        } else {
          this.props.getNewsPublished();
        }
    }
  }

  renderButton() {
    if (this.props.user !== null)
      if (
        this.props.user.role.includes("ADMIN") ||
        this.props.user.role.includes("EDITOR")
      ) {
        return (
          <div>
            <Link to={"/createNews"} className={"btn btn-primary"}>
              Create news
            </Link>
          </div>
        );
      }
  }

  renderEditButton(id) {
    if (this.props.user !== null) {
      if (
        this.props.user.role.includes("ADMIN") ||
        this.props.user.role.includes("EDITOR")
      ) {
        return (
          <Link to={`/editNews/${id}`} className={"btn btn-primary"}>
            Edit
          </Link>
        );
      }
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
            onClick={this.props.deleteNewsById.bind(this, id)}
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
        <h1>News:</h1>
        {this.renderButton()}
        <table className="table table-striped" datapagesize={5}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>Created at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.news.map((news) => (
              <tr key={news._id}>
                <td>{news.title}</td>
                <td>{news.description}</td>
                <td>{news.author}</td>
                <td>{moment(news.date).format("DD.MM.YYYY hh:mm:ss")}</td>
                <td>{news.status}</td>
                <td>
                  <Link
                    to={`/showNews/${news._id}`}
                    className={"btn btn-primary"}
                  >
                    Show
                  </Link>
                  {this.renderEditButton(news._id)}
                  {this.renderDeleteButton(news._id)}
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
  redirectAfterCreation: state.news.redirectAfterCreation,
  redirectAfterEdition: state.news.redirectAfterEdition,
  redirectAfterStatusChange: state.news.redirectAfterStatusChange,
  news: state.news.news,
  user: state.auth.user,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getNews,
  getNewsById,
  deleteNewsById,
  getNewsPublished,
  publishNewsById,
  setRedirectAfterStatusChangeToFalse,
  setRedirectAfterCreationToFalse,
  setRedirectAfterEditionToFalse,
})(News);
