import React, { Component } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {emojify} from 'react-emojione';

import { publishMessage, subscribeToRoom } from '../api';
import AppContext from '../context/appContext';

class Room extends Component {
    state = {
        messageText: '',
        messages: []
    };

    constructor(props) {
        super(props);

        subscribeToRoom(this.props.topic._id, (message) => {
            const options = {
                convertShortnames: true,
                convertUnicode: true,
                convertAscii: true,
            };
            const side = message.pros ? "yes" : "no";
                this.setState(prevState => ({
                    messages: prevState.messages.concat([
                        <li key={message._id} className={side}>
                            <div>{emojify(message.text, options)}</div>
                        </li>
                    ])
                }));
        })
    }

    static contextType = AppContext;

    addEmoji = (code, emoji) => {
        this.setState({messageText: this.state.messageText + `:${emoji.name}:`});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.messageText.trim().length===0) {
            return;
        }
        publishMessage((this.context.username + ": " + this.state.messageText), this.props.pros, this.props.topic._id);
        this.setState({messageText: ''});
    };

    render() {
        return (
            <div className="wrapper__top">
                <header>
                    <button className="btn-logout" onClick={() => this.context.logout()}>Выйти</button>
                    <h1>СРА4</h1>
                </header>
                <div className="main">
                    <section  className="theme-content">
                        <button className="btn-logout" onClick={e => this.props.back()}>Выбрать другую тему</button>
                        <h3 className="theme-chat-title">{this.props.topic.title}</h3>
                        <div className="theme-chat">
                            <ul className="chat-list">
                                <li key="0" className="chat-list__title">
                                    <strong>ПРОТИВ</strong>
                                    <strong>ЗА</strong>
                                </li>
                                { this.state.messages }
                            </ul>
                        </div>
                        <form  className="theme-form" onSubmit={this.handleSubmit}>
                            <textarea cols="" rows="4" value={this.state.messageText} onChange={(e) => this.setState({messageText: e.target.value})} />
                            <EmojiPicker onEmojiClick={this.addEmoji}/>
                            <input type="submit" />
                        </form>
                    </section>
                </div>
            </div>
        );
    }
}

export default Room;
