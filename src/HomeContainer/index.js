import React, { Component } from 'react';
import NavBar from '../NavBar';
import Welcome from '../Welcome';
import RecipeDropDown from '../RecipeDropDown';
import MovieDropDown from '../MovieDropDown';
import RecipeContainer from '../RecipeContainer';
import MovieContainer from '../MovieContainer';
import 'reactstrap';
import '../App.css';


const recipeAPIKey = process.env.REACT_APP_API_KEYSPOON;
const movieAPIKey = process.env.REACT_APP_API_KEYMOVIE.replace(/\W/g, '');
console.log(process.env.REACT_APP_API_KEYMOVIE)

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
            selectedCuisine: '',
            selectedGenre: '',
            movies: [],
            chosenMovie: {},
            book: {},
            recipeReady: false,
            movieReady: false
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

    render() {
        return (
            <div>
                <NavBar />
                <div>
                { !this.state.recipeReady || !this.state.movieReady ? <Welcome /> : null }
                </div>
                <div>
                    <form className='recipeForm' onSubmit={this.handleSubmitRecipe} >
                        <RecipeDropDown currentState={this.props.state} handleSelection={this.handleRecipeSelection} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    { this.state.recipeReady ? <RecipeContainer recipe={this.state.chosenRecipe} instructions={this.state.chosenRecipeInstructions} /> : null }
                </div>
                <div>
                    <form className='movieForm' onSubmit={this.handleSubmitMovie} >
                        <MovieDropDown currentState={this.props.state} handleSelection={this.handleMovieSelection} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div>
                    { this.state.movieReady ? <MovieContainer movie={this.state.chosenMovie} /> : null }
                </div>
            </div>
        )
    }
}

export default HomeContainer