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
//   jingweno

module.exports = (robot) => {
    messages = [
        "Just a small town bot",
        "Gonna take a sentimental J3RNI",
    ];

    robot.enter((msg) => {
        msg.send(messages[Math.floor(Math.random() * messages.length)]);
    });
}
