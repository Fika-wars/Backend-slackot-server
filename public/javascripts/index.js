//in milliseconds
var refreshRate = 5000;
var hostURL = "http://localhost:3000";

function buttonPress() {
    var response = $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/highscore'
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

function updateDOM(value) {
    console.log(value.highscore.playerA);
    $('#player01').text(value.highscore.playerA);
}

function postHandler(data) {
    post(data).done(updateDOM);
}

function main() {
    console.log("now in main");

    postHandler("update");

    //timer = 0;
    timer = setTimeout(main, refreshRate);
}

$(document).ready(function() {
    main();
});