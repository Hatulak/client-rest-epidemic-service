import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNewsById } from "../actions/news";
import { Link } from "react-router-dom";
import moment from "moment";

class NewsDetails extends Component {
  static propTypes = {
    newsById: PropTypes.object.isRequired,
    getNewsById: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (this.props.newsById) {
      console.log(this.props);
      this.props.getNewsById(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div class="jumbotron">
        <h1 class="display-3">{this.props.newsById.title}</h1>
        <p class="lead">
          Autor: {this.props.newsById.author}, dnia{" "}
          {moment(this.props.newsById.date).format("DD-MM-yyyy")}
        </p>
        <hr class="my-4" />
        <p>{this.props.newsById.description}</p>
        <img src={`http://localhost:3000/news/download/${this.props.newsById.file}`} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newsById: state.news.newsById,
});
export default connect(mapStateToProps, {
  getNewsById,
})(NewsDetails);
