import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import NavBarOne from '../NavBarOne';
import Welcome from '../Welcome';
import RecipeDropDown from '../RecipeDropDown';
import MovieDropDown from '../MovieDropDown';
import RecipeContainer from '../RecipeContainer';
import MovieContainer from '../MovieContainer';
import { Button } from 'semantic-ui-react';
// import 'reactstrap';
import '../App.css';


const recipeAPIKey = process.env.REACT_APP_API_KEYSPOON;
const movieAPIKey = process.env.REACT_APP_API_KEYMOVIE;

const booksAPI = 'https://openlibrary.org/subjects/mystery.json?limit=1';
const moviesAPI = 'https://api.themoviedb.org/3/discover/movie?with_genres=';
const recipeAPI = 'https://api.spoonacular.com/recipes/search?cuisine=';

class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showJumbo: true,
            recipes: [],
            chosenRecipe: {},
            chosenRecipeInstructions: [],
            chosenRecipeIngredients: [],
            recipeImages: '',
            selectedCuisine: '',
            selectedDietOption: '',
            showRecipeDetails: false,
            showRecipeButton: 'uncenteredRecipeButton',
            selectedGenre: '',
            movies: [],
            chosenMovie: {},
            book: {},
            recipeReady: false,
            movieReady: false,
        }
    }

    handleGotIt = (e) => {
        this.setState({
            showJumbo: false
        })
    }

    handleSubmitRecipe = (e) => {
        e.preventDefault();
        
        let url = (`${recipeAPI}${this.state.selectedCuisine}&diet=${this.state.selectedDietOption}&tag=dinner&apiKey=${recipeAPIKey}`);
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
                if(instructions[0]){
                    this.setState({
                        chosenRecipeInstructions: instructions[0].steps
                    }, () => {
                        console.log(this.state.chosenRecipeInstructions[0].step)
                    });
                }
                // console.log(instructions[0].steps);
                
                let url3 = (`https://api.spoonacular.com/recipes/${recipes.results[finalRecipe].id}/ingredientWidget.json?apiKey=${recipeAPIKey}`);
                fetch(url3)
                .then(response => response.json())
                .then((ingredients) => {
                    this.setState({
                        chosenRecipeIngredients: ingredients.ingredients
                    }, () => {
                        console.log(this.state.chosenRecipeIngredients)
                    });
                    // fetch(`https://spoonacular.com/recipeImages/${this.state.chosenRecipe.id}-312x231`, {
                    //     method: 'GET',
                        
                    // })
                    // .then((response) => {
                    //     return response.text();
                    // })
                    // .then((data) => {
                    //     this.setState({
                    //         recipeImages: JSON.parse(data)
                    //     })
                    // })
                    
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

    handleOptionChange = (option) => {
        console.log(option.target.value);
        this.setState({
            selectedDietOption: option.target.value
        })
    }

    handleSubmitMovie = (e) => {
        e.preventDefault();

        let url = `${moviesAPI}${this.state.selectedGenre}&api_key=${movieAPIKey.replace(/\W/g, '')}&language=en-US`;

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
            console.log(this.state.showRecipeDetails);
            this.showRecipeButton();
        })
    }

    showRecipeButton = () => {
        const css = this.state.showRecipeDetails ? 'centeredRecipeButton' : 'uncenteredRecipeButton'
        this.setState({
            showRecipeButton: css
        })
    }

    handleLikeRecipeClick = async (e) => {
        const likedRecipe = await fetch(process.env.REACT_APP_BACKEND_URL + '/favorite/recipes', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenRecipe: this.state.chosenRecipe, 
                chosenRecipeInstructions: this.state.chosenRecipeInstructions, 
                chosenRecipeIngredients: this.state.chosenRecipeIngredients
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://nitein3.herokuapp.com'
            }
        });

        // const parsedFavorite = await likedRecipe.json();

        console.log('parsedFavorite: ',likedRecipe)
    };

    handleLikeMovieClick = async (e) => {
        const likedMovie = await fetch(process.env.REACT_APP_BACKEND_URL + '/favorite/movies', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenMovie: this.state.chosenMovie, 
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://nitein3.herokuapp.com'
            }
        });

        const parsedFavorite = await likedMovie.json();

        console.log('parsedFavorite: ', parsedFavorite);
    }

    handleSavedForLaterRecipe = async (e) => {
        const savedRecipe = await fetch(process.env.REACT_APP_BACKEND_URL + '/favorite/savedforlater/recipes', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenRecipe: this.state.chosenRecipe, 
                chosenRecipeInstructions: this.state.chosenRecipeInstructions, 
                chosenRecipeIngredients: this.state.chosenRecipeIngredients
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://nitein3.herokuapp.com'
            }
        });

        console.log('savedRecipe: ', savedRecipe);

        const parsedSavedRecipe = await savedRecipe.json();

        console.log('parsedSavedRecipe: ', parsedSavedRecipe);
    }

    handleSavedForLaterMovie = async (e) => {
        const savedMovie = await fetch(process.env.REACT_APP_BACKEND_URL + '/favorite/savedforlater/movies', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                chosenMovie: this.state.chosenMovie,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://nitein3.herokuapp.com'
            }
        });

        const parsedSavedMovie = await savedMovie.json();

        console.log('parsedSavedMovie: ', parsedSavedMovie);
    }

    render() {
        return (
            <div className='container'>
            <NavBarOne/>
                {/* <NavBar /> */}
                {/* <div>
                 { !this.state.recipeReady || !this.state.movieReady ? <Welcome /> : null }
                </div> */}
                
                <div className='titleDiv'>
                    {/* <img src='nitein_logo.png' className='logo' alt='logo'/> */}
                    <h1 className='appName'>NiteIn</h1>
                </div>
                {/* <div>
                 <Welcome handleClick={this.handleGotIt}/>
                 <Button onClick={this.handleGotIt}>Got It!</Button>
                 </div> */}
                <Grid className='everything' stackable columns={4}>
                    <Grid.Column width={2}>
                    
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment className='dropForm'>
                            <form className='recipeForm' onSubmit={this.handleSubmitRecipe} >
                            <label className='radioBtn'>
                            <input className='dietInput' type='radio' name='diet' value='' checked={this.state.selectedDietOption === ""} onChange={this.handleOptionChange}/>
                            no restrictions
                            </label>
                            <label className='radioBtn'>
                            <input  className='dietInput' type='radio' name='diet' value='vegetarian' checked={this.state.selectedDietOption === "vegetarian"} onChange={this.handleOptionChange}/>
                            vegetarian
                            </label>
                            <label className='radioBtn'>
                            <input className='dietInput' type='radio' name='diet' value='vegan' checked={this.state.selectedDietOption === "vegan"} onChange={this.handleOptionChange}/>
                            vegan
                            </label>
                                <RecipeDropDown currentState={this.props.state} handleSelection={this.handleRecipeSelection} />
                                <Button className='searchBtn' type='submit'>Bon Appétit</Button>
                            </form>
                        </Segment>
                        { this.state.recipeReady ?
                        <div>
                             <RecipeContainer className='results' currentState={this.state} recipe={this.state.chosenRecipe} recipeImage={this.state.recipeImages} instructions={this.state.chosenRecipeInstructions} ingredients={this.state.chosenRecipeIngredients} handleNext={this.handleSubmitRecipe} handleClick={this.handleRecipeClick} handleLike={this.handleLikeRecipeClick} handleSavedForLater={this.handleSavedForLaterRecipe} />
                        </div>
                        : null }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment className='movieForm'>
                            <form onSubmit={this.handleSubmitMovie} >
                                <MovieDropDown currentState={this.props.state} handleSelection={this.handleMovieSelection} />
                                <Button className='searchBtn' type='submit'>NiteIn Presents...</Button>
                            </form>
                        </Segment>
                        { this.state.movieReady ?
                        <div>
                             <MovieContainer className='results' movie={this.state.chosenMovie} handleLike={this.handleLikeMovieClick} handleSavedForLater={this.handleSavedForLaterMovie} handleNext={this.handleSubmitMovie} /> 
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