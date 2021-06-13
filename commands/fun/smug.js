const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "mantiten",
  description: "Smug",
  category: "maintenance",
  run: async (client, args, message) => {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then(res =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  }
};
