var express = require('express');
var bodyParser = require('body-parser')
var serveStatic = require('serve-static');
var fs = require('fs');
var pty = require('node-pty');
var os = require('os');

var entrypoint = process.platform === 'win32' ? 'cmd.exe' : process.env.SHELL;

var terminal = pty.spawn(entrypoint, args = [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
});
var log = '';
var currentDir = process.env.HOME;

terminal.on('data', function(data) {
    log += data;
});

var app = express()
require('express-ws')(app); // Support for websockets
app.use( bodyParser.json()); // Support parsing of POST data
app.use(bodyParser.urlencoded({
    extended: true
  }))

// Serve all content from the root.
app.use(serveStatic(__dirname, {'cacheControl': false, 'index': false}));

app.get('/', function(req, res){
	
	// Read the presentation file
	fs.readFile(__dirname + "/index.html", "utf8", function(err, data){
		if (err) throw err;
		
		// Replace YEAR_MONTH_DAY everywhere it is encountered
		var date = new Date().toISOString().substr(0, 10).replace(/\-/g, "_");
		
		var data_repd = data.replace(/YEAR_MONTH_DAY/g, date);
		
		// Send the updated data
		res.send(data_repd);
	});
});

var getDesiredDir = function(req) {
    const homeDir = process.env.HOME;
    const defaultDir = homeDir;

    if (!req.body.dir) {
        return defaultDir;
    }

    var requestDir = req.body.dir;

    if (requestDir == '~') {
        return homeDir;
    }

    // Absolute path
    if (requestDir.startsWith('/')) {
        return requestDir;
    }
    var desiredDir = `${__dirname}/${requestDir}`;

    if (!fs.existsSync(desiredDir)) {
        fs.mkdirSync(desiredDir);
    }

    return desiredDir;

};

var changeDir = function(req) {

    var dir = getDesiredDir(req);

    if (currentDir !== dir) {
        terminal.write(`cd ${dir}\r`);
        currentDir = dir;
    }

    //terminal.write(process.platform === 'win32' ? `cls\r` : `clear\r`);
};

app.post('/terminal', function(req, res) {
    changeDir(req);
    res.end();
    return;
});


app.post('/terminal/size', function (req, res) {
    if (!terminal) {
        res.end();
        return;
    }
    var cols = parseInt(req.query.cols),
        rows = parseInt(req.query.rows);

    terminal.resize(cols, rows);
    res.end();
});

app.ws('/terminal', function (ws) {
    ws.send(log);
    var wsTerminal = terminal;
    terminal.on('data', function(data) {
        try {
            ws.send(data);
        } catch (e) {
            // console.error(e);
        }
    });

    ws.on('message', function(message) {
        terminal.write(message);
    });

    ws.on('close', function() {
        return; // Do nothing
    })
});

var port = process.env.PORT || 8000,
    host = 'localhost';

console.log('App listening to http://' + host + ':' + port);
app.listen(port, host);
