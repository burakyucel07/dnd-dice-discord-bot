const { debugLog, log } = require('./logger');
const { generateRandomNumberBetween } = require('./random');

const commandLegitPattern = /^(!dice)([ ]{1,}d(4|6|8|10|12|20|100)([\|]{1}d(4|6|8|10|12|20|100))*([<>][0-9]{1,3})*([:]\w+)*)+$/;

function tokenizeCommand(commandText) {
  const commandTokens = commandText.trim().split(/\s+/).slice(1);
  log(`Command Tokens for "${commandText}": ${commandTokens}`);
  return commandTokens;
}

function interpretTokens(commandTokens) {
  const diceTosses = [];

  commandTokens.forEach((item, index, arr) => {
    const toss = {};

    let tokens = item.split(':');
    if(tokens[1]) {
      toss.name = tokens[1];
    }

    tokens = tokens[0].split('>');
    if(tokens[1]) {
      toss.greaterThanNumber = tokens[1];
    }

    tokens = tokens[0].split('<');
    if(tokens[1]) {
      toss.lesserThanNumber = tokens[1];
    }

    tokens = tokens[0].split('|');
    if(tokens[1]) {
      toss.firstOrNumber = tokens[0].split('d')[1];
      toss.secondOrNumber = tokens[1].split('d')[1];
      
      toss.firstOrNumberResult = generateRandomNumberBetween(1, toss.firstOrNumber);
      toss.secondOrNumberResult = generateRandomNumberBetween(1, toss.firstOrNumber);

      toss.diceNumberResult = Math.max(toss.firstOrNumberResult, toss.secondOrNumberResult);
      
    }

    toss.diceType = tokens[0].split('d')[1];
    toss.diceNumberResult = generateRandomNumberBetween(1, toss.diceType);

    if (toss.greaterThanNumber) {
      toss.selectedNumberWon = toss.diceNumberResult > toss.greaterThanNumber;
    } else if (toss.lesserThanNumber) {
      toss.selectedNumberWon = toss.diceNumberResult < toss.lesserThanNumber;
    }

    debugLog(toss);
    
    diceTosses.push(toss);
  });

  return diceTosses;
}

function isCommandLegit(commandText) {
  return commandLegitPattern.test(commandText);
}

module.exports = {
  tokenizeCommand,
  interpretTokens,
  isCommandLegit,
};
