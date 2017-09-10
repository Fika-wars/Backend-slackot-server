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
//    $.each(data, function(val) {
//        $('#'+val).text(val + ": " + data[val]);

    $.each(data, function(index, obj) {
        $('#'+obj.ID).text(obj.name + ": " + obj.score + ", Zone: " + obj.location);
    });
}

function updateDOM(data) {
    updateHighscore(data);
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