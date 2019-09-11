import React, { Component } from 'react';
import NavBarTwo from '../NavBarTwo';
import UserLikedRecipes from '../UserLikedRecipes';
import RecipeModal from '../RecipeModal';
import MovieModal from '../MovieModal';
import { Grid, Segment } from 'semantic-ui-react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class UserContainer extends Component {
    constructor() {
        super();

        this.state = {
            likedRecipes: [],
            likedMovies: [],
            savedForLaterRecipes: [],
            savedForLaterMovies: [],
            showRecipeModal: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            const responseGetData = await fetch('http://localhost:9000/favorite', {
                method: 'GET',
                credentials: 'include'
            });
            console.log('responseGetData: ', responseGetData);
            if(responseGetData.status !== 200) {
                throw Error('404 From Server')
            }
            const dataResponse = await responseGetData.json();
            console.log('dataResponse: ', dataResponse);
            this.setState({
                likedRecipes: dataResponse.data.favorites.recipes,
                likedMovies: dataResponse.data.favorites.movies,
                savedForLaterRecipes: dataResponse.data.savedForLater.recipes,
                savedForLaterRecipes: dataResponse.data.savedForLater.movies
            })

        } catch(err) {
            console.log('getData Error: ', err);
            return err;
        }
    }

    handleRecipeClick = (e) => {
        this.setState((previousState) => ({
            showRecipeModal: !previousState.showRecipeModal
        }), () => {
            console.log(this.state.showRecipeModal);
        })
    }


    render() {
        const likedRecipes = this.state.likedRecipes.length > 0 ?
        this.state.likedRecipes.map((recipe) => {
            return (
            <li>
                <span className='favoriteListItem'>{recipe.chosenRecipe.title}</span>
                <RecipeModal recipes={recipe.chosenRecipe} ingredients={recipe.chosenRecipeIngredients} steps={recipe.chosenRecipeInstructions} handleClick={this.handleRecipeClick} />
            </li>
        )}) : [];

        const likedMovies = this.state.likedRecipes.length > 0 ?
        this.state.likedMovies.map((movie) => {
            return (
                <li>
                    <span className='favoriteListItem'>{movie.chosenMovie.title}</span>
                    <MovieModal movie={movie.chosenMovie} />
                </li>
            )
        }) : [];

        return (
            <div>
            <NavBarTwo/>

                <h1 className='userPageTitle'>My Nites</h1>
                <Grid stackable columns={2}>
                    <Grid.Column>
                    <h1>Food</h1>
                    <Segment>
                        <h3>Liked Recipes</h3>
                        <Grid stackable columns={2}>
                        <ul className='userList'>
                            {likedRecipes.length > 0 ? likedRecipes : null}
                        </ul>
                        </Grid>
                    </Segment>
                    <Segment>
                        <h3>Saved for Later</h3>
                    </Segment>
                    </Grid.Column>
                    <Grid.Column>
                    <h1>Movies</h1>
                    <Segment>
                        <h3>Liked Movies</h3>
                        <ul className='userList'>
                            {likedMovies.length > 0 ? likedMovies : null }
                        </ul>
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