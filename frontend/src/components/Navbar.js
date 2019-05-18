import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from './bmo-logo.png';
import { Link } from "react-router-dom";

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
  title: {
    marginLeft: 15,
  },
  navButton: {
    textDecoration: 'none',
    color: "#FFFFFF",
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src = {Logo} alt = "logo" />
          <Typography variant = "h5" color = "inherit" className={classes.title}>
            BMO Community         
        </Typography>
          <Typography variant = "h5" color = "inherit" className = {classes.grow}>
                                
          </Typography>
          {/* <Typography variant="h2" color="inherit" className={classes.grow}>
            BMO FORUM
          </Typography> */}
          <Link to="/" className={classes.navButton}>
            <Button color = "inherit"> Home </Button>
          </Link>
          <Link to="/stories" className={classes.navButton}>
            <Button color = "inherit"> Community </Button>
          </Link>
          <Link to="/addstory" className={classes.navButton}>
            <Button color = "inherit"> Add Suggestion </Button>
          </Link>
          <Link to="/login" className={classes.navButton}>
            <Button color="inherit"> Login </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);