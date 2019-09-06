import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

class UserContainer extends Component {
    constructor() {
        super();

        this.state = {
            likedRecipes: [],
            likedMovies: [],
            recipesToTry: [],
            moviesToWatch: []
        }
    }
    render() {
        return (
            <Grid stackable columns={2}>
                <Grid.Column>
                <h1>Food</h1>
                <Segment>
                    <h3>Liked Recipes</h3>
                </Segment>
                <Segment>
                    <h3>Saved for Later</h3>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <h1>Movies</h1>
                <Segment>
                    <h3>Liked Movies</h3>
                </Segment>
                <Segment>
                    <h3>Saved for Later</h3>
                </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserContainer