import React from 'react';
// import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Card, Icon } from 'semantic-ui-react';

const MovieContainer = (props) => {

    let moviePoster = `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
    return (
        <Card
            image= {moviePoster}
            header= <strong>{props.movie.title}</strong>
            // meta='Friend'
            description={props.movie.overview}
            // extra={extra}
        />
    )
}

export default MovieContainer