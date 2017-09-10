//in milliseconds
var refreshRate = 5000;
var hostURL = "http://10.0.0.81:3000";

function buttonPress() {
    var response = $.ajax({
        type: 'POST',
        url: hostURL,
        data: {
            "operator": "userUpdate",
            "userName": "playerJ",
            "region": "A"
        }
    });

    console.log(response);
}

function post(operator) {
    return $.ajax({
        type: 'POST',
        url: hostURL,
        data: {operator: operator}
    });
}

function updateHighscore(data) {
    $.each(data, function(index, obj) {
        $('#'+obj.ID).text(obj.name + ": " + obj.score);
        $('#'+obj.ID).addClass(obj.teamID);
    });
}

function updateMap(data) {
    peopleInZone = 0;

    //Count people inside zone
    $.each(data, function(index, obj) {
        console.log(obj.location);
        if (obj.location != "None") {
            peopleInZone++
        }
    });

    if (peopleInZone == 1) {
        console.log("changing image");
        $("#BlueTeamMap").attr("hidden", false);
        $("#NoTeamMap").attr("hidden", true);
    }
}

function updateDOM(data) {
    updateHighscore(data);
    updateMap(data);
}

function postHandler(data) {
    post(data).done(updateDOM);
}

function main() {
    postHandler("refresh");

    //timer = 0;
    timer = setTimeout(main, refreshRate);
}

$(document).ready(function() {
    main();
});