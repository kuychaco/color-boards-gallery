var React = require('react');
var BoardStore = require('../stores/BoardStore');
var BoardActionCreators = require('../actions/BoardActionCreators');
var Row = require('../components/Row.react');

function getStateFromStores(boardId) {
  return {
    rowCount: BoardStore.getRowCount(boardId),
    updatedAt: BoardStore.getUpdatedAt(boardId)
  };
}

var Board = React.createClass({

  getInitialState: function() {
    return getStateFromStores(this.props.boardId);
  },

  componentDidMount: function() {
    BoardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var rows = [];
    for (var i=0; i<this.state.rowCount; i++) {
      rows.push(
        <Row
          key={'row_'+i}
          boardId={this.props.boardId}
          rowIndex={i}
        />
      );
    }
    return (
      <div className="board">
        <span>Board ID: {this.props.boardId}</span>
        <button onClick={this._onClear.bind(null, this.props.boardId)}>Clear</button>
        <button onClick={this._onSave.bind(null, this.props.boardId)}>Save</button> <br/>
        <span>{this.state.updatedAt.toString()} </span>
        {rows}
      </div>
    );
  },

  _onClear: function(boardId) {
    BoardActionCreators.clearBoard(boardId);
  },

  _onSave: function(boardId) {
    if (boardId === '-unsaved') BoardStore.removeChangeListener(this._onChange);
    BoardActionCreators.saveBoard(boardId);
  },

  _onChange: function() {
    this.isMounted() && this.setState(getStateFromStores(this.props.boardId));
  }

});

module.exports = Board;
