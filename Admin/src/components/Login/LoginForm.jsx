import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { grey500, white } from 'material-ui/styles/colors';
import Help from 'material-ui/svg-icons/action/help';
import ThemeDefault from '../../theme-default';
import red from '@material-ui/core/colors/red';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
const styles = {
  errorMessage: {
    color: red[800],
  },
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#4f81e9'
  },
  btnGoogle: {
    background: '#e14441'
  },
  btnSpan: {
    marginLeft: 5
  },
};

class LoginForm extends Component {
  state = {
    identifier: '',
    password: '',
    errors: {},
    isLoading: false
  };
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        // (res) => this.context.router.push('/dashboard/Home'),
        (res) => this.context.router.history.push('/dashboard/Home'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {

    const { identifier, password, errors, isLoading } = this.state;
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form onSubmit={e => this.onSubmit(e)}>
                <h4 align="center" style={{ color: "#2196F3" }}>Login</h4>

                {errors.form && <div style={{ color: 'red' }} className="alert alert-danger" >{errors.form}</div>}

                <TextFieldGroup
                  field="identifier"
                  label="Username / Email"
                  value={identifier}
                  error={errors.identifier}
                  onChange={this.onChange}
                />

                <br />
                <TextFieldGroup
                  field="password"
                  label="Password"
                  value={password}
                  error={errors.password}
                  onChange={this.onChange}
                  type="password"
                />
                <br />

                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                />

                <RaisedButton
                  label="Submit"
                  primary={true}
                  disabled={isLoading}
                  type="submit"
                />
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <FlatButton
                label="Forgot Password?"
                href="/resetPassword"
                style={styles.flatButton}
                icon={<Help />}
              />

            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  };
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  muiTheme: PropTypes.object
}

export default connect(null, { login })(LoginForm);
