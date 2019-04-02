import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import { fetchNoOfCountOfUserByMaster, fetchParticularMasterUser, fetchParticularGroup, fetchParticularMasterPhoneBook } from "../../actions/actions";
import { List, ListItem } from "material-ui/List";
import Divider from '@material-ui/core/Divider';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            userCount: [],
            usersList: [],
            groupList: [],
            phoneBook: [],
            count: ""
        };
    }

    UNSAFE_componentWillMount() {
        fetchNoOfCountOfUserByMaster(this.props.id)
            .then(data => {
                this.setState(state => {
                    state.userCount = data;
                    state.count = data.count;
                    return state;
                });
            })
            .catch(err => {
                console.error("err", err);
            });
        fetchParticularMasterUser(this.props.id)
            .then(data => {
                this.setState(state => {
                    state.usersList = data;
                    return state;
                });
            })
            .catch(err => {
                console.error("err", err);
            });

        fetchParticularGroup(this.props.id)
            .then(data => {
                this.setState(state => {
                    state.groupList = data;
                    return state;
                });
            })
            .catch(err => {
                console.error("err", err);
            });
        fetchParticularMasterPhoneBook(this.props.id)
            .then(data => {
                this.setState(state => {
                    state.phoneBook = data;
                    return state;
                });
            })
            .catch(err => {
                console.error("err", err);
            });
    }

    handleClickOpen = () => {

        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Tooltip title="Master Profile">
                    <IconButton aria-label="Master Profile" onClick={this.handleClickOpen}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Dialog
                    fullWidth={true}
                    maxWidth="sm"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {this.state.userCount.name} Profile
          </DialogTitle>
                    <DialogContent>
                        <MuiThemeProvider>
                            {this.state.userCount.map(user => {
                                return (
                                    <List key={user.id}>
                                        <ListItem
                                            primaryText="No of Users"
                                            secondaryText={user.count}
                                        />
                                    </List>
                                );

                            })}

                        </MuiThemeProvider>
                        <Divider />
                        {/* <MuiThemeProvider>
                            {this.state.usersList.map(user => {
                                return (
                                    <List key={user.id}>
                                        <ListItem
                                            primaryText="Name"
                                            secondaryText={user.name}
                                        />
                                        <ListItem
                                            primaryText="Phone Number"
                                            secondaryText={user.phoneNumber}
                                        /> <ListItem
                                            primaryText="Email"
                                            secondaryText={user.email}
                                        /> <ListItem
                                            primaryText="photoUrl"
                                            secondaryText={user.photoUrl}
                                        />
                                    </List>
                                );
                            })}
                            <Divider />
                        </MuiThemeProvider> */}

                        <MuiThemeProvider>
                            {this.state.phoneBook.map(phonebook => {
                                return (
                                    <List key={phonebook.id}>
                                        <ListItem
                                            primaryText="PhoneBookMemberName"
                                            secondaryText={phonebook.name}
                                        />
                                        <ListItem
                                            primaryText="PhoneBookMemberNumber"
                                            secondaryText={phonebook.phoneNumber}
                                        />
                                    </List>
                                );
                            })}
                            <Divider />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            {this.state.groupList.map(group => {
                                return (
                                    <List key={group.id}>
                                        <ListItem
                                            primaryText="Group Name"
                                            secondaryText={group.groupName}
                                        />
                                    </List>
                                );
                            })}
                            <Divider />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <List>
                                <ListItem
                                    primaryText="Sent"
                                    secondaryText="100" />
                                <ListItem
                                    primaryText="Success"
                                    secondaryText="50"
                                /> <ListItem
                                    primaryText="Failure"
                                    secondaryText="50"
                                /> <ListItem
                                    primaryText="Sum"
                                    secondaryText="50 %"
                                />
                            </List>
                            <Divider />
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color={this.state.color}>
                            Close
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
