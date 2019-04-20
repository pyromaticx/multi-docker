import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './register-page.css';
import verb from '../../util/global';
export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            errors: []
        };
    }
    formChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    registerSubmit(evt) {
        evt.preventDefault();
        console.log(this.state);

        verb.post('/api/register', {...this.state}).then(_res => {return _res.json()}).then(res => {
            if(res.errors && res.errors.length) {
                this.setState({
                    errors: res.errors
                });
            } else if(res.status && res.status === 200) {
                this.props.history.push('/login');
            } else {
                this.setState({
                    errors: ["server"]
                });
            }
        });
    }
    render() {
        return (
            <div>
                <div className="register-box">
                    <form action="/register" onSubmit={(evt) => this.registerSubmit(evt)} onChange={(evt => {this.formChange(evt)})}>
                        <div className={"input-row " + (this.state.errors.indexOf("username") > -1 ? "error": "")}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" defaultValue={this.state.username} required/>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("password") > -1 ? "error": "")}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" defaultValue={this.state.password} required/>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("password2") > -1 ? "error": "")}>
                            <label htmlFor="password2">Password Again</label>
                            <input type="password" name="password2" defaultValue={this.state.password2} required/>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("email") > -1 ? "error": "")}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" defaultValue={this.state.email} required/>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}