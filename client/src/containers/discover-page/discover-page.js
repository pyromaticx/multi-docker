import React, { Component } from 'react';

export default class DiscoverPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            page: props.match.params.page
        };
    }
    render() {
        return (
            <div>
                <h1>Discover {this.state.page ? '- ' + this.state.page: ''}</h1>
            </div>
        );
    }
}