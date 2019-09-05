import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';


const RecipeContainer = (props) => {
    const baseImageUrl = `https://spoonacular.com/recipeImages/${props.recipe.id}-480x360`;

    const recipeSteps = props.instructions.map((step, index) => {
        console.log(step)
        return (
            <ListGroupItem key={index} className='recipeListItem'>
                <strong>{ step.number }.</strong>&nbsp;<span>{step.step}</span>
            </ListGroupItem>
        )
    })

    return (
        <Card style={{ width: '22rem' }}>
            <Card.Img className='recipeImg' variant="top" src={baseImageUrl}/>
            <Card.Body>
                <Card.Title><strong>{props.recipe.title.toUpperCase()}</strong></Card.Title>
                <Card.Text>
                Serving Size: {props.recipe.servings}
                </Card.Text>
                <Card.Text>
                Ready in: {props.recipe.readyInMinutes} minutes
                </Card.Text>
                <ListGroup className="list-group-flush recipeList">
                    { recipeSteps }
                </ListGroup>
                <Button variant="primary">Like</Button>
            </Card.Body>
        </Card>
    )
}

export default RecipeContainer