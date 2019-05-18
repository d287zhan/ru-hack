import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from './bmo-logo.png';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src = {Logo} alt = "logo" />
          <Typography variant = "h5" color = "inherit" className = {classes.grow}>
                                
          </Typography>
          <Typography variant="h2" color="inherit" className={classes.grow}>
            BMO FORUM
          </Typography>
          <Button color = "inherit"> Add Card</Button>
          <Button color = "inherit">Client</Button>
          <Button color = "inherit">Employees</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);