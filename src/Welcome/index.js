import React from 'react';
import { Jumbotron } from 'reactstrap';

const Welcome = (props) => {
    return (
        <div>
            <Jumbotron className="jumbotron bg-dark text-white">
                <h1 className="display-3">Welcome to your Nite-In!</h1>
                <p className="lead">To get started, select a cuisine, and a movie genre, and we'll plan your nite in for you.</p>
                <hr className="my-2" />
                <p>This project was created using Spoonacular API, The Movie DB, and Open Library.</p>
            </Jumbotron>
        </div>
    )
}

export default Welcome