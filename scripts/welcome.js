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
  robot.enter((msg) => {
    msg.send "Just a small town bot..."
  });
}
