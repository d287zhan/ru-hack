import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Stories from "./Stories";
import LandingPage from './LandingPage';
import Login from './Login';
import AddStory from './AddStory';

const Main = () => (
    <div>
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/stories" component={Stories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/addstory" component={AddStory} />
    </Switch>
    </div>
)

export default Main;