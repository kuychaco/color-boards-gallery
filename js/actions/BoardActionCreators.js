var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  receiveAllBoards: function(boards) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_BOARDS,
      rawBoards: boards
    });
  },

  clickCell: function(boardId, rowIndex, columnIndex) {
    Dispatcher.dispatch({
      type: ActionTypes.CLICK_CELL,
      boardId: boardId,
      rowIndex: rowIndex,
      columnIndex: columnIndex
    });
  },

  clearBoard: function(boardId) {
    Dispatcher.dispatch({
      type: ActionTypes.CLEAR_BOARD,
      boardId: boardId
    });
  },

  saveBoard: function(boardId) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_BOARD,
      boardId: boardId
    });
  },

  deleteBoard: function(boardId) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_BOARD,
      boardId: boardId
    });
  },

  createBoard: function(height, width) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_BOARD,
      height: height,
      width: width
    });
  }

};
