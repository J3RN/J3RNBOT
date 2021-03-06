# Description:
#   Says "JUST DO IT" when you're not motivated
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   gain motivation - Make hubot inspirational
#   "I wish...", "I want...", etc - An inspirational quote
#   lose motivation - Make hubot not inspirational anymore
#
# Author:
#   J3RN

module.exports = (robot) ->
  responses = [
    "DON'T LET YOUR DREAMS BE DREAMS!",
    "JUST DO IT!",
    "YESTERDAY YOU SAID TOMORROW!",
    "JUST... JUST DO IT!"
  ]

  amMotivational = true

  robot.hear /^I (?:really )?(want|wish)/i, (msg) ->
    msg.reply msg.random responses if amMotivational

  robot.respond /lose motivation/, (msg) ->
    amMotivational = false
    msg.send "Maybe it'll get done tomorrow..."

  robot.respond /gain motivation/, (msg) ->
    amMotivational = true
    msg.send msg.random responses
