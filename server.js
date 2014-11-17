var wifi = require('wifi-cc3000'),
    http = require('http'),
    Npx = require('npx'),
    npx = new Npx(16);

function setColor(color) {
  var colorset = npx.newAnimation(1);
  switch(color) {
    case 'red':
      colorset.setAll('#FF0000');
      break;
    case 'white':
      colorset.setAll('#FFFFFF');
      break;
    case 'green':
      colorset.setAll('#00FF00');
      break;
    case 'yellow':
      colorset.setAll('#CCFF00');
      break;
    case 'blue':
      colorset.setAll('#0000FF');
      break;
    case 'cyan':
      colorset.setAll('#00CCFF');
      break;
    default:
      colorset.setAll('#000000');
      break;
  }
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