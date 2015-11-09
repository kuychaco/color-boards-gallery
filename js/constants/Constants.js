var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CLICK_CELL: null,
    CLEAR_BOARD: null,
    CREATE_BOARD: null,
    SAVE_BOARD: null,
    DELETE_BOARD: null,
    RECEIVE_RAW_BOARDS: null
  });

};
