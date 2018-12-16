// Description:
//   sandbox - run javascript in a sandbox!
//
// Dependencies:
//   "sandbox": "0.8.3"
//
// Configuration:
//   None
//
// Commands:
//   (run|sandbox|js) <javascript> - Execute the javascript code
//
// Author:
//   ajacksified
//   Port to JavaScript by J3RN
//

var Sandbox = require('sandbox')

module.exports = (robot) => {
    robot.hear(/^(run|sandbox|js) (.*)/i, msg => {
        var sandbox = new Sandbox();
        sandbox.run(msg.match[2], output => msg.send(output.result));
    });
}
