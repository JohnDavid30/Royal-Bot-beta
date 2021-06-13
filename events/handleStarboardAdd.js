module.exports = async client => {
  client.on("messageReactionAdd", async (reaction, user) => {
    let { guild } = reaction.message;
    let ss = client.db.get(`handleStarboard_${guild.id}`);
    let sender = client.channels.cache.get(ss);
    const handleStarboard = async () => {
      const SBChannel = client.channels.cache.find(
        channel => channel.name === sender.name
      );
      const msgs = await SBChannel.messages.fetch({ limit: 100 });
      const SentMessage = msgs.find(msg =>
        msg.embeds.length === 1
          ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
            ? true
            : false
          : false
      );
      if (SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
      else {
        const embed = new client.discord.MessageEmbed()
          .setAuthor(
            reaction.message.author.tag,
            reaction.message.author.displayAvatarURL()
          )
          .setDescription(
            `**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`
          )
          .setColor("YELLOW")
          .setFooter(reaction.message.id)
          .setTimestamp();
        if (SBChannel) SBChannel.send("1 - ⭐", embed);
      }
    };
    if (reaction.emoji.name === "⭐") {
      let { guild } = reaction.message;
      let ss = client.db.get(`handleStarboard_${guild.id}`);
      let sender = client.channels.cache.get(ss);
      if (reaction.message.channel.name.toLowerCase() === sender.name) return;
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        handleStarboard();
      } else handleStarboard();
    }
  });
};
