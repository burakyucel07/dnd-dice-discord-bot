const { createClient } = require('./components/client');
const { keepAlive } = require('./components/server');
const { tokenizeCommand, interpretTokens, isCommandLegit } = require('./components/parser');
const { debugLog, log } = require('./components/logger');
const { generateRandomNumberBetween } = require('./components/random');

const accessToken = process.env.ACCESS_TOKEN
const client = createClient();

const dndEmojis = [
  '🐉', '⚔️', '🏰', '🧙🏻‍♂️', '🏹', '🐲',
  '👸', '🧚‍♀️', '🧜🏿‍♀️', '🧙🏼', '🧛', '🧜🏽‍♂️',
  '🧝🏼‍♀️', '🗡', '💎', '💰', '💍', '🧞',
  '🧞‍♀️', '👹', '🦄', '🦹🏽‍♂️', '🦇', '📜',
  '🛡️', '🧟',
];

client.on('ready', (c) => {
  const username = c.user.tag;
  log(`Logged in as ${username}.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (isCommandLegit(message.content)) {
    const commandTokens = tokenizeCommand(message.content);
    const diceTosses = interpretTokens(commandTokens);

    let replyMessage = "";
    diceTosses.forEach((item, index, arr) => {

      const dndEmoji = dndEmojis[generateRandomNumberBetween(0, dndEmojis.length - 1)];
      replyMessage += `🎲${dndEmoji} `;
      if (item.name !== undefined) {
        replyMessage += `${item.name}: `;
      }

      if (item.firstOrNumber !== undefined && item.secondOrNumber !== undefined) {
        replyMessage += `d${item.firstOrNumber} and d${item.secondOrNumber} dices are thrown. `;
        replyMessage += `d${item.firstOrNumber} result is ${item.firstOrNumberResult}, `;
        replyMessage += `d${item.secondOrNumber} result is ${item.secondOrNumberResult}. `;
        replyMessage += `${item.diceNumberResult} one is selected.`;
      } else {
        replyMessage += ` d${item.diceType} result is ${item.diceNumberResult}.`;
      }

      if (item.selectedNumberWon !== undefined) {
        if (item.selectedNumberWon) {
          replyMessage += ' Dice throw is successful.';
        } else {
          replyMessage += " Dice throw is unsuccessful.";
        }

      }
      replyMessage += '\n';
    });

    message.reply(replyMessage);
  } else if (message.content.startsWith("!dice ")) {
    message.reply("Your !dice command is incorrect.");
  }
});

keepAlive();
client.login(accessToken);
