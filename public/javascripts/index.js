//in milliseconds
var refreshRate = 5000;
var hostURL = "http://10.0.0.81 :3000";

function buttonPress() {
    var response = $.ajax({
        type: 'POST',
        url: hostURL,
        data: {
            "operator": "userUpdate",
            "userName": "playerJ",
            "region": "FikaRum2"
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

function updatePeopleInZone(peopleInZone) {
    console.log(peopleInZone);
    $("#peopleInZone").text(peopleInZone);
    $("#peopleInZone").attr("hidden", false);
}

function updateMap(data) {
    teamInZone = "no";
    nrBlueInZone = 0;
    nrRedInZone = 0;
    nrGreenInZone = 0;

    //Count people inside zone
    $.each(data, function(index, obj) {
        console.log(obj.location);
        if (obj.location != "None") {
            switch (obj.teamID) {
                case "blue":
                    nrBlueInZone++;
                    teamInZone = "blue";
                    updatePeopleInZone(nrBlueInZone);
                    break;
                case "red":
                    nrRedInZone++;
                    teamInZone = "red";
                    updatePeopleInZone(nrRedInZone);
                    break;
                case "green":
                    nrGreenInZone++;
                    teamInZone = "green";
                    updatePeopleInZone(nrGreenInZone);
                    break;
            }
        }
    });

    $("#blueTeamMap").attr("hidden", true);
    $("#redTeamMap").attr("hidden", true);
    $("#greenTeamMap").attr("hidden", true);
    $("#noTeamMap").attr("hidden", true);

    $("#" + teamInZone + "TeamMap").attr("hidden", false);
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
