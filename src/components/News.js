import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNews, getNewsById } from "../actions/news";
import { Link } from "react-router-dom";
import moment from "moment";

class News extends Component {
  static propTypes = {
    news: PropTypes.array.isRequired,
    getNews: PropTypes.func.isRequired,
    getNewsById: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  componentDidMount() {
    if (this.props.news) {
      this.props.getNews();
      console.log(this.props.news);
    }
  }

  renderButton() {
    console.log(this.props.user);
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
  news: state.news.news,
  user: state.auth.user,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getNews,
  getNewsById,
})(News);
