// Description:
//   Looks people up in the OSU directory
//
// Dependencies:
//   request
//
// Configuration:
//   None
//
// Commands:
//   <dot-number <name.number>
//   <fname <first name>
//   <lname <last name>
//
// Author:
//   J3RN

var request = require("request");

module.exports = (robot) => {
    robot.hear(/(.*)/, (msg) => {
        var text = msg.match[0];
        var params = {};

        var dotnum = text.match(/\<dot-number (\w+\.\d+)/);
        if (dotnum) {
            params["name_n"] = dotnum[1];
        }

        var fname = text.match(/\<fname (\w+)/);
        if (fname) {
            params["firstname"] = fname[1];
        }

        var lname = text.match(/\<lname (\w+)/);
        if (lname) {
            params["lastname"] = lname[1];
        }

        if (Object.keys(params).length) {
            performLookup(params, msg);
        }
    });
}

function formatPerson(person) {
    if (person) {
        var message = person.display_name + " has the email " + person.username;
        for (var i in person.majors) {
            message += ", majors in " + person.majors[i].major;
        }
        for (var i in person.appointments) {
            message += ", works as a " + person.appointments[i].job_title + " at " + person.appointments[i].organization;
        }
        return message;
    } else {
        return "No data found";
    }
}

function performLookup(params, msg) {
    var url = "https://directory.osu.edu/fpjson.php?";

    for (var ident in params) {
        url = url.concat(ident + "=");
        url = url.concat(encodeURIComponent(params[ident]));
        url = url.concat("&")
    }

    // OK, this is a little weird
    request({
        url: url,
        headers: {
            'User-Agent': 'Ganton by J3RN'
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_response = JSON.parse(body);

            person = json_response[0];
            msg.reply(formatPerson(person));
        } else if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });
}
