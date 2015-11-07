var App = require('./components/App.react');
var React = require('react');
var BoardStore = require('./stores/BoardStore');
var WebAPIUtils = require('./utils/WebAPIUtils');

window.React = React; // export for http://fb.me/react-devtools

WebAPIUtils.getAllBoards();

React.render(
    <App />,
    document.getElementById('react')
);
