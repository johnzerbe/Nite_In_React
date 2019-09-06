import React from 'react';
import { Card } from 'react-bootstrap';
import { Icon, Button } from 'semantic-ui-react';


const MovieContainer = (props) => {

    let moviePoster = `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
    return (
        
        <Card>
            <Card.Img variant="top" src={moviePoster} />
            <Card.Body>
                <Card.Title><strong>{props.movie.title}</strong></Card.Title>
                <Card.Text>
                {props.movie.overview}
                </Card.Text>
                <Button floated='left' basic color='red' icon>
                    <Icon name='heart' />
                </Button>
                <Button variant="primary">Save for Later</Button>
            </Card.Body>
        </Card>
    )
}

export default MovieContainer