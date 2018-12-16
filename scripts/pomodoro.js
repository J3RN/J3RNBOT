// Description:
//   Have Robot Overlord orchestrate group Pomodoro sessions
//
// Dependencies:
//
// Configuration:
//
// Commands:
//   hubot start timer
//   hubot stop timer
//
// Notes:
//
// Author:
//   J3RN

module.exports = (robot) => {
    var twenty_five_minutes = 25 * 60 * 1000;
    var fifteen_minutes = 15 * 60 * 1000;
    var five_minutes = 5 * 60 * 1000;

    var pomodoroEnabled = false;
    var pomodoroCount = 0;
    var timeout = null;

    function workNotify(msg) {
	msg.send("Work time!");
	msg.send("Reply 'stop timer' to stop.");
	timeout = setTimeout(breakNotify, twenty_five_minutes, msg);
    }

    function breakNotify(msg) {
	msg.send("Break time!");
	msg.send("Reply 'stop timer' to stop.");
	pomodoroCount++;
	if (pomodoroCount % 4 == 0) {
	    timeout = setTimeout(workNotify, fifteen_minutes, msg);
	} else {
	    timeout = setTimeout(workNotify, five_minutes, msg);
	}
    }

    robot.respond(/start timer/i, (msg) => {
	if (pomodoroEnabled) {
	    msg.send("We're already working here!");
	} else {
	    pomodoroEnabled = true;
	    workNotify(msg);
	}
    });

    robot.respond(/stop timer/i, (msg) => {
	if (pomodoroEnabled) {
	    pomodoroEnabled = false;
	    clearTimeout(timeout);
	    msg.send("Timer stopped!");
	} else {
	    msg.send("Who's working? We're not working.");
	}
    });
}
