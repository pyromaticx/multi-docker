import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './login-page.css';
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    formChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    loginSubmit(evt) {
        evt.preventDefault();
        console.log(this.state);

        fetch('/api/login', {
            method: "POST",
            mode: "cors", 
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            referrer: "no-referrer", 
            body: JSON.stringify({username: this.state.username, password: this.state.password}), 
        }).then(_res => {return _res.json()}).then(res => {
            console.log(res);
        })
    }
    doRegister() {
        this.props.history.push('/register');
    }
    render() {
        return (
            <div>
                <div className="login-box">
                    <form action="/login" onSubmit={(evt) => this.loginSubmit(evt)} onChange={(evt => {this.formChange(evt)})}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" defaultValue={this.state.username} required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" defaultValue={this.state.password} required/>
                        <button type="submit">Login</button>
                        <button type="button" onClick={() => {this.doRegister()}}>Register</button>
                    </form>
                </div>
            </div>
        );
    }
}