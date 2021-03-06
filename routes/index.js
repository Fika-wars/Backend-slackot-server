var express = require('express');
var router = express.Router();

var userScores = [
    {
        "ID": "playerA",
        "name": "Fabian",
        "score": 60,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'blue'
    },
    {
        "ID": "playerB",
        "name": "Erik",
        "score": 42,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'blue'
    },
    {
        "ID": "playerC",
        "name": "Alexander",
        "score": 35,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'blue'
    },
    {
        "ID": "playerD",
        "name": "Charlie",
        "score": 24,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'red'
    },
    {
        "ID": "playerE",
        "name": "playerE",
        "score": 18,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'red'
    },
    {
        "ID": "playerF",
        "name": "playerF",
        "score": 7,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'red'
    },
    {
        "ID": "playerG",
        "name": "playerG",
        "score": 0,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'red'
    },
    {
        "ID": "playerH",
        "name": "playerH",
        "score": 0,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'green'
    },
    {
        "ID": "playerI",
        "name": "playerI",
        "score": 0,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'green'
    },
    {
        "ID": "playerJ",
        "name": "playerJ",
        "score": 0,
        "location": 'None',
        "locationTime": 0,
        "teamID": 'green'
    }];



/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Highscore' });
    res.end();
});

//Handles POST-requests
router.post('/', function (req, res) {
    console.log("received: '" + req.body.operator + "' from POST-request.");
    if (req.body.operator == "refresh") {
        var response = userScores;
    } else if (req.body.operator == "userUpdate") {
        var response = userScores;
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
    for (var i = 0; i < userScores.length; i++) {
        if (userScores[i].ID === name) {
            userScores[i].location = region;
            userScores[i].locationTime = Date.now();

            //Move
            updateScore(userScores[i]);
        }
    }
}

function updateScore(user) {
  if (user.location != "None") {
      user.score++;

      for (var i = 0; i < userScores.length; i++) {
          if (userScores[i].ID == user.ID) {
              break;
          }
          if (userScores[i].location == user.location && userScores[i].teamID == user.teamID) {
              user.score++;
          }
      }
  }
}

