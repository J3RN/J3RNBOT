// Description:
//   Counts pizza votes
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   .vote <item> - Adds a vote for that item
//   .votes - Shows all votes
//   .count - Output the count of all votes
//   .whitelist - Add someone to the whitelist
//   .unwhitelist - Remove someone from the whitelist
//   .vote-as - Add a vote for a user other than yourself
//
// Author:
//   J3RN

'use strict';

module.exports = (robot) => {
    const MASTER = "J3RN";

    // Utility functions
    const getVotes = () => robot.brain.get("votes") || {}

    const getWhitelist = () => robot.brain.get("whitelist") || []

    const printVotes = (msg) => {
        const votes = getVotes();

        if (Object.keys(votes).length == 0) {
            msg.send("No votes!");
        } else {
            const keys = Object.keys(votes);
            const values = keys.map((e) => votes[e]);
            let counts = {};

            // For each value, increment it's count
            values.forEach((e) => {
                if (counts[e]) {
                    counts[e]++;
                } else {
                    counts[e] = 1;
                }
            });

            msg.send(Object.keys(counts).map((x) => {
                return x + ": " + counts[x];
            }).join(", "));
        }
    }

    const isMasterOrError = (msg) => {
        if (msg.message.user.name.toLowerCase() == MASTER.toLowerCase()) {
            return true;
        } else {
            msg.reply(`Only ${MASTER} can do that!`);
        }
    }

    const isWhitelistedOrError = (msg) => {
        if (getWhitelist().map((e) => e.toLowerCase()).indexOf(msg.message.user.name.toLowerCase()) !== -1) {
            return true;
        } else {
            msg.reply("You are not whitelisted!");
        }
    }

    const vote = function(user, item, msg) {
        const votes = getVotes();
        if (votes[user]) {
            msg.send("Changing vote from " + votes[user] + " to " + item);
        }
        votes[user] = item;

        robot.brain.set("votes", votes);

        printVotes(msg);
    }

    const rmvote = function(user, msg) {
        const votes = getVotes();
        if (votes[user]) {
            const vote = votes[user];
            delete votes[user];
            msg.send(`Vote for ${vote} removed!`);
            robot.brain.set("votes", votes);
        } else {
            msg.reply("You have not voted yet!");
        }

        printVotes(msg);
    }

    // Bot callbacks
    robot.hear(/\.vote (\w+)/, (msg) => {
        const item = msg.match[1];
        const user = msg.message.user.name;

        if (isWhitelistedOrError(msg)) {
            vote(user, item, msg);
        }
    });

    robot.hear(/\.vote-as (\S+) (\S+)/, (msg) => {
        const sender = msg.message.user.name;
        const user = msg.match[1];
        const item = msg.match[2];

        if (isMasterOrError(msg)) {
            vote(user, item, msg);
        }
    });

    robot.hear(/\.rmvote/, (msg) => {
        const user = msg.message.user.name;

        if (isWhitelistedOrError(msg)) {
            rmvote(user, msg);
        }
    });

    robot.hear(/\.rmvote-as (\S+)/, (msg) => {
        const votes = getVotes();
        const user = msg.match[1];

        if (isMasterOrError(msg)) {
            rmvote(user, msg)
        }
    });

    robot.hear(/\.votes/, (msg) => {
        printVotes(msg);
    });

    robot.hear(/\.clear/, (msg) => {
        if (isMasterOrError(msg)) {
            robot.brain.set("votes", {});
            msg.send("Votes cleared!");
        }
    });

    robot.hear(/.whathaveyoudone (\S+)/i, (msg) => {
        const votes = getVotes();
        const user = msg.match[1];

        if (votes[user]) {
            msg.send(votes[user]);
        } else {
            msg.send(`${user} has not voted`);
        }
    });

    robot.hear(/\.whodunnit (\S+)/i, (msg) => {
        const votes = getVotes();
        const item = msg.match[1];

        const voters = Object.keys(votes).filter((key) => {
            return votes.hasOwnProperty(key) && votes[key] == item;
        });

        if (voters.length === 0) {
            msg.send(`No one has voted for ${item}`)
        } else {
            msg.send(`${voters.join(", ")} voted for ${item}`);
        }
    });

    robot.hear(/\.whitelist (\S+)/, (msg) => {
        const user = msg.match[1];
        const whitelist = getWhitelist();

        if (isMasterOrError(msg)) {
            if (whitelist.indexOf(user) === -1) {
                whitelist.push(user);
                robot.brain.set("whitelist", whitelist);
                msg.send(`${user} whitelisted!`);
            } else {
                msg.send(`${user} is already whitelisted!`);
            }
        }
    });

    robot.hear(/\.unwhitelist (\S+)/, (msg) => {
        const user = msg.match[1];
        const whitelist = getWhitelist();

        if (isMasterOrError(msg)) {
            // Filter out the given user
            newWhitelist = whitelist.filter((e) => e !== user);

            if (newWhitelist.length != whitelist.length) {
                robot.brain.set("whitelist", newWhitelist);
                msg.send(`${user} unwhitelisted!`);
            } else {
                msg.send(`${user} was never whitelisted!`);
            }
        }
    });
}
