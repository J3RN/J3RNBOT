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

    robot.listen(
            (message) => {
                return message.constructor.name == "EnterMessage" && message.user.id === robot.name;
            },
            (response) => {
                response.send(messages[Math.floor(Math.random() * messages.length)]);
            });
}
