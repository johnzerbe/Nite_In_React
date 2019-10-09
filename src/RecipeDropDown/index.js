import React, { Component } from 'react';
import Select from 'react-select';

const cuisineList = [
    { label: "All", value: ""},
    { label: "American", value: "American" },
    { label: "Cajun", value: "Cajun" },
    { label: "Chinese", value: "Chinese" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Greek", value: "Greek" },
    { label: "Indian", value: "Indian" },
    { label: "Italian", value: "Italian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Mediterranean", value: "Mediterranean" },
    { label: "Mexican", value: "Mexican" },
    { label: "Southern", value: "Southern" },
    { label: "Spanish", value: "Spanish" },
    { label: "Thai", value: "Thai" },
    { label: "Vietnamese", value: "Vietnamese" },
];

class RecipeDropDown extends Component {
    constructor() {
        super();

        this.state = {
            cuisine: ''
        }
    }

    render() {
        return (
            <Select className='dropDown' options={ cuisineList } placeholder="Select Cuisine" onChange={this.props.handleSelection} />
        )
    }
}



export default RecipeDropDown