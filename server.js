var wifi = require('wifi-cc3000'),
    http = require('http'),
    Npx = require('npx'),
    npx = new Npx(16);

function setColor(color) {
  var colorset = npx.newAnimation(1);
  colorset.setAll('#' +  color);
  npx.play(colorset);
}

function setupServer() {
  http.createServer(function(req, res) {
    if (req.method === 'GET') {
      var response = req.url.split('/')[1];
      var color = response.split('?')[0];
      setColor(color);

      res.writeHead(200, {'Content-Type': 'application/javascript'});
      res.end('gotdata(\'{"color": "' + color + '"}\')');
    }
  }).listen(80);
}

setTimeout(function() {
  if (wifi.isConnected()) {
    setupServer();
  } else {
    wifi.on('connect', setupServer);
  }
}, 60000);