var Board = require('./Board.react');
var BoardStore = require('../stores/BoardStore');
var BoardActionCreators = require('../actions/BoardActionCreators');
var React = require('react');


var NewBoardForm = React.createClass({

  render: function() {
    return (
      <form className="boardForm" onSubmit={this._onSubmit}>
        <h4>Create New Board</h4>
        <input type="text" placeholder="height" ref="height" />
        <input type="text" placeholder="width" ref="width" />
        <input type="submit" />
      </form>
    );
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var height = parseInt(this.refs.height.getDOMNode().value.trim());
    var width = parseInt(this.refs.width.getDOMNode().value.trim());
    if (!height || !width) return;
    this.refs.height.getDOMNode().value = '';
    this.refs.width.getDOMNode().value = '';
    BoardActionCreators.createBoard(height, width);
  }

});

module.exports = NewBoardForm;
