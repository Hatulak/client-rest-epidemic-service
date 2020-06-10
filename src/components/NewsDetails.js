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
    if (
      this.props.newsById ||
      this.props.newsById._id !== this.props.match.params.id
    ) {
      console.log(this.props);
      this.props.getNewsById(this.props.match.params.id);
    }
  }

  renderImage() {
    if(this.props.newsById.file){
      return (<img src={`http://localhost:3000/news/download/${this.props.newsById.file}`} />);
    }
  }
  

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">{this.props.newsById.title}</h1>
        <p className="lead">
          Autor: {this.props.newsById.author}, dnia{" "}
          {moment(this.props.newsById.date).format("DD-MM-yyyy")}
        </p>
        <hr className="my-4" />
        <p>{this.props.newsById.description}</p>
        {this.renderImage()}
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
