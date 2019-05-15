import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { createTopic, subscribeToTopics } from "../api";
import AppContext from '../context/appContext';
import Room from './room';
import Login from './login';

class App extends Component {
    state = {
        topicTitle: '',
        topics: [],
        selectedTopic: null,
        pros: true,
        token: null,
        userId: '',
        username: ''
    };

    constructor(props){
        super(props);

        subscribeToTopics((topic) => {
            this.setState(prevState => ({
                topics: prevState.topics.concat([topic])
            }));
        })
    }

    login = (token, username) => {
        this.setState({token: token, username: username});
    };

    logout = () => {
        this.setState({token: null, userId: null, username: null});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        createTopic(this.state.topicTitle);
        this.setState({ topicTitle: '' });
    };

    selectTopic = (topic, pros) => {
        this.setState({
            selectedTopic: topic,
            pros: pros
        })
    };

    back = () => this.setState({selectedTopic: null});

    temperature = (count) => {
        return count;
    };

    render() {
        const topics = this.state.topics.map(topic => {
            return (
                <li key={topic._id}>
                    <span style={{fontFamily: 'Fredericka the Great', fontSize: 24}}>
                        {topic.title}
                        {this.temperature(topic.publishedMessages.length)}
                    </span>
                    <button onClick={event => this.selectTopic(topic, true)}>За</button>
                    <button onClick={event => this.selectTopic(topic, false)}>Против</button>
                </li>
            );
        });

        let content = (
            <div className="wrapper__top">
                <header>
                    <button className="btn-logout" onClick={() => this.logout()}>Выйти</button>
                    <h1>СРА4</h1>
                </header>
                <div className="main">
                    <div className="form-title">
                        <div>Новая тема</div>
                    </div>
                    <form className="theme-form" onSubmit={this.handleSubmit}>
                        <input type="text" name="topicTitle" value={this.state.topicTitle} onChange={(e)=> this.setState({topicTitle: e.target.value})} placeholder="Название новой темы" />
                        <input type="submit" value="Создать" />
                    </form>

                    <section className="bg-gif">
                        <div className="title-start"><strong>START</strong></div>
                        <ul className="themes-list">
                            {topics}
                        </ul>
                    </section>
                </div>
            </div>
        );

        if (this.state.selectedTopic) {
            content = (
                <Room key={this.state.selectedTopic._id} topic={this.state.selectedTopic} pros={this.state.pros} temperature={this.temperature}  back={this.back} />
            );
        }

        return (
            <BrowserRouter>
                <AppContext.Provider
                    value = {
                        {
                            token: this.state.token,
                            username: this.state.username,
                            login: this.login,
                            logout: this.logout
                        }
                    }>
                    {/*<header>*/}
                        {/*<h1>СРА4</h1>*/}
                    {/*</header>*/}
                    <Switch>
                        {this.state.token && <Route path="/" exact render={ () => content } />}
                        {this.state.token && <Redirect from="/auth" to="/" />}
                        {!this.state.token && <Route path="/auth" component={ Login } />}
                        <Redirect to="/auth" />
                    </Switch>
                    <footer></footer>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
