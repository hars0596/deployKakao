import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { fetchMasterProfile } from "../../actions/actions";
import { prepareUrl } from "../../actions/api";


class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      masters: {
        name: "",
        phoneNumber: "",
        photoUrl: "",
        email: "",
        password: ""
      }
    };
  }

  UNSAFE_componentWillMount() {
    // this.handleClickOpen();
    // this.handleSubmit();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    fetchMasterProfile(this.props.id)
      .then(data => {
        this.setState(state => {
          state.masters = data;
          state.name = data.name;
          return state;
        });
      })
      .catch(err => {
        console.error("err", err);
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSubmit = e => {

    console.log(this.state);
    var result = window.confirm("Do you Really Want to Submit");
    if (result === true) {
      fetch(prepareUrl(`kakaoMaster/${this.props.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: this.state.masters.name,
          phoneNumber: this.state.masters.phoneNumber,
          password: this.state.masters.password,
          photoUrl: this.state.masters.photoUrl,
          email: this.state.masters.email
        })
      });

      this.setState({ open: false });
      window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <Tooltip title="Edit Profile">
          <IconButton aria-label="Edit Profile" onClick={this.handleClickOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.name} Profile
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText> */}
            <TextField
              value={this.state.masters.name}
              id="standard-with-placeholder"
              label="Name"
              placeholder="Name"
              margin="normal"
              type="text"
              onChange={e =>
                this.setState({
                  masters: {
                    ...this.state.masters,
                    name: e.target.value
                  }
                })
              }
            />

            <br />
            <TextField
              type="text"
              value={this.state.masters.photoUrl}
              onChange={e =>
                this.setState({
                  masters: {
                    ...this.state.masters,
                    photoUrl: e.target.value
                  }
                })
              }
              id="standard-with-placeholder"
              label="photo"
              placeholder="photo"
              margin="normal"
            />
            <br />

            <TextField
              value={this.state.masters.email}
              onChange={e =>
                this.setState({
                  masters: {
                    ...this.state.masters,
                    email: e.target.value
                  }
                })
              }
              // id="standard-with-placeholder"
              label="Email"
              // placeholder="Email"
              margin="normal"
            />

            <br />
            {/* <TextField
              value={this.state.masters.password}
              onChange={e =>
                this.setState({
                  masters: {
                    ...this.state.masters,
                    password: e.target.value
                  }
                })
              }
              id="standard-with-placeholder"
              label="password"
              placeholder="password"
              margin="normal"
            /> */}

            {/* <br /> */}
            <TextField
              type="text"
              value={this.state.masters.phoneNumber}
              onChange={e =>
                this.setState({
                  masters: {
                    ...this.state.masters,
                    phoneNumber: e.target.value
                  }
                })
              }
              id="standard-with-placeholder"
              label="phoneNumber"
              placeholder="phoneNumber"
              margin="normal"
            />
            <br />
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color={this.state.color}>
              Close
            </Button>
            <Button onClick={this.handleSubmit} color={this.state.color}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default FormDialog;
