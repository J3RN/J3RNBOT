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
#   *J3RN*
#
# Author:
#   J3RN

module.exports = (robot) ->
  # Twilio Credentials
  accountSid = 'ACddde4590a270805e77f6f5e63dc8a42c'
  authToken = process.env.TWILIO_AUTHTOKEN

  # require the Twilio module and create a REST client
  client = require('twilio')(accountSid, authToken)

  robot.hear /j3rn/i, (msg) ->
    client.messages.create({
      to: "5133071935",
      from: "+18599558282",
      body: msg,
    }, (err, message) ->
      msg.send(message.sid)
    )

    msg.reply "Praise be unto him!"
