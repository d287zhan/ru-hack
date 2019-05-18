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
import axios from 'axios';



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
  downvote:{

  },
  downvoted: {
    color: "#FF0000"
  },
  votes:{
    marginLeft: '10%',
  }
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    voted: false,
    like: false,
    dislike: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ 
      expanded: !state.expanded, 
      voted: state.voted,
      like: state.like,
      dislike: state.dislike,
    }));
  };

  handleVote(){
    const obj = {
      story_title: this.props.story.story_title,
      story_description: this.props.story.story_description,
      story_author: this.props.story.story_author,
      story_date: this.props.story.story_date,
      story_likes: this.props.story.story_likes,
      story_dislikes: this.props.story.story_dislikes
    };
    console.log(obj);
    axios.post('http://localhost:4000/stories/update/'+this.props.story._id, obj)
    .then(res => console.log(res.data));
  }

  handleUpVote = () => {
    this.setState(state => ({
      expanded: state.expanded,
      voted: true,
      like: true,
      dislike: false,
    }));
    this.props.story.story_likes+=1;
    this.handleVote();
  };

  handleDownVote = () => {
    this.setState(state => ({
      expanded: state.expanded,
      voted: true,
      like: false,
      dislike: true
    }));
    this.props.story.story_dislikes+=1;
    this.handleVote();
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.story.story_title);
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Name" className={classes.avatar}>
              N
            </Avatar>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title= {this.props.story.story_title}
          subheader={this.props.story.story_author}
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
          <Typography className={classes.votes}> {this.props.story.story_likes} </Typography>
          </IconButton>
          
          <IconButton className={classnames(classes.downvote, {[classes.downvoted]: this.state.dislike,})}
            onClick={this.handleDownVote} aria-label="Thumbs Down"
          >
            <ThumbDownIcon />
            <Typography className={classes.votes}> {this.props.story.story_dislikes} </Typography>
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
            {/* <Typography paragraph>Topic Description:</Typography> */}
            <Typography paragraph>
              {this.props.story.story_description} 
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