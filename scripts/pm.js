// Description:
//   PM's you as a Service
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot pm me
//
// Author:
//   J3RN

'use strict';

module.exports = (robot) => {
    const yes = (str) => {
        const lowerStr = str.toLowerCase();
        return lowerStr === "yes" || lowerStr === "y" || lowerStr === "sure";
    }

    const private_message = (msg) => {
        return msg.message.room === undefined;
    }

    robot.respond(/pm me/, (msg) => {
        const today = new Date();
        msg.sendPrivate(`Hi! The time is currently ${today.toISOString()}.`);
        msg.sendPrivate("Would you like a newspaper and coffee?");

        robot.brain.set('coffee_recipient', msg.message.user.name);
    });

    robot.respond(/(.*)/, (msg) => {
        if (private_message(msg) && msg.message.user.name === robot.brain.get('coffee_recipient')) {
            if (yes(msg.match[1])) {
                msg.send('+------------+');
                msg.send('| THE TIMES  |');
                msg.send('| ~ ~~~ ~~ ~ |');
                msg.send('| ~ ~~~ ~~ ~ |');
                msg.send('\\ ~ ~~~ ~~ ~ \\    ;)( ;');
                msg.send(' | ~ ~~~ ~~ ~ |   :----:');
                msg.send(' | ~ ~~~ ~~ ~ |  C|====|');
                msg.send(' | ~ ~~~ ~~ ~ |   |    |');
                msg.send(' +------------+   `----\'');
            } else {
                msg.send('OK then');
            }

            robot.brain.set('coffee_recipient', '');
        }
    });
}

