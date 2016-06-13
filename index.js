var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

// favicon request handler
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(200);
});

app.get('/', function(req, res){
    var ip = req.ip,
        userAgent = req.headers['user-agent'],
        language = req.headers['accept-language'];

    var opSys = findOpSys(userAgent),
    language = parseLanguage(language);

    res.json({
        ip: ip,
        software: opSys,
        language: language
    });

});

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

function findOpSys(string) {
    if(/Android/.test(string))
        return /Android [0-9\.]+[\;]/.exec(string)[0];
    else if (/webOS\//.test(string))
        return /webOS\/ [0-9\.]+[\;]/.exec(string)[0];
    else if (/(Intel|PPC) Mac OS X/.test(string))
        return /(Intel|PPC) Mac OS X ?[0-9\._]*[\)\;]/.exec(string)[0];
    else if (/Windows NT/.test(string))
        return /Windows NT [0-9\._]+[\);]/.exec(string)[0];
    else
        return null;
}

function parseLanguage(string) {
    var end = string.indexOf(',');
    return string.slice(0, end);
}
