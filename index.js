var http = require('http');
//File system module
var fs = require('fs');
//Imported custom module using the require function.
//Assigned the value of the module to the new variable extract.
var extract = require('./extract');
//eslint-disable-next-line no-unused-vars
var wss = require('./websockets-server');
var mime = require('mime');

//Display error page
var handleError = function(err, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });

  // Get readable stream from custom error page
  var file = fs.createReadStream('./app/error.html');

  // Write readable stream to response object (writeable stream)
  file.pipe(res);
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  ////Now able to use the extract function just as the extractFilePath function
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      var contentType = mime.getType(filePath);

      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});
server.listen(3000);
