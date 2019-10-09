import React from 'react';
import { Card } from 'react-bootstrap';
import { Icon, Button } from 'semantic-ui-react';


const MovieContainer = (props) => {

    let moviePoster = `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
    return (
        
        <div className='resultsContainer'>
        <Button className='searchBtn' onClick={props.handleNext}>Next</Button>
            <Card.Img className='resultsImg' variant="top" src={moviePoster} />
            <Card.Body>
                <Card.Title><strong>{props.movie.title}</strong></Card.Title>
                <Card.Text>
                {props.movie.overview}
                </Card.Text>
                <Button id='movieLikeBtn' className='likeBtn' floated='right' onClick={props.handleLike} basic color='red' icon>
                    <Icon name='heart' />
                </Button>
                <Button className='bottomBtn' floated='right' variant="primary" onClick={props.handleSavedForLater} >Add To Watch List</Button>
            </Card.Body>
        </div>
        
    )
}

export default MovieContainer