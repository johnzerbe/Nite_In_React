import React, { Component } from 'react';
import NavBarTwo from '../NavBarTwo';
import RecipeModal from '../RecipeModal';
import MovieModal from '../MovieModal';
import SavedForLaterMovieModal from '../SavedForLaterMovieModal';
import SavedForLaterRecipeModal from '../SavedForLaterRecipeModal';
import { Grid, Segment, Button, Icon, Image } from 'semantic-ui-react';
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Card } from 'react-bootstrap';


class UserContainer extends Component {
    constructor() {
        super();

        this.state = {
            likedRecipes: [],
            likedMovies: [],
            savedForLaterRecipes: [],
            savedForLaterMovies: [],
            showModal: false
        }
    }

    componentDidMount() {
        this.getData();
    };

    getData = async () => {
        try {
            const responseGetData = await fetch(process.env.REACT_APP_BACKEND_URL + '/favorite', {
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
                savedForLaterMovies: dataResponse.data.savedForLater.movies
            })

        } catch(err) {
            console.log('getData Error: ', err);
            return err;
        }
    };

    handleModalClick = (e) => {
        this.setState((previousState) => ({
            showModal: !previousState.showModal
        }), () => {
            console.log(this.state.showModal);
        })
    };

    handleDeleteFavorite = async (id, type, e) => {
        try {
            const itemToDelete = await fetch(process.env.REACT_APP_BACKEND_URL + `/favorite/${id}/${type}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const parsedDeletedItem = await itemToDelete.json();

            console.log('parsedDeletedItem: ', parsedDeletedItem);

            this.getData();
        } catch(err) {
            console.log('handleDelete Error: ', err);
            return err
        }
    }

    handleDeleteSaveForLater = async (id, type, e) => {
        try {
            const itemsToDelete = await fetch(process.env.REACT_APP_BACKEND_URL + `/favorite/savedForLater/${id}/${type}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const parsedDeletedItem = await itemsToDelete.json();

            console.log('SAVED FOR LATER ITEM DELETED: ', parsedDeletedItem);

            this.getData();
        } catch(err) {
            console.log('handleDelete ERROR for Saved For Later: ', err);
            return err
        }
    }


    render() {
        const likedRecipes = this.state.likedRecipes.length > 0 ?
        this.state.likedRecipes.map((recipe) => {
            return (
                <div className='userFoodResultsContainer'>
                    {/* <Card.Img className='userResultsImage' variant="top" src={`https://spoonacular.com/recipeImages/${recipe.chosenRecipe.id}-240x150`} /> */}
                    <Card.Body>
                    <RecipeModal currentState={this.props.state} recipeName={recipe.chosenRecipe.title} showModal={this.state.showModal} recipes={recipe.chosenRecipe} ingredients={recipe.chosenRecipeIngredients} steps={recipe.chosenRecipeInstructions} handleClick={this.handleModalClick} handleDelete={this.handleDeleteFavorite} handleDeleteSaveForLater={this.handleDeleteSaveForLater}/>
                
                    </Card.Body>
                </div>
            
                )}) : [];

        const likedMovies = this.state.likedMovies.length > 0 ?
        this.state.likedMovies.map((movie) => {
            return (
                <div className='userMovieResultsContainer'>
                    {/* <span className='favoriteListItem'>{movie.chosenMovie.title}</span> */}
                    {/* <Image wrapped size='small' src={`https://image.tmdb.org/t/p/w300${movie.chosenMovie.poster_path}`} /> */}
                    <MovieModal movie={movie.chosenMovie} movieName={movie.chosenMovie.title} handleDelete={this.handleDeleteFavorite}/>
                </div>
            )
        }) : [];

        const savedForLaterRecipes = this.state.savedForLaterRecipes.length > 0 ?
        this.state.savedForLaterRecipes.map((recipe) => {
            return (
                
                <div className='userFoodResultsContainer'>
                    {/* <Card.Img className='userResultsImage' variant="top" src={`https://spoonacular.com/recipeImages/${recipe.chosenRecipe.id}-240x150`} /> */}
                    <Card.Body>
                    <SavedForLaterRecipeModal currentState={this.props.state} recipeName={recipe.chosenRecipe.title} showModal={this.state.showModal} recipes={recipe.chosenRecipe} ingredients={recipe.chosenRecipeIngredients} steps={recipe.chosenRecipeInstructions} handleClick={this.handleModalClick} handleDeleteSaveForLater={this.handleDeleteSaveForLater} />
                    </Card.Body>
                </div>
                    
                
            )
        }) : [];

        const savedForLaterMovies = this.state.savedForLaterMovies.length > 0 ?
        this.state.savedForLaterMovies.map((movie) => {
            return (
                <div className='userMovieResultsContainer'>
                    {/* <Image wrapped size='small' className='userImages' src={`https://image.tmdb.org/t/p/w300${movie.chosenMovie.poster_path}`} /> */}
                    <SavedForLaterMovieModal movie={movie.chosenMovie} movieName={movie.chosenMovie.title} handleDeleteSaveForLater={this.handleDeleteSaveForLater}/>
                </div>
            )
        }) : [];

        return (
            <div>
            <NavBarTwo/>

                <h1 className='appName'>My Nites</h1>
                <Grid stackable columns={4}>
                    <Grid.Column width={1}>

                    </Grid.Column>
                    <Grid.Column width={14} className='resultsContainer'>
                    <div className='userRecipes'>
                    <Segment className='likedFoodResults'>
                        <h3 className='favoriteFoodListItem'>LIKED RECIPES</h3>
                        {/* <Grid stackable columns={2}> */}
                        <Grid className='topLayerGradient' stackable columns={2}>
                        
                            {likedRecipes.length > 0 ? likedRecipes : null}
                        
                        </Grid>
                        {/* </Grid> */}
                    </Segment>
                    <Segment className='laterFoodResults'>
                        <h3 className='favoriteFoodListItem'>YET TO TRY</h3>
                        <Grid className='topLayerGradient' stackable columns={2}>
                            { savedForLaterRecipes.length > 0 ? savedForLaterRecipes : null }
                        </Grid>
                    </Segment>
                    </div>
                    {/* </Grid.Column>
                    <Grid.Column width={7} className='resultsContainer'> */}
                    <Segment className='likedMovieResults'>
                        <h3 className='favoriteListItem'>MY FAVORITE MOVIES</h3>
                        <Grid className='topLayerGradient' stackable columns={2}>
                            {likedMovies.length > 0 ? likedMovies : null }
                        </Grid>
                    </Segment>
                    <Segment className='laterMovieResults'>
                        <h3 className='favoriteListItem'>WATCH LIST</h3>
                        <Grid className='topLayerGradient' stackable columns={2}>
                            { savedForLaterMovies.length > 0 ? savedForLaterMovies : null }
                        </Grid>
                    </Segment>
                    </Grid.Column>
                    <Grid.Column width={1}>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default UserContainer