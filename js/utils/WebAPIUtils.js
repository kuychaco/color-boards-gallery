var BoardActionCreators = require('../actions/BoardActionCreators');

var BoardObject = Parse.Object.extend("BoardObject");

module.exports = {

  saveBoard: function(boardId, board) {
    var query = new Parse.Query(BoardObject);
    if (boardId === '-unsaved') {
      var boardObject = new BoardObject();
      boardObject.save({board: board}).then(function(object) {
        alert("Board saved with id " + object.id);
      });
      this.getAllBoards();
    } else {
      query.equalTo('objectId', boardId);
      query.first({
        success: function(result) {
          result.set('board', board);
          result.save();
          alert("Board updated");
        },
        error: alertError
      });
    }
  },

  deleteBoard(boardId) {
    var _this = this;
    var query = new Parse.Query(BoardObject);
    query.get(boardId, {
      success: function(board) {
        board.destroy({}).then(function() {
          _this.getAllBoards();
        });
      },
      error: alertError
    });
  },

  getAllBoards: function() {
    var query = new Parse.Query(BoardObject);
    query.find({
      success: function (results) {
        var boards = results.map(function(result) {
          return {
            id: result.id,
            board: result.attributes
          };
        });
        BoardActionCreators.receiveAllBoards(boards);
      },
      error: alertError
    });
  }
}

function alertError (error) {
  alert("Error: " + error.code + " " + error.message);
}
