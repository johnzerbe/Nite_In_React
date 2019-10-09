import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const SavedForLaterMovieModal = (props) => {

    const handleDeleteMovie = (id, e) => {
        props.handleDeleteSaveForLater(props.movie.id, 'movies')
    }

    let moviePoster = `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;

    return (
        <Modal className='modalBody' trigger={<Button className='movieModalButton' size='mini'>
            {/* <Icon name='right chevron' /> */}
            <Image wrapped className='userImages' size='small' src={moviePoster} />
            <h4 className='userItemMovieTitle'>{props.movieName}</h4>
          </Button>}>
            <Modal.Content image>
              <Image wrapped size='large' src={moviePoster} />
              <Modal.Description>
                <Header>{props.movie.title}</Header>
                <p>
                  {props.movie.overview}
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleDeleteMovie} primary>
              <Icon name='times' />Delete
              </Button>
            </Modal.Actions>
          </Modal>
    )
}

export default SavedForLaterMovieModal