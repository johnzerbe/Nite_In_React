import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const RecipeModal = (props) => {

    const handleDeleteRecipe = (id, e) => {
        props.handleDelete(props.recipes.id, 'recipes');
        props.handleClick()
    }

    const baseImageUrl = `https://spoonacular.com/recipeImages/${props.recipes.id}-556x370`;
    const baseImageUrl2 = `https://spoonacular.com/recipeImages/${props.recipes.id}-240x150`;

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
        <Modal trigger={<Button onClick={props.handleClick} className='recipeModalButton' size='mini'>
             {/* <Icon name='right chevron' /> */}
             <Image wrapped className='userResultsImage' size='small' src={baseImageUrl2} />
             <h4 className='userItemTitle'>{props.recipeName}</h4>
        </Button>}>
            {/* <Modal.Header>{props.recipes.title}</Modal.Header> */}
            
                
                    <Modal.Content image>
                    <Image wrapped size='huge' src={baseImageUrl} />
                    <Modal.Description>
                    <Header>{props.recipes.title}</Header>
                        <ListGroup className='ingredientModal'>
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
                    <Button className='deleteBtn' onClick={handleDeleteRecipe} primary>
                    <Icon name='times' />Delete 
                    </Button>
                    </Modal.Actions>
                
            
            
        </Modal>
        
    )
}

export default RecipeModal