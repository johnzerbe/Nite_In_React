import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Icon, Button } from 'semantic-ui-react';


const RecipeContainer = (props) => {
    const baseImageUrl = `https://spoonacular.com/recipeImages/${props.recipe.id}-312x231`;

    const ingredientList = props.ingredients.map((ingredient, index) => {
        return (
            <li key={index}>
                {ingredient.name}:&nbsp;{ingredient.amount.us.value}&nbsp;{ingredient.amount.us.unit}
            </li>
        )
    })

    const recipeSteps = props.instructions.map((step, index) => {
        console.log(step)
        return (
            <ListGroupItem key={index} className='recipeListItem'>
                <strong>{ step.number }.</strong>&nbsp;<span>{step.step}</span>
            </ListGroupItem>
        )
    })

    return (
        <div className='resultsContainer'>
            <Card.Img className='resultsImg' variant="top" src={baseImageUrl}/>
            <Card.Body>
                <Card.Title><strong>{props.recipe.title.toUpperCase()}</strong></Card.Title>
                <Card.Text>
                Serving Size: {props.recipe.servings}
                </Card.Text>
                <Card.Text>
                Ready in: {props.recipe.readyInMinutes} minutes
                </Card.Text>
                <Button floated='left' onClick={props.handleClick}>{ props.currentState.showRecipeDetails ? 'Hide' : 'Show' } Details</Button>
                { props.currentState.showRecipeDetails ? 
                <div>
                    <div className='ingredientList'>
                        <ul className="list-group-flush">
                            { ingredientList }
                        </ul>
                    </div>
                
                    <ListGroup className="list-group-flush recipeList">
                        { recipeSteps }
                    </ListGroup>
                </div>
                : null }
                <Button onClick={props.handleLike} floated='right' basic color='red' icon>
                    <Icon name='heart' />
                </Button>
                <Button floated='right' variant="primary">Save for Later</Button>
                
                
            </Card.Body>
        </div>
    )
}

export default RecipeContainer