// Description:
//   Boops your beep
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   beep - boop!
//
// Author:
//   J3RN

module.exports = (robot) => {
    robot.respond(/beep$/i, (msg) => {
        msg.reply("boop!");
    });
}
