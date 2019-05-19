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
import TextField from "@material-ui/core/TextField";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  card: {
    maxWidth: 1500,
  },
  trashbox: {
    marginLeft: 50,
    margin: theme.spacing.unit,
    fontSize: 32,
    "&:hover":{
      backgroundColor: "#D3D3D3",
    },

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
    backgroundColor: "#B22222",
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
  },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class RecipeReviewCard extends React.Component {
  state = { 
    expanded: false,
    voted: false,
    like: null,
    dislike: null,
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
    if(this.state.like != null && this.state.like){
      this.props.story.story_likes-=1;
    }else if(this.state.dislike && !this.state.like){
      this.props.story.story_likes+=1;
      this.props.story.story_dislikes-=1;
    }else if(this.state.like == null || this.state.dislike || !this.state.like){
      this.props.story.story_likes+=1;
    }
    this.setState(state => ({
      expanded: state.expanded,
      voted: state.like || state.dislike,
      like: !state.like,
      dislike: false,
    }));
    this.handleVote();
  };

  handleDownVote = () => {
    if(this.state.dislike != null && this.state.dislike){
      this.props.story.story_dislikes-=1;
    }else if(this.state.like && !this.state.dislike){
      this.props.story.story_dislikes+=1;
      this.props.story.story_likes-=1;
    }else if(this.state.dislike == null || this.state.like || !this.state.dislike){
      this.props.story.story_dislikes+=1;
    }
    this.setState(state => ({
      expanded: state.expanded,
      voted: state.like || state.dislike,
      like: false,
      dislike: !state.dislike,
    }));
    this.handleVote();
  }

  handleDelete = () => {
    axios.post('http://localhost:4000/stories/delete/'+this.props.story._id)
    .then(res => console.log(res.data));
    window.location.reload();
  }


  render() {
    const { classes } = this.props;
    console.log(this.props.story.story_title);
    return (
      <Card className={classes.card}>
        <div>
            <Grid container spacing = {12}>
              <Grid item xs={11}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Name" className={classes.avatar}>
                      {this.props.story.story_author.substring(0,1).toUpperCase()}
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
              </Grid>
              <Grid item xs={1}>
                <DeleteOutlinedIcon onClick={this.handleDelete} className={classes.trashbox} />
              </Grid>
            </Grid>
        </div>

        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Insert Title"
        /> */}
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
            <TextField  disabled='true' multiline='true' style={{width: '90%'}} id="outlined-description" label="Description" className={classes.textField} 
                        margin="normal" variant="outlined" value={this.props.story.story_description} />
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