import React, { Component } from 'react'

import AppContext from '../context/appContext';
import auth0 from 'auth0-js';

export default class Login extends Component {
    // state = {
        // username: '',
        // password: '',
    // };

    static contextType = AppContext;

    auth0 = new auth0.WebAuth({
        domain: "sashc0.eu.auth0.com",
        clientID: "CaS6LnWP2QmQ6eVu4JFIYCiMAMsNW30B",
        redirectUri: "http://localhost:3000/auth",
        responseType: "token id_token",
        scope: "openid profile"
    });

    submitHandler = (e) => {
        e.preventDefault();
        // this.context.login();
        this.auth0.authorize();
    };

    AuthenticationHandler = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken) {
                this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                    this.context.login(authResult.accessToken, profile.name);
                })
                // this.props.history.push("/");
            } else if (err) {
                console.log(err);
            }
        });
    };

    componentDidMount(){
        this.AuthenticationHandler();
    }

    render() {
        return (
            <div className="wrapper__top">
                <header>
                    <h1>СРА4</h1>
                </header>
                <div className="main">
                    <div className="form-title">
                        <div>ТЫ ХТО?</div>
                    </div>
                    <form className="theme-form" onSubmit={this.submitHandler}>
                        <input type="submit" value="ВОЙТИ" />
                    </form>
                    <div className="welcome-block">
                        <h3>Добро пожаловать в <strong>СРАЧ!</strong></h3>
                        <p>
                            Это свободное пространсво для самовыражения каждого. <br />
                            Заходи, выбирай тему или создай новую. <br />
                            У тебя нет никаких ограничений!<br />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
