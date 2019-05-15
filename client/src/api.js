import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3003');

function subscribeToTopics(cb) {
    socket.on('topics', topic => cb(topic));
    socket.emit('subscribeToTopics');
}

function createTopic(title) {
    socket.emit('createTopic', {title});
}

function publishMessage(text, pros, topicId) {
    socket.emit('publishMessage', {text, pros, topicId});
}

function subscribeToRoom(topicId, cb) {
    socket.on(`messages:${topicId}`, message => cb(message));
    socket.emit('subscribeToRoom', {topicId});
}

export {
    createTopic, subscribeToTopics,
    publishMessage, subscribeToRoom
};
