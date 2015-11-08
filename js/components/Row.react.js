var BoardActionCreators = require('../actions/BoardActionCreators');
var BoardStore = require('../stores/BoardStore');
var React = require('react');

function getStateFromStores(boardId, rowIndex) {
  return {
    row: BoardStore.getRow(boardId, rowIndex)
  };
}

var Row = React.createClass({

  getInitialState: function() {
    return getStateFromStores(this.props.boardId, this.props.rowIndex);
  },

  componentDidMount: function() {
    BoardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    BoardStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var cells = this.state.row.map(function(color, columnIndex) {
      style = { backgroundColor: color };
      return (
        <div
          key={this.props.rowIndex + '_' + columnIndex}
          className="cell"
          style={style}
          onClick={this._onClick.bind(null, this.props.boardId, this.props.rowIndex, columnIndex)}
          />
      );
    }, this);

    return (
      <div className="row">
        {cells}
      </div>
    );
  },

  _onClick: function(boardId, rowIndex, columnIndex) {
    BoardActionCreators.clickCell(boardId, rowIndex, columnIndex);
  },

  _onChange: function() {
    this.isMounted() && this.setState(getStateFromStores(this.props.boardId, this.props.rowIndex));
  }

});

module.exports = Row;
