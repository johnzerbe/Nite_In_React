import React, { Component } from 'react';
import NavBarTwo from '../NavBarTwo';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class UserContainer extends Component {
    constructor() {
        super();

        this.state = {
            likedRecipes: [],
            likedMovies: [],
            recipesToTry: [],
            moviesToWatch: [],
            page: 'UserContainer'
        }
    }
    render() {
        return (
            <div>
            <NavBarTwo/>
                {/* <Link to='/home'>
                    <img className='logoLink' src='nitein_logo.png' alt='logo' />
                </Link> */}

                <h1 className='userPageTitle'>My Nites</h1>
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
            </div>
        )
    }
}

export default UserContainer