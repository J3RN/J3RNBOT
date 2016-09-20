// Description:
//   Sends me a text when I am mentioned
//
// Dependencies:
//   request
//
// Configuration:
//   PUSHBULLET_ACCESS_TOKEN
//
// Commands:
//   *J3RN* - sends a push to the configured account
//
// Author:
//   J3RN

module.exports = (robot) => {
    var request = require('request');
    var context = {};

    const enqueueMessage = (msg) => {
	const room = msg.message.room;
	const text = msg.message.text;
	const user = msg.message.user.name;

	if (!Object.keys(context).includes(room)) {
	    context[room] = [];
	}

	context[room].push([user, text]);
	if (context[room].length > 5) {
	    context[room].shift();
	}
    }

    const pushContext = (msg) => {
	const room = msg.message.room;
	const message = context[room].reduce((acc, x) => {
	    return acc + "\n" + x[0] + ": " + x[1];
	}, "");

	request.post({
	    url: 'https://api.pushbullet.com/v2/pushes',
	    headers: {
		'Access-Token': process.env.PUSHBULLET_ACCESS_TOKEN,
		'Content-Type': 'application/json'
	    },
	    form: {
		body: message,
		title: "Message from J3RNBOT",
		type: 'note'
	    }
	}).on('error', (error) => {
	    msg.reply(error);
	});
    }

    robot.hear(/.*/, (msg) => {
	enqueueMessage(msg);

	if (msg.message.match(/j3rn/i)) {
	    pushContext(msg);
	}
    });
}
