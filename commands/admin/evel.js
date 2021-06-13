const { MessageEmbed } = require('discord.js')

const owner = "740947753135243354"//||"767726828311543820"
module.exports = {
        name: "eval",
        description: "Evaluates js code",
        category: "owner",
        aliases: ["e"],
        args: true,
        usage: 'eval <input>',
    run: async (client, message, args) => {
       if (message.author.id != owner) {return }
 
        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
  
        try {
            const code = args.join(" ").replace("@","")//.replace(`client.token`,"​client.token").replace(`client.user.setStatus`,"​client.user.setStatus").replace(`client.user.setUsername`,"​client.user.setUsername").replace(`client.user.setAvatar`,"​client.user.setAvatar").replace(`client.user.setActivity`,"​client.user.setActivity").replace(`client.user.setPresence`,"​client.user.setPresence");//.replace(`client.user.setUsername`,"​").replace(`client.user.setUsername`,"​").replace(`client.user.setUsername`,"​").replace(`client.user.setUsername`,"​");
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            message.react("✅");
            var emb = new MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send(emb);
        } catch (err) {
            message.react("⚠");
            var emb = new MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send(emb);
        }
    }
}
