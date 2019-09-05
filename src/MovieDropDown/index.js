import React, { Component } from 'react';
import Select from 'react-select';

const movieGenreList = [
    { label: "All", value: ""},
    { label: "Action", value: "28" },
    { label: "Adventure", value: "12" },
    { label: "Animation", value: "16" },
    { label: "Comedy", value: "35" },
    { label: "Crime", value: "80" },
    { label: "Documentary", value: "99" },
    { label: "Drama", value: "18" },
    { label: "Family", value: "10751" },
    { label: "History", value: "36" },
    { label: "Horror", value: "27" },
    { label: "Mystery", value: "9648" },
    { label: "Romance", value: "10749" },
    { label: "Science Fiction", value: "878" },
    { label: "Thriller", value: "53" },
    { label: "War", value: "10752" },
    { label: "Western", value: "37" },
];

class MovieDropDown extends Component {
    constructor() {
        super();

        this.state = {
            cuisine: ''
        }
    }

    render() {
        return (
            <Select options={ movieGenreList } placeholder="Select Movie Genre" onChange={this.props.handleSelection} />
        )
    }
}



export default MovieDropDown