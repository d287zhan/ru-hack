import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import TitleIcon from "@material-ui/core/TitleIcon";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },                                                                                                                                                   
});

class AddStory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: null,
            author: null,
            description: null,
            redirect: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            story_title: this.state.title,
            story_description: this.state.description,
            story_author: this.state.author,
            story_date: null,
            story_likes: 0,
            story_dislikes: 0
            };
        axios.post('http://localhost:4000/stories/add', obj)
        .then(res => console.log(res.data))
        .then(() =>{
            this.setState({
                title: "",
                author: "",
                description: "",
                redirect: true,
            });
        })
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value,
            author: this.state.author,
            description: this.state.description,
            redirect: false,
        });
    }

    handleAuthor = (e) => {
        this.setState({
            title: this.state.title,
            author: e.target.value,
            description: this.state.description,
            redirect: false,
        });
    }

    handleDescription = (e) => {
        this.setState({
            title: this.state.title,
            author: this.state.author,
            description: e.target.value,
            redirect: false,
        });
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/stories" />
        }
        const { handleSubmit, classes } = this.props;
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        <TextField id="outlined-title" label="Title" className={classes.textField} 
                        margin="normal" variant="outlined" value={this.state.title} onChange={this.handleTitle} />
                    </label>
                </div>
                <div>
                    <label>
                    <TextField id="outlined-author" label="Author" className={classes.textField} 
                        margin="normal" variant="outlined" value={this.state.author} onChange={this.handleAuthor} />
                    </label>
                </div>
                <div>
                    <label>
                    <TextField multiline='true' rowsMax='5' style={{width: '90%'}} id="outlined-description" label="Description" className={classes.textField} 
                        margin="normal" variant="outlined" value={this.state.description} onChange={this.handleDescription} />
                    </label>
                </div>
                {/* <input type="submit" value="Submit" /> */}
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    type="submit"
                    >
                        Submit
                </Fab>
            </form>
          </div>
        );
    }
}


AddStory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddStory);