var express = require('express');
var router = express.Router();

var userScores = {
    "playerA": 60,
    "playerB": 46,
    "playerC": 32,
    "playerD": 20,
    "playerE": 20,
    "playerF": 17,
    "playerG": 10,
    "playerH": 0,
    "playerI": 0,
    "playerJ": 0
};

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Highscore' });
    res.end();
});

router.get('/highscore', function(req, res, next) {
  res.render('index', { playerPoint: 5});
  res.end();
});

//Handles POST-requests
router.post('/', function (req, res) {
    console.log("received: '" + req.body.operator + "' from POST-request.");
    if (req.body.operator == "refresh") {
        var response = userScores;
    } else if (req.body.operator == "userUpdate") {
        userInRegion(req.body.userName, req.body.region);
    } else {
        res.end();
        console.log("Weird POST. Ended request.");
    }
    res.json(response);
});

module.exports = router;



////////////////////////
/////////LOGICS/////////
////////////////////////



function userInRegion(name, region) {
  //Multiplier logic here for more users at same spot or similar
  //updateScore(update.);
  demoFunc(name, region);
}

function updateScore() {
  return;
}

function demoFunc(name, region) {
  userScores[name]++
}