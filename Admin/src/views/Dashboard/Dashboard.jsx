import React, { Component } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    Width: 900
  },
  media: {
    height: 140
  }
};
class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
          {/* <Tabs /> */}
        </CardContent>
      </Card>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Dashboard);
