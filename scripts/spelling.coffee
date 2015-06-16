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

module.exports = (robot) ->
  robot.brain.set 'dict-words', fs.readFileSync('./words').toString().split('\n').map((word) -> return word.toLowerCase())

  # Word 1 is priority, word 2 is for comparison
  bigram_compare = (word1, word2) ->
    bigramate = (word) ->
      bigrams = []
      bigrams.push word.slice(i, i + 2) for i in [0..(word.length - 2)]
      return bigrams

    word1_bigrams = bigramate(word1)
    word2_bigrams = bigramate(word2)

    num_matching_bigrams = word1_bigrams.reduce((prev, current, index, array) ->
      return prev + (word2_bigrams[index] == current ? 1 : -1)
    , 0)

    return num_matching_bigrams / word1_bigrams.length

  find_closest = (word) ->
    sorted_words = robot.brain.get('dict-words').sort (a, b) ->
      return bigram_compare(word, b) - bigram_compare(word, a)

    return sorted_words[0]

  robot.hear /spell: ((?:\w+\s*)+)/g, (msg) ->
    said_words = msg.match[0].split(/\s/)
    said_words.shift()
    said_words = said_words.map (word) -> return word.toLowerCase()

    bad_count = 0
    said_words.forEach((word) ->
      if robot.brain.get('dict-words').indexOf(word) == -1
        bad_count++
        msg.send word + ' is spelled wrong. Did you mean ' + find_closest(word) + '?'
    )

    if bad_count == 0
      msg.reply "Looks good to me!"

  robot.hear /addword: (\w+)/, (msg) ->
    said_words = msg.match[0].split(/\s/)
    word = said_words[1]

    dict_words = robot.brain.get 'dict-words'
    dict_words.push(word)
    robot.brain.set 'dict-words', dict_words

    msg.send word + ' added to brain'
