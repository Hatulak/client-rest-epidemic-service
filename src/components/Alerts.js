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
    if (message !== prevProps.message) {
      // for message
      if (message.msg.passwordNotMatch)
        alert.error(message.msg.passwordNotMatch);
      if (message.msg.categoryIdIsEmpty)
        alert.error(message.msg.categoryIdIsEmpty);
      if (message.msg.requestFailed) alert.error(message.msg.requestFailed);
      if (message.msg.setRoleError) alert.error(message.msg.setRoleError);
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
