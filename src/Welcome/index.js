import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Welcome = (props) => {
    return (
        <div>
        <h1 className='jumboTitle'>NiteIn</h1>
            <Jumbotron className="jumbotron bg-dark text-white">
                <h1 className="welcomeTitle">Welcome!</h1>
                <p className="lead">This app is designed for those who want to have a nice night in, and just want an easy-to-follow recipe and a good movie for their laid-back evening. To get started, select a cuisine, and a movie genre, and we'll plan your night in for you.</p>
                <hr className="my-2" />
                <p>This project was created using Spoonacular API and The Movie DB.</p>
                {/* <Button onClick={props.handleClick}>Got It!</Button> */}
            </Jumbotron>
        </div>
    )
}

export default Welcome