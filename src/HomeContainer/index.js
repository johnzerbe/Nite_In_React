import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import NavBarOne from '../NavBarOne';
import Welcome from '../Welcome';
import RecipeDropDown from '../RecipeDropDown';
import MovieDropDown from '../MovieDropDown';
import RecipeContainer from '../RecipeContainer';
import MovieContainer from '../MovieContainer';
// import 'reactstrap';
import '../App.css';


const recipeAPIKey = process.env.REACT_APP_API_KEYSPOON;
const movieAPIKey = process.env.REACT_APP_API_KEYMOVIE.replace(/\W/g, '');

const booksAPI = 'https://openlibrary.org/subjects/mystery.json?limit=1';
const moviesAPI = 'https://api.themoviedb.org/3/discover/movie?with_genres=';
const recipeAPI = 'https://api.spoonacular.com/recipes/search?cuisine=';

class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            chosenRecipe: {},
            chosenRecipeInstructions: [],
            chosenRecipeIngredients: [],
            selectedCuisine: '',
            showRecipeDetails: false,
            selectedGenre: '',
            movies: [],
            chosenMovie: {},
            book: {},
            recipeReady: false,
            movieReady: false,
            page: "HomeContainer"
        }
    }

    handleSubmitRecipe = (e) => {
        e.preventDefault();
        
        let url = (`${recipeAPI}${this.state.selectedCuisine}&tag=dinner&apiKey=${recipeAPIKey}`);
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((recipes) => {
            console.log(recipes);
            let finalRecipe = Math.floor(Math.random() * recipes.results.length)

            this.setState({
                recipes: recipes.results,
                chosenRecipe: recipes.results[finalRecipe],
                recipeReady: true
            }, () => {
                console.log(this.state.chosenRecipe);
                console.log(recipes.results[finalRecipe]);
            });
            let url2 = (`https://api.spoonacular.com/recipes/${recipes.results[finalRecipe].id}/analyzedInstructions?apiKey=${recipeAPIKey}`);
            fetch(url2)
            .then(response => response.json())
            .then((instructions) => {
                // console.log(instructions[0].steps);
                this.setState({
                    chosenRecipeInstructions: instructions[0].steps
                }, () => {
                    console.log(this.state.chosenRecipeInstructions[0].step)
                });
                let url3 = (`https://api.spoonacular.com/recipes/${recipes.results[finalRecipe].id}/ingredientWidget.json?apiKey=${recipeAPIKey}`);
                fetch(url3)
                .then(response => response.json())
                .then((ingredients) => {
                    this.setState({
                        chosenRecipeIngredients: ingredients.ingredients
                    }, () => {
                        console.log(this.state.chosenRecipeIngredients)
                    })
                })
            })
        });
    };


    handleRecipeSelection = (option) => {
        console.log(option);
        this.setState({
            selectedCuisine: option.value
        });
        console.log(this.state.selectedCuisine);
    }

    handleSubmitMovie = (e) => {
        e.preventDefault();

        let url = `${moviesAPI}${this.state.selectedGenre}&api_key=${movieAPIKey}&language=en-US`;

        fetch (url)
        .then(response => response.json())
        .then((movies) => {
            console.log(movies.results);
            let finalMovie = Math.floor(Math.random() * movies.results.length)
            this.setState({
                movies: movies.results,
                chosenMovie: movies.results[finalMovie],
                movieReady: true
                // ready: true
            }, () => {
                console.log(this.state.chosenMovie)
            })
            
        })
    }

    handleMovieSelection = (option) => {
        console.log(option);
        this.setState({
            selectedGenre: option.value
        });
        console.log(this.state.selectedGenre)
    }

    handleRecipeClick = (e) => {
        this.setState((previousState) => ({
            showRecipeDetails: !previousState.showRecipeDetails
        }), () => {
            console.log(this.state.showRecipeDetails)
        })
    }

    handleLikeRecipeClick = async (e) => {
        const likedRecipe = await fetch('http://localhost:9000/favorite/recipes', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenRecipe: this.state.chosenRecipe, 
                chosenRecipeInstructions: this.state.chosenRecipeInstructions, 
                chosenRecipeIngredients: this.state.chosenRecipeIngredients
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedFavorite = await likedRecipe.json();

        console.log('parsedFavorite: ',parsedFavorite)
    };

    handleLikeMovieClick = async (e) => {
        const likedMovie = await fetch('http://localhost:9000/favorite/movies', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenMovie: this.state.chosenMovie, 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedFavorite = await likedMovie.json();

        console.log('parsedFavorite: ', parsedFavorite);
    }

    render() {
        return (
            <div className='container'>
            <NavBarOne/>
                {/* <NavBar /> */}
                {/* <div>
                 { !this.state.recipeReady || !this.state.movieReady ? <Welcome /> : null }
                </div> */}
                <div>
                    <img src='nitein_logo.png' className='logo' alt='logo'/>
                </div>
                <Grid stackable columns={4}>
                    <Grid.Column width={2}>

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <form className='recipeForm' onSubmit={this.handleSubmitRecipe} >
                                <RecipeDropDown currentState={this.props.state} handleSelection={this.handleRecipeSelection} />
                                <button type='submit'>Submit</button>
                            </form>
                        </Segment>
                        { this.state.recipeReady ?
                        <div>
                             <RecipeContainer currentState={this.state} recipe={this.state.chosenRecipe} instructions={this.state.chosenRecipeInstructions} ingredients={this.state.chosenRecipeIngredients} handleClick={this.handleRecipeClick} handleLike={this.handleLikeRecipeClick} />
                        </div>
                        : null }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <form className='movieForm' onSubmit={this.handleSubmitMovie} >
                                <MovieDropDown currentState={this.props.state} handleSelection={this.handleMovieSelection} />
                                <button type='submit'>Submit</button>
                            </form>
                        </Segment>
                        { this.state.movieReady ?
                        <div>
                             <MovieContainer movie={this.state.chosenMovie} handleLike={this.handleLikeMovieClick} /> 
                        </div>
                        : null }
                    </Grid.Column>
                    <Grid.Column width={2}>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default HomeContainer


            // // <div>
            // //     <NavBar />
            // //     <div>
            // //     { !this.state.recipeReady || !this.state.movieReady ? <Welcome /> : null }
            // //     </div>
            // //     <div>
            // //         <form className='recipeForm' onSubmit={this.handleSubmitRecipe} >
            // //             <RecipeDropDown currentState={this.props.state} handleSelection={this.handleRecipeSelection} />
            // //             <button type='submit'>Submit</button>
            // //         </form>
            // //     </div>
            // //     <div>
            // //         { this.state.recipeReady ? <RecipeContainer currentState={this.state} recipe={this.state.chosenRecipe} instructions={this.state.chosenRecipeInstructions} ingredients={this.state.chosenRecipeIngredients} handleClick={this.handleRecipeClick} /> : null }
            // //     </div>
            // //     <div>
            // //         <form className='movieForm' onSubmit={this.handleSubmitMovie} >
            // //             <MovieDropDown currentState={this.props.state} handleSelection={this.handleMovieSelection} />
            // //             <button type='submit'>Submit</button>
            // //         </form>
            // //     </div>
            // //     <div>
            // //         { this.state.movieReady ? <MovieContainer movie={this.state.chosenMovie} /> : null }
            // //     </div>
            // // </div>
            // 