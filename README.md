## Challenge
Create a board of n x m tiles on a web page. Each tile on the board will start as white, but when clicked will toggle between a generated random color and returning to white. Each time a tile is toggled to a random color it should generate a new random color value.

## Features
Completed:
- Toggle color when clicked
- Clear board
- Save to Parse backend
- Display gallery of all boards which are viewable and editable by any user

## Development

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

`npm install`

This will install all dependencies.

To build the project, first run this command:

`npm start`

This will perform an initial build and start a watcher process that will
update bundle.js with any changes you wish to make.  This watcher is
based on [Browserify](http://browserify.org/) and
[Watchify](https://github.com/substack/watchify), and it transforms
React's JSX syntax into standard JavaScript with
[Reactify](https://github.com/andreypopp/reactify).

After starting the watcher, you can open `index.html` in your browser to
open the app.
