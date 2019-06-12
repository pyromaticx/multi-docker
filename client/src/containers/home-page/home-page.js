import React, { Component } from 'react';
import './home-page.css';
import lust from '../../util/lust';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            
        };
    }
    tryAuth() {
        lust.authGet('/api/profile/new', this.props.history).then(res => {
            console.log(res);
        });
    }
    componentDidMount() {
        this.tryAuth();
    }
    render() {
        return (
            <div>
                <div className="leader">

                </div>
            </div>
        );
    }
}