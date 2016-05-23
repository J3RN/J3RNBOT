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
    robot.respond(/pm me/, (msg) => {
        const channel = msg.send({user: {name:  msg.message.user.name}}, "HI!");
    });
}

