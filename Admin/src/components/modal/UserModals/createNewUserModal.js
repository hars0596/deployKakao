import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import validateInput from "../../../shared/validations/validateUsers";
import { prepareUrl } from "../../actions/api";


class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bl: false,
      open: false,
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      photoUrl: "",
      errors: {}
    };
    this.isValid = this.isValid.bind(this);
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  UNSAFE_componentWillMount() {
    // this.handleSubmit();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
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


  handleSubmit = e => {
    // e.preventDefault();
    // console.log(e);

    if (this.isValid()) {
      const token = localStorage.getItem("jwtToken");
      var result = window.confirm("Do you Really Want To create This User?");
      if (result === true) {
        console.log(this.state);
        fetch(prepareUrl("kakaoMaster/masterCreate"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            photoUrl: this.state.photoUrl
          })
        });
        this.setState({ open: false });
        window.location.reload();
      }
    }
  };

  render() {
    return (
      <div>
        {/* <Fab color="primary" aria-label="Add" flex="1">
          <AddIcon onClick={this.handleClickOpen} />
        </Fab> */}
        <IconButton >
          <AddIcon onClick={this.handleClickOpen} />
        </IconButton>
        <Dialog
          maxWidth="sm"
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Master</DialogTitle>
          <DialogContent>

            <TextField
              value={this.state.photoUrl}
              onChange={e =>
                this.setState({
                  photoUrl: e.target.value
                })
              }
              id="standard-with-placeholder"
              label="photoUrl"
              placeholder="photoUrl"
              margin="normal"
            />

            {this.state.errors.photoUrl && (
              <span style={{ color: "red" }}>{this.state.errors.photoUrl}</span>
            )}
            <br />
            <TextField
              value={this.state.name}
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
              id="standard-with-placeholder"
              label="Name"
              placeholder="Name"
              margin="normal"
            />

            {this.state.errors.name && (
              <span style={{ color: "red" }}>{this.state.errors.name}</span>
            )}
            <br />
            <TextField
              value={this.state.password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
              id="standard-with-placeholder"
              label="password"
              placeholder="password"
              margin="normal"
            />

            {this.state.errors.password && (
              <span style={{ color: "red" }}>
                {this.state.errors.password}
              </span>
            )}
            <br />
            <TextField
              value={this.state.email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              id="standard-with-placeholder"
              label="email"
              placeholder="email"
              margin="normal"
            />

            {this.state.errors.email && (
              <span style={{ color: "red" }}>{this.state.errors.email}</span>
            )}
            <br />
            <TextField
              value={this.state.phoneNumber}
              onChange={e =>
                this.setState({
                  phoneNumber: e.target.value
                })
              }
              id="standard-with-placeholder"
              label="phone Number"
              placeholder="phone Number"
              margin="normal"
            />

            {this.state.errors.phoneNumber && (
              <span style={{ color: "red" }}>
                {this.state.errors.phoneNumber}
              </span>
            )}
            <br />


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color={this.state.color}>
              Cancel
            </Button>

            <Button onClick={this.handleSubmit} color={this.state.color}>
              Create Master
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;
