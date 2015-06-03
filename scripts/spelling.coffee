# Description:
#   Corrects incorrectly spelled words
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   spell: <sentence to correct>
#   addword: <word to add>
#
# Author:
#   J3RN

fs = require 'fs'

words = fs.readFileSync('./words').toString().split('\n').map((word) -> return word.toLowerCase())

module.exports = (robot) ->

  robot.hear /spell: ((?:\w+\s*)+)/g, (msg) ->
    said_words = msg.match[0].split(/\s/)
    said_words.shift()
    said_words = said_words.map (word) -> return word.toLowerCase()

    said_words.forEach((word) ->
      if words.indexOf(word) == -1
        msg.send word + ' is spelled wrong'
    )

  robot.hear /addword: (\w+)/, (msg) ->
    said_words = msg.match[0].split(/\s/)
    word = said_words[1]

    fs.appendFile('./words', word + '\n', (err) ->
      if (err)
        throw err

      msg.send word + " added!"
    )

