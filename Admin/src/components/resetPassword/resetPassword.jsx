

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import validateInput from '../../shared/validations/signup';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500 } from 'material-ui/styles/colors';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import ThemeDefault from '../../theme-default';
const styles = {

    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        // top: '20%',
        left: 0,
        right: 0,
        margin: 'auto',
        paddingTop: 50
    },
    paper: {
        padding: 20,
        overflow: 'auto',
        paddingTop: 30
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10
    },
    flatButton: {
        color: grey500
    },
}
class ResetPasswordForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bl: false,
            email: '',
            errors: {},
            isLoading: false,
            invalid: false,
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid = () => {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }
    showNotification = (place) => {
        var x = [];
        x[place] = true;
        this.setState(x);
        this.alertTimeout = setTimeout(
            function () {
                x[place] = false;
                this.setState(x);
            }.bind(this),
            6000
        );
    }

    onSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8088/kakaoMaster/resetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
            })
        }).then(
            () => {
                this.showNotification("bl");
                return (setTimeout(() => this.context.router.history.push('/')
                    , 1000)
                )
            },
            (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }


    render() {
        const { errors } = this.state;
        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div style={styles.loginContainer}>

                    <Paper style={styles.paper}>
                        <form onSubmit={e => this.onSubmit(e)}>

                            <h4 align="center" style={{ color: "#00BCD4" }}>Reset Password</h4>
                            <TextFieldGroup
                                error={errors.email}
                                label="Email"
                                onChange={this.onChange}
                                value={this.state.email}
                                field="email"
                            />

                            <br />

                            {/* <div style={styles.buttonsDiv}> */}
                            <FlatButton
                                label="Sign in instead"
                                href="/"
                                primary={true}
                            // style={styles.flatButton}              
                            />
                            <RaisedButton
                                label="Submit"
                                primary={true}
                                disabled={this.state.isLoading || this.state.invalid}
                                type="submit"
                            // onClick={() => this.showNotification("bl")}
                            />
                            <Snackbar
                                place="bl"
                                color="info"
                                icon={AddAlert}
                                message="Redirecting To login Screen"
                                open={this.state.bl}
                                closeNotification={() => this.setState({ bl: false })}
                                close
                            />
                        </form>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}



ResetPasswordForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default ResetPasswordForm;
