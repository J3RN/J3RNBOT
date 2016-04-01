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
//
// Author:
//   J3RN

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
            msg.send(keys.map((x) => {
                return x + ": " + votes[x];
            }).join(", "));
        }
    }

    const doIfCond = (checkFun, errMsg) => {
        return (msg, fun) => {
            if (checkFun(msg)) {
                fun(msg);
            } else {
                msg.reply(errMsg);
            }
        }
    }

    const doIfMaster = doIfCond(
            (msg) => msg.message.user.name.toLowerCase() == MASTER.toLowerCase(),
            `Only ${MASTER} can do that!`);

    const doIfWhitelisted = doIfCond(
            (msg) => getWhitelist().map((e) => e.toLowerCase()).indexOf(msg.message.user.name.toLowerCase()) !== -1,
            "You are not whitelisted!");

    // Bot callbacks
    robot.hear(/\.vote (\w+)/, (msg) => {
        const item = msg.match[1];
        const votes = getVotes();
        const user = msg.message.user.name;

        doIfWhitelisted(msg, () => {
            if (votes[user]) {
                msg.send("Changing vote from " + votes[user] + " to " + item);
            }
            votes[user] = item;

            robot.brain.set("votes", votes);

            printVotes(msg);
        });
    });

    robot.hear(/\.rmvote/, (msg) => {
        const votes = getVotes();
        const user = msg.message.user.name;

        doIfWhitelisted(msg, () => {
            if (votes[user]) {
                const vote = votes[user];
                msg.send(`Vote for ${vote} removed!`);
                robot.brain.set("votes", votes);
            } else {
                msg.reply("You have not voted yet!");
            }

            printVotes(msg);
        });
    });

    robot.hear(/\.votes/, (msg) => {
        printVotes(msg);
    });

    robot.hear(/\.clear/, (msg) => {
        doIfMaster(msg, (msg) => {
            robot.brain.set("votes", {});
            msg.send("Votes cleared!");
        });
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

        doIfMaster(msg, (msg) => {
            if (whitelist.indexOf(user) === -1) {
                whitelist.push(user);
                robot.brain.set("whitelist", whitelist);
                msg.send(`${user} whitelisted!`);
            } else {
                msg.send(`${user} is already whitelisted!`);
            }
        });
    });

    robot.hear(/\.unwhitelist (\S+)/, (msg) => {
        const user = msg.match[1];
        const whitelist = getWhitelist();

        doIfMaster(msg, (msg) => {
            // Filter out the given user
            newWhitelist = whitelist.filter((e) => e !== user);

            if (newWhitelist.length != whitelist.length) {
                robot.brain.set("whitelist", newWhitelist);
                msg.send(`${user} unwhitelisted!`);
            } else {
                msg.send(`${user} was never whitelisted!`);
            }
        });
    });
}
