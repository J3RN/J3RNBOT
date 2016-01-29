// Description:
//   Praises J3RN
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   *J3RN* - Praise be unto him!
//
// Author:
//   J3RN

module.exports = (robot) => {
    robot.hear(/j3rn(?!bot)/i, (msg) => {
        if (robot.brain.get('praise') === true) {
            msg.reply("Praise be unto him!");
        }
    });

    robot.respond(/praise J3RN!/, (msg) => {
        robot.brain.set('praise', true);
        msg.reply("Praise be unto him!");
    });

    robot.respond(/stop praising!/, (msg) => {
        robot.brain.set('praise', false);
        msg.reply("OK... :(");
    });
}
