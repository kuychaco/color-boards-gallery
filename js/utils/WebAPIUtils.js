var BoardActionCreators = require('../actions/BoardActionCreators');

var BoardObject = Parse.Object.extend("BoardObject");
var query = new Parse.Query(BoardObject);

module.exports = {
  saveBoard: function(boardId, board) {
    if (boardId === '-unsaved') {
      var boardObject = new BoardObject();
      boardObject.save({board: board}).then(function(object) {
        alert("Board saved with id " + object.id);
      });
      this.getAllBoards();
      return;
    }
    query.equalTo('objectId', boardId)
    query.first({
      success: function(result) {
        result.set('board', board);
        result.save();
        alert("Board updated");
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

  },
  getAllBoards: function() {
    query.find({
      success: function (results) {
        var boards = results.map(function(result) {
          return {
            id: result.id,
            board: result.attributes
          }
        });
        BoardActionCreators.receiveAllBoards(boards);
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }
}
