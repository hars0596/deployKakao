import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFlashMessage } from "../components/actions/flashMessages";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";

export default function (ComposedComponent) {
  class Authenticate extends Component {
    state = {
      bl: true
    }
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: "error",
          text: (<Snackbar
            place="bl"
            color="danger"
            icon={AddAlert}
            message="You are not authorize for this route"
            open={this.state.bl}
            closeNotification={() => this.setState({ bl: false })}
            close
          />)
        });
        this.props.history.push("/login");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  Authenticate.protoTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  Authenticate.contextType = {
    router: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(
    mapStateToProps,
    { addFlashMessage }
  )(Authenticate);
}
