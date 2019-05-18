import React from 'react';
import Card from './Cards';
import axios from 'axios';

class Stories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/stories/')
            .then(response => {
                this.setState({ stories: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    storyList() {
        return this.state.stories.map((currentStory, i) => {
            return <Card story={currentStory} key={i} />
        })
    }

    render(){
        return(
            <div>
                {this.storyList()}
            </div>
        );
    }
}

export default Stories;