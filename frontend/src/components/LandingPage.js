import React from 'react';
import bg from './splash.jpg';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '@material-ui/core';

const styles = {
    paperContainer: {
        backgroundImage: `url(${bg})`,
        height: window.innerHeight - 64,
    },
};

export default class LandingPage extends React.Component{
    render(){
        return(
            <Paper style={styles.paperContainer}>
            </Paper>
        )
    }
}