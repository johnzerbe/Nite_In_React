import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

const MovieModal = (props) => {

    const handleDeleteMovie = (id, e) => {
        props.handleDelete(props.movie.id, 'movies')
    }

    let moviePoster = `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;

    return (
        <Modal className='modalBody' trigger={<Button className='modalButton' size='mini' primary>
            <Icon name='right chevron' />
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

export default MovieModal