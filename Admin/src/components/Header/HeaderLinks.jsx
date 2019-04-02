import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import Tooltip from "@material-ui/core/Tooltip";


class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Tooltip title="Log Out">
        <Button
          aria-label="Person"
          className={classes.buttonLink}
          onClick={this.logout}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
      </Tooltip>

    );

    const gustLinks = (
      <div>
        <Link to='/signup'>
          <Button color="danger">signup</Button>
        </Link>
        <Link to='/login'>
          <Button color="danger">Login</Button>
        </Link>
      </div>
    );
    return (
      <div>
        {isAuthenticated ? userLinks : gustLinks}
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(withStyles(headerLinksStyle)(HeaderLinks))
);

