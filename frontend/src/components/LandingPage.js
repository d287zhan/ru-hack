import React from 'react';
import bg from './splash.jpg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Center from 'react-center'
import { Link } from "react-router-dom";


const styles = {
    paperContainer: {
        backgroundImage: `url(${bg})`,
        opacity: 0.8,
        height: window.innerHeight - 64,
    },

    Inspiration: {
        paddingTop: 160,
        textDecoration: 'none',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: '75px',
    },

    Inspiration2: {
        paddingTop: 10,
        textDecoration: 'none',
        textDecorationUnderline: 'none',
        justifyContent: 'center',
        color: '#FF0000',
        fontSize: '75px',
    },
};

export default class LandingPage extends React.Component {
    render() {
        return (
            <Paper style={styles.paperContainer}>
                <Typography style={styles.Inspiration}>
                    <Center>
                        YOUR IDEAS MATTER
                    </Center>
                </Typography>
                <Link to="/stories">
                    <Typography style={styles.Inspiration2}>
                        <Center>
                            HERE
                        </Center>
                    </Typography>
                </Link>

            </Paper>

        )
    }
}