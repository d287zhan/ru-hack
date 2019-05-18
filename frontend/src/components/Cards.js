import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const styles = theme => ({
  card: {
    maxWidth: 1500,
  },
  media: {
    height: 0,
    paddingTop: '1%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  upvote: {

  },
  upvoted: {
    color: "#008000",
  },
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    voted: false,
    like: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ 
      expanded: !state.expanded, 
      voted: state.voted,
      like: state.true,
    }));
  };

  handleUpVote = () => {
    this.setState(state => ({
      expanded: state.expanded,
      voted: true,
      like: !state.like,
    }));
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Name" className={classes.avatar}>
              N
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Jhon Doe's New Idea"
          subheader="May 19, 2018"
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Insert Title"
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classnames(classes.upvote, {[classes.upvoted]: this.state.like,})}
            onClick={this.handleUpVote} aria-label="Thumbs Up"
          >
          <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="Thumbs Down">
            <ThumbDownIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Description"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Topic Description:</Typography>
            <Typography paragraph>
              Enter description here ... 
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);