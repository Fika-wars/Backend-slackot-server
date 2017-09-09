var express = require('express');
var router = express.Router();

var playerAScore = 0;

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Highscore',
                          playerPoint: playerAScore});
    res.end();
    console.log("Weird POST. Ended request.");
});

router.get('/highscore', function(req, res, next) {
  res.render('index', { playerPoint: 5});
  res.end();
});

//Handles POST-requests
router.post('/', function (req, res) {
    console.log("received: '" + req.body.operator + "' from POST-request.");
    if (req.body.operator== "update") {
        var response = {
          highscore:{
            "playerA": 7,
            "playerB": 6,
            "playerC": 5
          }
        };
    } else {
        res.end();
        console.log("Weird POST. Ended request.");
    }
    res.json(response);
});

module.exports = router;
