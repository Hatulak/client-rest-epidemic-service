import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Alerts extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { alert, message } = this.props;
    console.log("jestem ", message);
    if (message !== prevProps.message) {
      // for message
      if (message.msg.passwordNotMatch)
        alert.error(message.msg.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
