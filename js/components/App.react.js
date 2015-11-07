var Board = require('./Board.react');
var NewBoard = require('./NewBoard.react');
var BoardStore = require('../stores/BoardStore');
var React = require('react');

function getStateFromStores() {
  console.log('getAllBoardIds');
  return {
    boardIds: BoardStore.getAllBoardIds()
  };
}

var App = React.createClass({
  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function() {
    BoardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var boards = this.state.boardIds.map(function(boardId) {
      return (
        <Board
          key={boardId}
          boardId={boardId}
        />
      );
    });
    return (
      <div className="app">
        <NewBoard />
        {boards}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = App;
