import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const RecipeModal = (props) => {

    const baseImageUrl = `https://spoonacular.com/recipeImages/${props.recipes.id}-556x370`;

    const ingredientList = props.ingredients.length > 0 ?
    props.ingredients.map((ingredient, index) => {
        return (
            <li key={index}>
                {ingredient.name}:&nbsp;{ingredient.amount.us.value}&nbsp;{ingredient.amount.us.unit}
            </li>
        )
    }) : [];

    const recipeSteps = props.steps.map((step, index) => {
        return (
            <ListGroupItem key={index} className='recipeListItem'>
                <strong>{ step.number }.</strong>&nbsp;<span>{step.step}</span>
            </ListGroupItem>
        )
    });

    return(
        <Modal trigger={<Button className='modalButton' size='mini' primary>
             <Icon name='right chevron' />
        </Button>}>
            <Modal.Header>{props.recipes.title}</Modal.Header>
            <Modal.Content image>
            <Image wrapped size='huge' src={baseImageUrl} />
            <Modal.Description>
                <Header>Modal Header</Header>
                <ListGroup>
                <strong>Ingredients</strong>
                { ingredientList }
                </ListGroup>
                <ListGroup>
                <strong>Steps</strong>
                { recipeSteps }
                </ListGroup>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button primary>
                Delete <Icon name='right chevron' />
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default RecipeModal