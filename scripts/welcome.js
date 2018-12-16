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

messages = [
    "Just a small town bot",
    "Gonna take a sentimental J3RNI",
];

module.exports = (robot) => {
    robot.enter((res) => {
        res.send(res.random(messages));
    });
}
