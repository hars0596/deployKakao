import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import { fetchMasterProfile } from "../../actions/actions";
import { List, ListItem } from "material-ui/List";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import moment from "moment";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      customers: []
    };
  }

  componentDidMount() {
    fetchMasterProfile(this.props.id)
      .then(data => {
        this.setState(state => {
          state.customers = data;
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
            {this.state.customers.name} Profile
          </DialogTitle>
          <DialogContent>

            <MuiThemeProvider>
              <List>
                <ListItem
                  primaryText="Name"
                  secondaryText={this.state.customers.name}
                />
                <ListItem
                  primaryText="photoUrl"
                  secondaryText={this.state.customers.photoUrl}
                />
                <ListItem
                  primaryText="Email"
                  secondaryText={this.state.customers.email}
                />
                <ListItem
                  primaryText="Phone Number"
                  secondaryText={this.state.customers.phoneNumber}
                />
                <ListItem
                  primaryText="Registered on"
                  secondaryText={moment(this.state.customers.createdAt).format(
                    "DD/MM/YYYY"
                  )}
                />
              </List>

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
