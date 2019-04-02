import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import validateInput from '../../shared/validations/resetPasswordValidate';
import { grey500 } from 'material-ui/styles/colors';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";
import TextFieldGroup from '../../components/common/TextFieldGroup';
import PropTypes from 'prop-types';
import { prepareUrl } from "../../components/actions/api"
import ThemeDefault from '../../theme-default';
import Button from "../../components/CustomButtons/Button.jsx";
const styles = {

    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        // top: '20%',
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
};
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bl: false,
            password: '',
            passwordConformation: '',
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
        const token = localStorage.getItem("jwtToken");
        if (this.isValid()) {
            fetch(prepareUrl("kakaoMaster/resetAdminPassword"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: this.state.password,
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
    }

    render() {
        const { errors } = this.state;

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div style={styles.loginContainer}>

                    <Paper style={styles.paper}>
                        <form onSubmit={e => this.onSubmit(e)}>

                            <h4 align="center" style={{ color: "#FF5628" }}>Reset Password</h4>

                            <TextFieldGroup
                                type="password"
                                error={errors.password}
                                label="New Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                field="password"
                            />
                            <br />
                            <TextFieldGroup
                                type="password"
                                error={errors.passwordConformation}
                                label="Confirm Password"
                                onChange={this.onChange}
                                value={this.state.passwordConformation}
                                field="passwordConformation"
                            />
                            <br />

                            <Button disabled={this.state.isLoading || this.state.invalid} variant="contained" color="primary" type="submit">Submit</Button>
                            <Snackbar
                                place="bl"
                                color="info"
                                icon={AddAlert}
                                message="Application Submitted  Successfully"
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

ResetPassword.contextTypes = {
    router: PropTypes.object.isRequired
}

export default ResetPassword;
