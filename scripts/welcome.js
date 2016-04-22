// Description:
//   Just says hey
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   None
//
// Author:
//   J3RN

module.exports = (robot) => {
    messages = [
        "Just a small town bot",
        "Gonna take a sentimental J3RNI",
    ];

    process.env.HUBOT_IRC_ROOMS.split(',').forEach((room) => {
        robot.messageRoom(room, messages[Math.floor(Math.random() * messages.length)]);
    });
}
