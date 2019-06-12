import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import moment from 'moment';
import './register-page.css';
import lust from '../../util/lust';


export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        let minYear = parseInt(moment().subtract(18, 'years').format('YYYY'));
        this.state = {
            username: '',
            password: '',
            day: '1',
            month: '1',
            year: minYear,
            city: "",
            state: "",
            countryCode: "",
            postalCode: "",
            lat: "",
            lon: "",
            minYear: minYear,
            email: '',
            regIp: '',
            errors: [],
            gender: 'm',
            lookingFor: 'f',

        };
    }
    formChange(evt, retVal) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
        evt.stopPropagation();
    }
    registerSubmit(evt) {
        evt.preventDefault();
        console.log(this.state);
        let regObj = {
            username: this.state.username,
            password: this.state.password,
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            email: this.state.email,
            regIp: this.state.regIp,
        };
        lust.post('/api/register', regObj).then(_res => {return _res.json()}).then(res => {
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
    componentDidMount() {
        lust.getClientWebRtcIP().then(ip => {
            lust.getIpLocation(ip).then(loc => {
                if(loc && loc.ll && loc.ll.length) {
                    let country = lust.getCountryName(loc.country);
                    console.log(loc, country);
                    this.setState({
                        country: country,
                        countryCode: loc.country,
                        city: loc.city,
                        lat: loc.ll[0],
                        lon: loc.ll[1]
                    });
                }
            });
        });
    }
    renderDays() {
        let month = this.state.month;
        let year = this.state.year;
        let daysInMonth = new Date(year, month, 0).getDate();
        let days = [];

        for(let d = 1; d <= daysInMonth; d++) {
            days.push({
                value: d,
                label: d
            })
        }
        return days;
    }
    renderYears() {
        let minYear = this.state.minYear;
        let years = [];
        for(let i = 100; i > -1; i--) {
            let v = minYear - i;
            years.unshift({
                value: v,
                label: v
            });
        }
        return years;
    }
    renderCountries() {
        let c = Object.keys(lust.constants.isoCountries).map(cnt => {
            return {
                value: cnt,
                label: lust.constants.isoCountries[cnt]
            };
        });
        return c;
    }
    renderOptions(ds) {
        return ds.map(d => {
            return (
                <option key={d.label} value={d.value} label={d.label}></option>
            )
        })
    }
    render() {
        return (
            <div>
                <img src="/images/bikiniisland.jpeg" alt=""/>
                <div className="register-box">
                    <form action="/register" onSubmit={(evt) => this.registerSubmit(evt)}>
                        <div className={"input-row " + (this.state.errors.indexOf("gender") > -1 ? "error": "")}>
                            <label htmlFor="gender">I am / We are</label>
                            <select name="gender" value={this.state.gender} onChange={e => {this.formChange(e)}}>
                                {this.renderOptions(lust.constants.genders)}
                            </select>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("lookingFor") > -1 ? "error": "")}>
                            <label htmlFor="lookingFor">Looking for</label>
                            <select name="lookingFor" value={this.state.lookingFor} onChange={e => {this.formChange(e)}}>
                                {this.renderOptions(lust.constants.genderSeeking)}
                            </select>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("username") > -1 ? "error": "")}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" defaultValue={this.state.username} required/>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("password") > -1 ? "error": "")}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" defaultValue={this.state.password} required/>
                        </div>
                        <div className={"input-row row " + (this.state.errors.indexOf("dob") > -1 ? "error": "")}>
                            <div className="third column">
                                <label htmlFor="month">Month</label>
                                <select name="month" value={this.state.month} onChange={e => {this.formChange(e)}}>
                                    {this.renderOptions(lust.constants.months)}
                                </select>
                            </div>
                            <div className="third column">
                                <label htmlFor="day">Day</label>
                                <select name="day" value={this.state.day} onChange={e => {this.formChange(e)}}>
                                    {this.renderOptions(this.renderDays())}
                                </select>
                            </div>
                            <div className="third column">
                                <label htmlFor="year">Year</label>
                                <select name="year" value={this.state.year} onChange={e => {this.formChange(e)}}>
                                    {this.renderOptions(this.renderYears())}
                                </select>
                            </div>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("country") > -1 ? "error": "")}>
                            <label htmlFor="country">City</label>
                            <input type="text" name="city" value={this.state.city} onChange={e => {this.formChange(e)}} required/>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("country") > -1 ? "error": "")}>
                            <label htmlFor="countryCode">Country</label>
                            <select name="countryCode" value={this.state.countryCode} onChange={e => {this.formChange(e)}}>
                                {this.renderOptions(this.renderCountries())}
                            </select>
                        </div>
                        <div className={"input-row " + (this.state.errors.indexOf("email") > -1 ? "error": "")}>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name="email" value={this.state.email} onChange={e => {this.formChange(e)}} required/>
                        </div>
                        <button variant="contained" color="primary" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}