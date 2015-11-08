var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var WebAPIUtils = require('../utils/WebAPIUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';


var _boards = {};

function _loadBoards (boards) {
  _boards = {};
  boards.forEach(function(item) {
    _boards[item.id] = item.board;
  });
}

function _generateWhiteBoard (boardId, height, width) {
  if (boardId === '-unsaved') {
    _boards[boardId] = {
      board: [],
      updatedAt: new Date()
    };
  }
  var board = _boards[boardId].board;
  var height = height || board.length;
  var width = width || board[0].length;
  for(var i=0; i<height; i++) {
    board[i] = [];
    for(var j=0; j<width; j++) {
      board[i][j] = 'white';
    }
  }
}

function _getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function _toggleCellColor(boardId, rowIndex, columnIndex) {
  var color = _boards[boardId].board[rowIndex][columnIndex];
  if (color === 'white') _boards[boardId].board[rowIndex][columnIndex] = _getRandomColor();
  else _boards[boardId].board[rowIndex][columnIndex] = 'white';
}

var BoardStore = assign({}, EventEmitter.prototype, {

  init: function() {
    _generateWhiteBoard();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getRowCount: function(boardId) {
    return _boards[boardId].board.length;
  },

  getRow: function(boardId, rowIndex) {
    return _boards[boardId].board[rowIndex];
  },

  getUpdatedAt: function(boardId) {
    return _boards[boardId].updatedAt;
  },

  getAllBoardIds: function() {
    return Object.keys(_boards).sort(function(a, b) {
      return _boards[b].updatedAt - _boards[a].updatedAt;
    });
  },

  getBoard: function(boardId) {
    return _boards[boardId];
  }

});

BoardStore.setMaxListeners(1000);

BoardStore.dispatchToken = Dispatcher.register(function(action) {

  switch (action.type) {

    case ActionTypes.CREATE_BOARD:
      _generateWhiteBoard('-unsaved', action.height, action.width);
      BoardStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_BOARDS:
      _loadBoards(action.rawBoards);
      BoardStore.emitChange();
      break;

    case ActionTypes.CLICK_CELL:
      _toggleCellColor(action.boardId, action.rowIndex, action.columnIndex);
      BoardStore.emitChange();
      break;

    case ActionTypes.CLEAR_BOARD:
      _generateWhiteBoard(action.boardId);
      BoardStore.emitChange();
      break;

    case ActionTypes.SAVE_BOARD:
      var boardId = action.boardId;
      WebAPIUtils.saveBoard(boardId, _boards[boardId].board);
      break;

    case ActionTypes.DELETE_BOARD:
      var boardId = action.boardId;
      WebAPIUtils.deleteBoard(boardId);
      break;

    default:
    // do nothing
  }
});

module.exports = BoardStore;
