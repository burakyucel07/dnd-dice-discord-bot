const { Client, IntentsBitField } = require('discord.js');

function createClient() {
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
  });

  return client;
}

module.exports = {
  createClient,
};
