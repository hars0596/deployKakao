import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableRow, TableHead, Paper } from "@material-ui/core";
import { fetchMasterList } from "../../components/actions/actions"
import ViewUser from "../../components/modal/UserModals/viewNoListOfUser"


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 100
  }
});
class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "Publish Event",
      holidays: [],
      holiday: "holidays",
      open: false,
      holidayId: 0,
      masters: []
    };
  }

  UNSAFE_componentWillMount() {
    fetchMasterList()
      .then(data => {
        this.setState(state => {
          state.masters = data;
          return state;
        });
      })
      .catch(err => {
        console.error("err", err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Actions</TableCell>
                {/* <TableCell align="right">Protein (g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.masters.map(master => {
                return (
                  <TableRow key={master.id}>
                    <TableCell component="th" scope="row">
                      {master.id}
                    </TableCell>
                    <TableCell align="right">
                      {master.name}
                    </TableCell>
                    <TableCell align="right">{master.email}</TableCell>
                    <TableCell align="right">{master.phoneNumber}</TableCell>
                    <TableCell align="right" className={classes.table}>
                      {/* <EditUser id={master.id} /> */}
                      <ViewUser id={master.id} />
                      {/* <DeleteUser pId={master.id} />*/}

                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>

        </Paper>
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
