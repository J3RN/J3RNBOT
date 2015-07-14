# Description:
#   Simply replies "IO" to most versions of "OH"
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   OH! - IO!
#
# Author:
#   J3RN

module.exports = (robot) ->

  robot.hear /^\s*o\W*h\W*\s*$/i, (msg) ->
    msg.send "IO!"
    robot.brain.set("ios", robot.brain.get("ios") + 1)

  robot.hear /^.ios/, (msg) ->
    msg.send robot.brain.get("ios") + " IOs have been dealt"
