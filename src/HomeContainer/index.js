import React, { Component } from 'react';
import NavBar from '../NavBar';
import Welcome from '../Welcome';
import RecipeDropDown from '../RecipeDropDown';
import 'reactstrap';
import '../App.css';


const recipeAPIKey = process.env.REACT_APP_API_KEYSPOON;
const movieAPIKey = process.env.REACT_APP_API_KEYMOVIE;

const booksAPI = 'https://openlibrary.org/subjects/mystery.json?limit=1';
const moviesAPI = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&language=en-US';
const recipeAPI = 'https://api.spoonacular.com/recipes/search?cuisine=';

class HomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            chosenRecipe: {},
            selectedCuisine: '',
            genre: '',
            movie: {},
            book: {},
            ready: false
        }
    }

    handleSubmitRecipe = (e) => {
        e.preventDefault();
        
        let url = (`${recipeAPI}${this.state.selectedCuisine}&apiKey=${recipeAPIKey}`);
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((recipes) => {
            console.log(recipes.results);
            let finalRecipe = Math.floor(Math.random() * recipes.results.length)

            this.setState({
                recipes: recipes.results,
                chosenRecipe: recipes.results[finalRecipe].title,
                ready: true
            }, () => {
                console.log(this.state.chosenRecipe)
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

    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <form onSubmit={this.handleSubmitRecipe} >
                        <RecipeDropDown currentState={this.props.state} handleSelection={this.handleRecipeSelection} />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                { !this.state.ready ? <Welcome /> : null }
            </div>
        )
    }
}

export default HomeContainer