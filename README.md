# Git Help
A repository to hold a constantly evolving  `reveal.js` presentation that makes use of a `node.js`-based server with `node-pty` as backend and `xterm.js` as frontend for a terminal used in the interactive demonstrations.

## Acknowledgements

The implementation of the terminal is due to [Mike Chernev](https://www.mikechernev.com/)'s contribution found here: https://github.com/mikechernev/xterm-revealjs-presentation-sekeleton

The presentation framework is the excellent [reveal.js](https://revealjs.com/) by [Hakim El Hattab](https://hakim.se/) and [contributors](https://github.com/hakimel/reveal.js/graphs/contributors).

## How to

Install the required node modules by running in the directory containing `server.js`

`npm install`

Then, run the backend server using

`npm start`

After this, navigate to `localhost:8000` in your browser of choice.

## Notes

Only tested on Windows at the moment.
