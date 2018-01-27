const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const ms = require('ms')
module.exports.run = (client, message, args, data, game, announcement) => {

    var messagecontent = message.content.split(' ').slice(1).join(' ')
var muteMember = message.guild.member(message.mentions.users.first());
const muteRole = message.guild.roles.find('name', 'Muted by SUNSET')
const modlog = message.guild.channels.find('name', 'mod-log');

if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You must have the `MANAGE_CHANNELS` permission')
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have the `MANAGE_CHANNELS` permission')

if(muteMember.length < 1) return message.channel.send('Please provide a member to mute')
if(!muteMember) return message.channel.send('That user does not exist')

if(!muteRole) {
    message.guild.createRole({
        name: 'Muted by SUNSET',
        color: 'ORANGE',
        SEND_MESSAGES: false,
        SEND_TTS_MESSAGES: false,
      })
        .then(role => {
            var createdrole = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setTitle('Created Role')
            .setDescription(`Created role ${role}`)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            message.channel.send({embed: createdrole})
        })
        .catch(err => {
            message.channel.send('An error occured while attempting make the mute role ' + err)
        })
}
    var unmutedmember = new Discord.RichEmbed()
        .setColor(data.embedcolor)
        .setTitle('UnMuted')
        .setDescription('Unmuted ' + muteMember)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        var unmuteerror = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription(muteMember + ' is not muted.')
        if(!muteMember.roles.has(muteRole.id)) {
            return message.channel.send({embed: unmuteerror})
        }

muteMember.removeRole(muteRole)
    .then(() => {
        message.channel.send({embed: unmutedmember})
        muteMember.send({embed: unmutedmember})
    })
    .catch(err => {
    message.channel.send('An error occured: ' + err)
})


}
module.exports.help = {
    name: "unmute",
    info: "Unmute an already muted member",
    usage: "unmute <@user>"
}