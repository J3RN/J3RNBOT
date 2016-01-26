# Description:
#   Sends me a text when I am mentioned
#
# Dependencies:
#   twilio
#
# Configuration:
#   TWILIO_AUTHTOKEN
#
# Commands:
#   *J3RN* - Replies respectfully
#
# Author:
#   J3RN

module.exports = (robot) ->
  client = require('twilio')()

  robot.hear /j3rn(?!bot)/i, (msg) ->
    client.messages.create({
      to: process.env.RECIPIENT,
      from: process.env.SENDER,
      body: msg.message.room + "> " + msg.message.user.name + "> " + msg.message.text,
    }, (err, message) ->
      msg.send(JSON.stringify(err)) if (err)
    )

    msg.reply "Praise be unto him!"
