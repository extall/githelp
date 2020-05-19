# Git Help
This repository hosts a `reveal.js` presentation about using Git that makes use of a `node.js`-based server with `node-pty` as backend and `xterm.js` as frontend for a terminal used in the interactive demonstrations.

## Acknowledgements

The implementation of the terminal is due to [Mike Chernev](https://www.mikechernev.com/)'s contribution found here: https://github.com/mikechernev/xterm-revealjs-presentation-sekeleton

The presentation framework is the excellent [reveal.js](https://revealjs.com/) by [Hakim El Hattab](https://hakim.se/) and [contributors](https://github.com/hakimel/reveal.js/graphs/contributors).

## How to

Download this repo from GitHub in a zip folder and unpack the presentation and all the files. Install latest Node.js LTS. Finally, install the required node modules by running in the directory containing `server.js`, i.e., the root directory:

`npm install`

Then, run the backend server using

`npm start`

After this, navigate to `localhost:8000` in your browser of choice.

## Notes

Only tested on Windows at the moment. Should also work on Linux, but the commands will be slightly different. As a simple example, when `echo`ing, you need to enclose the string into quoation marks, i.e., do like `echo "Hello, World!" > test.txt`. If you do this on Windows terminal, the quotation marks are stored in the text file also.

## Security Alert and Disclaimer

ONLY USE THIS APPLICATION IF YOU ARE AWARE OF THE SECURITY RISKS. YOUR PRESENTATION AND HENCE THE TERMINALS MAY POTENTIALLY BE ACCESSED BY OTHER COMPUTERS ON THE NETWORK. THE PERSON ACCESSING YOUR PRESENTATION WILL HAVE FULL, UNLIMITED CONTROL OF YOUR MACHINE THROUGH THE TERMINAL. THE AUTHOR OF THIS APPLICATION MAY NOT BE HELD RESPONSIBLE FOR  DAMAGES ARISING FROM USING OR MISUSING THE APPLICATION.
