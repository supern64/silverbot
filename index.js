/* SILVERBOTv1 VERSION 1.0.0
MIT LICENSE STARTS HERE:
Copyright 2018-2019 chanonlim (SuperNiintendo)/RaZeFeiXX

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT LICENSE ENDS HERE
*/
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true})
const settings = require('./settings.json');
const gamename = settings.game
const botstatus = settings.status
const dbr = require("dbrlib")
const gm = require("gm").subClass({imageMagick: true})
const fs = require("fs")
var im = require('imagemagick');
const ytdl = require('ytdl-core');
const Jimp = require("jimp")
const dbrbot = new dbr.dbrbot()
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const prefix =  settings.prefix
const password = settings.password
const ytSearch = require("yt-search")
const urban = require('relevant-urban');
const muscii = require("discord.js-music-v11")
const snek = require("snekfetch");
const package = require("./package.json")
const request = require("request")

let talkedRecently = new Set();
let ratedrec = new Set();
let issuereport = new Set()
if (!fs.existsSync("finished")) fs.mkdirSync("finished")
if (!fs.existsSync("customcom")) fs.mkdirSync("customcom")
if (!fs.existsSync("widget")) fs.mkdirSync("widget")
if (!fs.existsSync("customcom/prefix")) fs.mkdirSync("customcom/prefix")
if (!fs.existsSync("customcom/com")) fs.mkdirSync("customcom/com")
if (!fs.existsSync("blacklisted")) fs.mkdirSync("blacklisted")
if (!fs.existsSync("poll")) fs.mkdirSync("poll")
if (!fs.existsSync("musicsettings")) fs.mkdirSync("musicsettings")
if (!fs.existsSync("config")) fs.mkdirSync("config")
if (!fs.existsSync("antialt")) fs.mkdirSync("antialt")
if (!fs.existsSync("antiads")) fs.mkdirSync("antiads")
if (!fs.existsSync("music")) fs.mkdirSync("music")
if (!fs.existsSync("tags")) fs.mkdirSync("tags")
if (!fs.existsSync("tagowner")) fs.mkdirSync("tagowner")
if (!fs.existsSync("poll/num")) fs.mkdirSync("poll/num")
if (!fs.existsSync("poll/ques")) fs.mkdirSync("poll/ques")
if (!fs.existsSync("poll/votes")) fs.mkdirSync("poll/votes")
if (!fs.existsSync("accounts")) fs.mkdirSync("accounts")
if (!fs.existsSync("subscribers")) fs.mkdirSync("subscribers")
if (!fs.existsSync("accpublic")) fs.mkdirSync("accpublic")
if (!fs.existsSync("subbing")) fs.mkdirSync("subbing")
if (!fs.existsSync("subdm")) fs.mkdirSync("subdm")
if (!fs.existsSync("img")) fs.mkdirSync("img")
if (!fs.existsSync("img/gdrunk")) fs.mkdirSync("img/gdrunk")
if (!fs.existsSync("img/weird")) fs.mkdirSync("img/weird")
if (!fs.existsSync("userads")) fs.mkdirSync("userads")
if (!fs.existsSync("modsetting")) fs.mkdirSync("modsetting")
if (!fs.existsSync("modchannel")) fs.mkdirSync("modchannel")
if (!fs.existsSync("cases")) fs.mkdirSync("cases")
if (!fs.existsSync("names")) fs.mkdirSync("names")
if (!fs.existsSync("casename")) fs.mkdirSync("casename")
if (!fs.existsSync("color")) fs.mkdirSync("color")
//---------------------------------------------------------------------------------------------------
bot.on('ready', async() => {
    var app = await bot.fetchApplication()
    global.ownerID = app.owner.id
    global.botID = bot.user.id
    var text = gamename
    var values = {
        servers: bot.guilds.size,
        users: bot.users.size
    }
    var games = text !== null && text !== undefined ? text.replace(/\{\{([^}]+)\}\}/g, function(i, match) { return values[match] }) : null
    var datetoday = new Date()
    var days = datetoday.getDate()
    var month = datetoday.getMonth() + 1
    var year = datetoday.getFullYear()
    var time1 = datetoday.getSeconds()
    var time2 = datetoday.getHours()
    var time3 = datetoday.getMinutes()
    muscii(bot, {prefix: settings.prefix})
    fs.writeFileSync('./botstart.txt', days + "." + month + "." + year + " \n" + time2 + ":" + time3 + ":" + time1)
    console.log("------ SilverBotv1 ------")
    console.log("Logged in as  " + bot.user.username + "#" + bot.user.discriminator)
    console.log("Server Count: " + bot.guilds.size)
    console.log("Prefix: " + settings.prefix)
    console.log("Add your bot with this url: " + `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=909241430` + "\n" + "\n")
    if (games) {
      bot.user.setPresence({ game: { name: games, type: 0 } });
    }
    bot.user.setStatus(settings.status)
});

bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    const mentionprefix = message.guild.member(botID).toString()
    fs.readFile(`./blacklisted/${message.author.id}/black.txt`, function(err, data) {
        if(data === "true") return;
    })
    if (command === `${prefix}btext` || command === `${prefix}btext`) {
      const what = args.join(' ')
      const btext = what.replace(/[bg]/gi, ":b:")
      message.channel.send(btext)
    }
    if(command === `${prefix}dbrwidget`) {
      const who = message.mentions.users.first()
      dbrbot.getwidget(who.id, "./widget/" + who.id)
        .then(r=> {
          message.channel.send({file: "./widget/" + who.id + ".png"})
        });
    }
    if (command === `${prefix}setregion` || command === `${prefix}setregion`) {
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("`You don't have 'MANAGE_GUILD' permission`")
      if (!message.guild.member(bot.user.id).hasPermission("MANAGE_GUILD")) return message.channel.send("`I need 'MANAGE_GUILD' permission to execute this command`")
      const what = args.join(' ')
      if(what.length <1) return message.channel.send("`Provide a region`")
      message.guild.setRegion(what).catch(err=> {
        if(err) return message.channel.send("`Error, regions can be: 'japan', 'singapore', 'eu-central', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia'`")
      });
      message.channel.send("`Region has been set to " + what + "`")
    }
    if (command === `${prefix}blacklist` || command === `${mentionprefix}blacklist`) {
      if(message.author.id !== ownerID) return;
      const who = args[0]
      const who2 = args.slice(1).join(' ')
      var dir = `./blacklisted/${who}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.writeFile(`./blacklisted/${who}/black.txt`,"true", function(err) {
        fs.writeFile(`./blacklisted/${who}/reason.txt`, who2, function(err) {
            let se = bot.users.get(who).send("`" + "Hello, You have been added to " + bot.user.username + "'s blacklist for the following reason: " + who2 + " / This means you are no longer permitted to use the bot. If you think this was unfair/wish to get un-blacklisted, please contact bot owner." + "`")
            if(!se) return;
            message.channel.send("`" + "user was blacklisted" + "`")
            setTimeout(function() {
              let lol = bot.guilds.filter(r=> r.owner.id === who)
              lol.forEach(async(guild, id) => {
                guild.leave()
              });
            }, 1000);
        });
      });
    }
    if (command === `${mentionprefix}unblacklist` || command === `${prefix}unblacklist`) {
      if (message.author.id !== ownerID) return;
      var dir = `./blacklisted/${message.author.id}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const who = args[0]
      const who2 = args.slice(1).join(' ')
      fs.unlink(`./blacklisted/${who}/black.txt`, function(err) {
        fs.unlink(`./blacklisted/${who}/reason.txt`, function(err) {
          let se = bot.users.get(who).send("`" + "You have been removed from " + bot.user.username + "'s blacklist, you can now use the bot again!" + "`")
          if(!se) return;
          message.channel.send("`" + "user was unblacklisted" + "`")
        });
      });
    }
    if (command === `${mentionprefix}setgame` || command === `${prefix}setgame`) {
        if (message.author.id !== ownerID) return message.channel.send("`" + " Bot Owner only" + "`")
        const what = args.join(' ')
        var text = what
        var values = {
            servers: bot.guilds.size,
            users: bot.users.size
        }
        var games = text.replace(/\{\{([^}]+)\}\}/g, function(i, match) {
            return values[match]
        });
        bot.user.setPresence({ game: { name: what, type: 0 } });
        message.channel.send("`" + "Game set!" + "`")
    }
    if (command === `${prefix}setstatus`) {
        if (message.author.id !== ownerID) return message.channel.send("`" + " Bot Owner only" + "`")
        const what = args.join(' ')
        bot.user.setStatus(what)
        message.channel.send("`" + "Status set!" + "`")
    }
    if (command === `${prefix}eval` || command === `${mentionprefix}eval`) {
        if (message.author.id !== ownerID) return message.channel.send("Only the bot owner can use this command")
        const that = message.content.split(" ").slice(1);
        try {
          const code = args.join(" ");
          let evaled = eval(code);
          if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
          }
          const ss = new Discord.RichEmbed()
          .setDescription("**EVAL**")
          .setColor('GREEN')
          .addField("INPUT", "```" +code + "```")
          .addField("OUTPUT", "```" + (evaled) + "```")
          return message.channel.send(ss)
        } catch (e) {
          console.log(e.stack);
          const err = new Discord.RichEmbed()
          .setDescription("**ERROR**")
          .setColor('RED')
          .addField("Error:", e)
          return message.channel.send(err)
        }
      }
      if (command === prefix + "ginvite" || command === mentionprefix + "ginvite") {
        const what = args.join(' ')
        if(what.length <1) return message.channel.send("`Please input a client ID`")
        bot.fetchUser(what)
        .then(r=> {
          const embed = new Discord.RichEmbed()
          .setDescription("Add " + r.tag + " to your server here")
          .addField("Bot: ", r.tag)
          .addField("Bot ID: ", r.id)
          .addField("Bot was created at", r.createdAt)
          .addField("Invite Link", `https://discordapp.com/oauth2/authorize?client_id=${r.id}&scope=bot&permissions=0`)
          .setThumbnail(r.avatarURL || r.defaultAvatarURL)
          if(!r.bot) return message.channel.send("`The client ID you inputed does not belong to a bot`")
          if(r.bot) return message.channel.send(embed)
        }).catch(err=> message.channel.send("`Bot could not be found`"))
      }
      if (command === prefix + "help" || command === mentionprefix + "help") {
        var color = ["#00ff00", "#00ffd2", "#ff0000", "#002bff", "#ff00db", "#d7ff05", "#ff9c05"]
        var colors = color[Math.floor(Math.random() * color.length)];
        let killoff = args[0]
        if (!killoff) {
            const help = new Discord.RichEmbed()
            .setDescription("Hello, " + message.author.username + `! I am ${bot.user.username} and here are my commands ^_^`)
            .setColor(colors)
            .addField('😂 fun', `These commands are fun!`)
            .addField("✋ basic", `Some classic commands`)
            .addField("📷 image", "Image manipulation, image commands!")
            .addField("🎥 gif", "GIF commands")
            .addField("🎶 music", "Music commands")
            .addField("👽 custom", "Custom commands (**ccadd, ccdelete and ccprefix Requires you to have specific permissions**)")
            .addField("⬆️️ http", "HTTP request commands")
            .addField("🔧 configurable", "Configurable server commands for your guild. Such as.. set join message, set leave message.. and so on.. (**requires specific permission for these**)")
            .addField("⚒️ moderative", "the moderator commands (**requires specific permission for these**)")
            if (message.author.id == ownerID) {
              help.addField("🗡 owner", "Owner-only commands")
            }
            help.addField("NOTE", "**type " + prefix + "help <command category> to list commands on that category**")
            message.channel.send(help)
        }
        if (killoff === "basic") {
            const basic = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}inviteme`, "Sends an invite link to add this bot to your server")
            .addField(`${prefix}tag <ADD/EDIT/REMOVE> <TAGNAME> <MESSAGE (IF TAG ADD)>`, "View or publish a tag to worldwide")
            .addField(`${prefix}tag v <TAGNAME>`, "View a tag")
            .addField(`${prefix}tag <SEARCH/RANDOM> <SEARCH>`, "View a random tag or search for a tag")
            .addField(`${prefix}binfo`, "Shows the bot information")
            .addField(`${prefix}sinfo`, "View some information about the server")
            .addField(`${prefix}userinfo <USERMENTION OR NOTHING>`, "Shows some information about the user.")
            .addField(`${prefix}uplog`, "Gets the update log for the bot")
            .addField(`${prefix}avatar <USERMENTION OR NOTHING>`, "Gets avatar of you or someone else")
            .addField(`${prefix}goodbye`, "Bot leaves the server, server owner can only use this command.")
            .addField(`${prefix}hackfind <userid>`, "Finds the user ID and displays their name & some information")
            .addField(`${prefix}ginvite <CLIENT ID>`, "Generates an invite to add a bot")
            .addField(`${prefix}rate <1-6> <comment>`, "Rate the bot + leave a feedback (Feedbacks & ratings are published on my server, see my support server for more information)")
            .addField(`${prefix}setregion <regionname>`, "Sets the server region ('japan', 'singapore', 'eu-central', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia')")
            message.channel.send(basic)
        }
        if(killoff === "gif") {
            const gif = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}garbagee`, "Sends a GIF with random shit i wrote in code (WARNING: Flashing content of this GIF may be disturbing for your eyes)")
            .addField(`${prefix}rainbow`, "Rainbowify the image! (WARNING: Flashing content of this GIF may be disturbing for your eyes)")
            .addField(`${prefix}weird`, "Uploads a GIF with weird things (WARNING: Flashing content of this GIF may be disturbing for your eyes)")
            .addField(`${prefix}gdrunk`, "Sends a GIF version of drunk")
            message.channel.send(gif)
        }
        if (killoff === "custom") {
            const custom = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}ccprefix <prefix>`, "Set the prefix for the custom commands")
            .addField(`${prefix}ccadd <custom command name> <text>`, "Creates a new custom command")
            .addField(`${prefix}ccdelete <custom command name>`, "Deletes a custom command")
            .addField(`${prefix}cclist`, "View all of custom commands available on this server")
            message.channel.send(custom)
        }
        if (killoff === "music") {
            const problem = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}play <TEXT OR URL>`, "Play a music from youtube.")
            .addField(`${prefix}pause`, "Pause the playback")
            .addField(`${prefix}resume`, "Resume the playback")
            .addField(`${prefix}restart`, "Restarts the current playing song")
            .addField(`${prefix}loopon/loopoff`, "Loops the current song on or off (usage: &loopon or &loopoff)")
            .addField(`${prefix}volume <0-1000>`, "Change the volume")
            .addField(`${prefix}stop`, "Clears queue and stops playback.")
            .addField(`${prefix}queue`, "View the queue")
            .addField(`${prefix}clearqueue`, "Clears the queue")
            message.channel.send(problem)
        }
        if (killoff === "fun") {
            const fun = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}roast <USERMENTION OR NOTHING>`, 'Roast someone so hardly')
            .addField(`${prefix}imposter <USERID> <MESSAGE>`, 'Imposter someone')
            .addField(`${prefix}impost <NAME> <IMAGE URL> <MESSAGE>`, 'Create a custom impost message.')
            .addField(`${prefix}dice <0-whatever>`, "Rolls a dice")
            .addField(`${prefix}poll <QUESTION>`, "Generates a yes/no poll (reactions)")
            .addField(`${prefix}newpoll <QUESTION>`, "Generates a yes/no poll (no-reactions)")
            .addField(`${prefix}vote <pollnumber> <yes/no>`, "submit a vote to the poll (must in the same channel)")
            .addField(`${prefix}charactercount <MESSAGE>`, "Counts how many characters you have in a message.")
            .addField(`${prefix}reverse <MESSAGE>`, "Reverses your message")
            .addField(`${prefix}say <QUOTE>`, "Gets the bot to say something")
            .addField(`${prefix}btext <text>`, "Converts letters 'g' and 'b' into big B emoji")
            message.channel.send(fun)
        }
        if (killoff === "moderative") {
            const moderator = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}kick <USERMENTION>`, "Kick someone from the server (Sends them a reason if provided)")
            .addField(`${prefix}ban <USERMENTION>`, "Ban someone from the server (Sends them a reason if provided)")
            .addField(`${prefix}rolekick <ROLEMENTION OR NAME>`, "Kicks every member in that role")
            .addField(`${prefix}roleban <ROLEMENTION OR NAME>`, "bans every member in that role")
            .addField(`${prefix}mkick <USERMENTIONS>`, "kicks multiple users, works only by mentions")
            .addField(`${prefix}mban <USERMENTIONS>`, "bans multiple users, works only by mentions")
            .addField(`${prefix}banall <USER ID>`, "Bans a member from every server where you are the owner")
            .addField(`${prefix}idban <ID>`, "Bans someone by ID, they can even not be in the server")
            .addField(`${prefix}unban <username/id>`, "Unbans the user, works both with username & ID, if it cannot find the user by ID it will search through the banned users")
            .addField(`${prefix}delmsg <NUMBER OR NOTHING>`, 'Deletes specified amount of messages in the channel.')
            .addField(`${prefix}mute <USERMENTION>`, "Mute someone")
            .addField(`${prefix}unmute <USERMENTION>`, "Unmute someone")
            message.channel.send(moderator)
        }
        if (killoff === "http") {
            const http = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}youtube <SEARCHSTRING>`, "Searches youtube for a video.")
            .addField(`${prefix}urban <searchstring>`, "Searches a word using urban dictionary")
            .addField(`${prefix}ydownload <searchstring>`, "Download a video from youtube to mp3")
            message.channel.send(http)
        }
        if (killoff === "configurable") {
            const confi = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}setjoinmessage <on/off> <CHANNEL>`, "Sets where messages when new users join will be set to.")
            .addField(`${prefix}joinmessage <MESSAGE>`, "Sets the message to send whenether an user joins the guild.")
            .addField(`${prefix}setgoodbyemessage <on/off> <CHANNEL>`, "Sets where to send when a user leaves the guild.")
            .addField(`${prefix}leavemssage <MESSAGE>`, "Sets the message to send whenether an user leaves the guild.")
            .addField(`${prefix}info`, "Shows server configuration info.")
            .addField(`${prefix}nick <NICKNAME>`, "Changes the bot's nickname")
            .addField(`${prefix}resetnick`, "resets the bot's nickname")
            .addField(`${prefix}toggleantialt <on/off> <1-Whatever>`, "Prevents alt accounts, if setting is on, accounts must be older than from 1 to whatever you typed Day(s) in order to join this server.")
            .addField(`${prefix}toggleantiads <on/off> <delete/kick/ban>`, "Toggle anti advertisement links on/off, this will either delete the message if it was posted, kick the member if they post ads, or ban the member if they post ads, your choice to select one of them.")
            .addField(`${prefix}antiadswhitelist <CHANNELMENTION>`, "Set a whitelisted channel for anti-advertisement links, only one can get selected (users will not get deleted/kicked/banned if they post links in that channel)")
            .addField(`${prefix}removewhitelist`, "Remove whitelisted channel")
            .addField(`${prefix}userads <on/off> <kick/ban>`, "Kicks or bans user if their username contains discord.gg ads (Only works when user joins)")
            .addField(`${prefix}togglemodlog <on/off> <channel>`, "Sets where to place modlogs (MODLOGS ARE: ban, unban, kick,  mute and unmute) bot automaticly log them there if one of these events are initiated")
            .setFooter("{{user}} mentions the user, {{server}} mentions the server, {{owner}} puts the server owner username + tag, {{humans}} amount of humans in this server, {{members}} total number of members, {{bots}} number of bots in this server")
            message.channel.send(confi)
        }
        if(killoff === "image") {
            const confi = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}blur <USERMENTION/URL/NOTHING>`, "Generates a blurred image")
            .addField(`${prefix}blackwhite <USERMENTION/URL/NOTHING>`, "Generates a monochromed image.")
            .addField(`${prefix}greyscale`, "Set an image to greyscale!")
            .addField(`${prefix}messup <USERMENTION/URL/NOTHING>`, "Generate an image messed up")
            .addField(`${prefix}randomcolors <USERMENTION/URL/NOTHING>`, "Generates an image of random colors")
            .addField(`${prefix}flip`, "Flips the image upside down")
            .addField(`${prefix}rotate <number>`, "Rotates the image")
            .addField(`${prefix}mirror`, "Mirrors the image")
            .addField(`${prefix}invert`, "Inverts colors in image")
            .addField(`${prefix}drunk`, "Sends a drunk image")
            .addField(`${prefix}edge`, "Generates a image i can't describe what it even is (note: sometimes the image will just be blank, this is obv cuz it's all empty)")
            .setFooter("Some image commands may not be uploaded, if this happen, please re-use the command, this happens because Jimp & imagemagick can be very slow at saving the image, causing the bot to upload an empty file instead of wait for the processed image to be saved then upload it")
            message.channel.send(confi)
        }
        if (killoff === "owner") {
            const hidden = new Discord.RichEmbed()
            .setColor(colors)
            .addField(`${prefix}eval`, "Evaluates code")
            .addField(`${prefix}blacklist <USER ID> <REASON>`, "Blacklists someone from using the bot")
            .addField(`${prefix}setgame <GAMENAME>`, "Sets the playing status for the bot")
            .addField(`${prefix}setstatus <STATUS>`, "Sets the bot's status")
            .addField(`${prefix}unblacklist <USERID>`, "Unblacklists the user")
            .addField(`${prefix}restart <PASSWORD>`, "Restart the bot")
            message.channel.send(hidden)
        }
      }
      if (command === `${prefix}banall` || command === mentionprefix + "banall") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`"  + "You must have 'ADMINISTRATOR' permission" + "`")
        const who = args.join(' ')
        if(who.length <1) return message.channel.send("`" + "Please provide an ID to ban" + "`")
        let lol = bot.guilds.filter(r=> r.members.has(message.member.id) && r.members.get(message.member.id).hasPermission("ADMINISTRATOR"))
        bot.fetchUser(who)
        .then(r=> {
          lol.forEach(async(guild, id) => {
            guild.ban(who)
          });
          message.channel.send("`" + "ID: "+ r.id + " (" + r.tag + ")" + " has been banned from every server where you have admin"  + "\n" + "Total: " + lol.size + " (" + lol.map(r=> r.name) + ") `" )
        }).catch(err=> message.channel.send("`User not found`"))
      }
      if (command === `${prefix}goodbye` || command === mentionprefix + "goodbye") {
        if(message.author.id !== message.guild.owner.id) return message.channel.send("`" + "Only the server owner can use this command" + "`")
        message.channel.send("`" + "Goodbye!" + "`")
        bot.users.get(ownerID).send("`" + message.author.username + "#" + message.author.discriminator + " // used command leave on " + message.guild.name + "`")
        setTimeout(function() {
          message.guild.leave()
        }, 1000);
      }
      if (command === `${prefix}uplog` || command === mentionprefix + "uplog") {
        request.get("https://chanonlim.pythonanywhere.com/botinfo/silverbotv1/updates.json", {json:true}, (err, res, update) => {
          message.channel.send("`Most recent update: " + updates.latest.version + "`\nNotes:\n```" + updates.latest.notes + "```")
        });
      }
    if(command === `${prefix}avatar` || command === mentionprefix + "avatar") {
        const who = message.mentions.users.first() || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() || message.author
        message.channel.send(who.avatarURL || who.defaultAvatarURL)
    }
    if (command === `${prefix}restart` || command === mentionprefix + "restart") {
        const pass = args.join(' ')
        if (pass.length <1) return message.channel.send("`" + "Enter the password in order to restart the bot" + "`")
        if (pass === settings.password) {
          message.channel.send("`" + "Restarting..." + "`")
          setTimeout(function() {
            process.exit()
          }, 1000);
        } else { return message.channel.send("Wrong password") }
    }
    if (command === `${prefix}hackfind` || command === mentionprefix + "hackfind") {
        const who = args.join(' ')
        if(who.length <1) return message.channel.send("Provide an id please")
        bot.fetchUser(who)
        .then(r=>{
            const lol = r.presence.game
            const what = new Discord.RichEmbed()
            .setDescription("INFORMATION")
            .addField("Username", r.username + "#" + r.discriminator)
            .addField("Status", r.presence.status)
            .addField("Bot", r.bot)
            .addField("Playing status", lol == null ? lol : r.presence.game.name)
            .addField("Account created at", r.createdAt)
            .setThumbnail(r.avatarURL || r.defaultAvatarURL)
            return message.channel.send(what)
      }).catch(err=> message.channel.send("`Couldn't find the user`"))
    }
    if (command === `${prefix}say` || command === mentionprefix + "say") {
        const what = args.join(' ')
        if (what.length <1) return message.channel.send("`" + "Please provide a message" + "`")
        message.delete()
        message.channel.send(what)
    }
    if (command === `${prefix}mute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`You must have 'MANAGE_MESSAGES' permission to use this command`")
        let role = message.guild.roles.find(r => r.name === "Muted");
        let toMute = message.guild.member(message.mentions.users.first())
        if(!message.guild.member(botID).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("`" + "Please add 'MANAGE_MESSAGES' permission on me" + "`");
        if(!toMute) return message.channel.sendMessage("`" + "Please mention someone to mute them" + "`")
        if(toMute.id === message.author.id) return message.channel.sendMessage("`" + "You can't mute yourself" + "`");
        if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("`" + "You cannot mute someone higher role than you" + "`");
        if(!role) {
          try {
            role =  message.guild.createRole({
                name:"Muted",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                 channel.overwritePermissions(role.id, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
          } catch(e) {
            console.error(e.stack);
          }
       }
      if(role) {
        try {
          message.guild.channels.forEach(async (channel, id) => {
              channel.overwritePermissions(role.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
          });
        } catch(e) {
          console.error(e.stack);
        }
        if(toMute.roles.has(role.id)) return message.channel.sendMessage("`" + "This user is already muted" + "`");
        toMute.addRole(role);
        message.channel.sendMessage("`" + toMute.user.username + " has been muted" + "`");
        return;
      }
    }
    if (command === `${prefix}unmute`) {
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`You must have 'MANAGE_MESSAGES' permission to use this command`")
      const who = message.mentions.users.first()
      if(!who) return message.channel.send("`" + "Please mention someone to unmute them" + "`")
      const role = message.guild.roles.find(r=> r.name === "Muted")
      if(role) {
        message.guild.members.get(who.id).removeRole(role.id)
        if(!message.guild.member(botID).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("`" + "Please add 'MANAGE_MESSAGES & MANAGE_ROLES' permission on me" + "`");
        if(who.id === message.author.id) return message.channel.sendMessage("`" + "You can't unmute yourself" + "`"); // would never happen
        message.channel.send("`" + who.username + " was unmuted" + "`")
      }
    }
    if(command === `${prefix}youtube` || command === mentionprefix + "youtube") {
        var searchstring = args.join(' ')
        message.channel.send("`" + "Searching..." + "`")
        .then(r=> {
          const searchstring = args.join(' ')
          ytSearch(searchstring, function(err, results) {
            const videos = results.videos
            const firstResult = videos[0]
            if(err || videos[0] === undefined) return r.edit("`No results`")
            r.edit("https://www.youtube.com" + firstResult.url)
          });
        });
    }
    if(command === `${prefix}urban` || command === mentionprefix + "urban") {
        const what = args.join(' ')
        urban(what).catch(err=> message.channel.send("`" + "No definition found" + "`"))
        .then(r=> {
          message.channel.send('```' + r.word + '```' + "\n" + "**Definiton**" + "\n" + "`"+ r.definition + "\n" + "`" + "\n" + "**" + "Example**" + "\n"  + "``"+ r.example + "``" + "\n" + "\n" + "**Defined by: " + r.author + "**")
        });
    }
    if(command === `${prefix}configmusic` || command === mentionprefix + "configmusic") {
        var dir = `./musicsettings/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const what = args[0]
        if(what.length < 1) {
            fs.readFile(`./musictut.txt`, "utf8", function(err, data2) {
                message.channel.send("" + data2)
            });
        }
        if(what === "auto_resume:true") {
            fs.writeFile(`./musicsettings/${message.guild.id}/config.txt`, "true", function(err) {
                if(err) return;
                message.channel.send("`" + "auto_resume changed to true" + "`")
            });
        }
        if(what === "auto_resume:false") {
            fs.writeFile(`./musicsettings/${message.guild.id}/config.txt`, "false", function(err) {
                if(err) return;
                message.channel.send("`" + "auto_resume changed to false" + "`")
            });
        }
        if(what === "channel:") {
            var chann = message.mentions.channels.first()
            if(!chann) return message.channel.send("`" + "Please mention a channel to set config messages there." + "`")
            fs.writeFile(`./musicsettings/${message.guild.id}/channel.txt`, chann.id, function(err) {
                if(err) return;
                message.channel.send("`" + "channel messages set!" + "`")
            });
        }
    }
    if (command === `${prefix}ccprefix` || command === mentionprefix + "ccprefix") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        var dir = `./customcom/prefix/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const what = args.join(' ')
        if(what.length <1) return message.channel.send("`Provide a prefix please`")
        if(what.length >5) return message.channel.send("`Prefixes can be a maximum of 5 characters`")
        fs.writeFile('./customcom/prefix/' + message.guild.id + "/prefix.txt" , what.replace(" ", "_"), function(err) {
          message.channel.send("`Prefix sucessfully set!`")
        });
    }
    if (command === `${prefix}ccadd` || command === mentionprefix + "ccadd") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
      const what = args[0]
      const commd = args.slice(1).join(' ')
      if (commd.length <1) return message.channel.send("`" + "Please supply a message" + "`")
      var dir = `./customcom/com/${message.guild.id}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile('./customcom/prefix/' + message.guild.id + "/prefix.txt" , 'utf8', function(err, data) {
        if(err) return message.channel.send("`" + "There is no set prefix for custom commands." + "`")
        var dir = `./customcom/com/${message.guild.id}/${data}${what}`;
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        fs.writeFile('./customcom/com/' + message.guild.id + "/" + data + what +"/"+ data + what + ".txt", commd, function(err) {
            if(err) console.log(err)
            message.channel.send("`" + "Custom command added!" + "`")
        });
      });
    }
    if (command === `${prefix}ccdelete` || command === mentionprefix + "ccdelete") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
      const what = args[0]
      var dir = `./customcom/com/${message.guild.id}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile('./customcom/prefix/' + message.guild.id + "/prefix.txt" , 'utf8', function(err, data) {
        if(err) return message.channel.send("`" + "There is no set prefix for custom commands." + "`")
        fs.readFile('./customcom/com/' + message.guild.id + "/" + what + "/" + what + ".txt", 'utf8', function(err, data2) {
          if(err) return message.channel.send("`" + "Custom command not found" + "`")
          fs.unlink('./customcom/com/' + message.guild.id + "/"  + what + "/"  + what + ".txt", function(err) {
            if(err) return console.log(err)
            fs.rmdir('./customcom/com/' + message.guild.id + "/"  + what, function(err) {
              if(err) console.log(err)
              message.channel.send("`" + "Custom command removed!" + "`")
            });
          });
        });
      });
    }
    if (command === `${prefix}cclist` || command === mentionprefix + "cclist") {
      const what = args[0]
      var dir = `./customcom/com/${message.guild.id}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.readFile('./customcom/prefix/' + message.guild.id + "/prefix.txt" , 'utf8', function(err, data) {
        if(err) return message.channel.send("`" + "There is no set prefix for custom commands." + "`")
        fs.readdir('./customcom/com/' + message.guild.id, function(err2, items) {
          if(items.length <1) return message.channel.send("`" + "No custom commands available" + "`")
          message.channel.send("`" + items.length + "\n" + items.join('\n') + "`")
        });
      });
    }
    if (command === `${prefix}nick` || command === `${mentionprefix}nick`) {
      if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("`You must have 'MANAGE_NICKNAMES' permission to use this command`")
      const what = args.join(' ')
      if(!what) return message.channel.send("`" + "Provide a nickname please" + "`")
      message.guild.member(botID).setNickname(what)
      message.channel.send("`" + "Nickname set to: " + what + "`")
    }
    if (command === `${prefix}resetnick` || command === `${mentionprefix}resetnick`) {
      if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("`You must have 'MANAGE_NICKNAMES' permission to use this command`")
      message.guild.member(botID).setNickname(" ")
      message.channel.send("`" + "Nickname reseted. " + "`")
    }
    if(command === `${prefix}info` || command === mentionprefix + "info") {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("`You must have 'MANAGE_GUILD' permission to use this command`")
        var color = ["#00ff00","#00ffd2","#ff0000", "#002bff", "#ff00db", "#d7ff05", "#ff9c05"]
        var colors = color[Math.floor(Math.random() * color.length)];
        fs.readFile('./config/' + message.guild.id + "/setting.txt",'utf8' ,function(err, data) {
            fs.readFile('./config/' + message.guild.id + "/message.txt",'utf8' ,function(err2, data2) {
                fs.readFile('./config/' + message.guild.id + "/channel.txt",'utf8' ,function(err3, data3) {
                    fs.readFile('./config/' + message.guild.id + "/gsetting.txt",'utf8' ,function(err4, data4) {
                        fs.readFile('./config/' + message.guild.id + "/gchannel.txt",'utf8' ,function(err5, data5) {
                            fs.readFile('./config/' + message.guild.id + "/gmessage.txt",'utf8' ,function(err6, data6) {
                                fs.readFile('./antialt/' + message.guild.id + "/config.txt",'utf8' ,function(err7, data7) {
                                    fs.readFile('./antialt/' + message.guild.id + "/date.txt",'utf8' ,function(err7, data8) {
                                        fs.readFile('./antiads/' + message.guild.id + "/en.txt",'utf8' ,function(err7, data9) {
                                            fs.readFile('./antiads/' + message.guild.id + "/setting.txt",'utf8' ,function(err7, data10) {
                                                fs.readFile(`./antiads/${message.guild.id}/whitelist.txt`, "utf8" ,function(err, data11) {
                                                    fs.readFile(`./modsetting/${message.guild.id}/setting.txt`, "utf8" ,function(err, data12) {
                                                        fs.readFile(`./modchannel/${message.guild.id}/setting.txt`, "utf8" ,function(err, data13) {
                                                            fs.readFile(`./userads/${message.guild.id}/en.txt`, 'utf8', function(err, data14) {
                                                                fs.readFile(`./userads/${message.guild.id}/setting.txt`, 'utf8', function(err, data15) {
                                                                    fs.readFile(`./customcom/prefix/${message.guild.id}/prefix.txt`, 'utf8', function(err, data16) {
                                                                        const info = new Discord.RichEmbed()
                                                                        .setDescription(message.guild.name + " CONFIGURATION INFORMATION")
                                                                        .setColor(colors)
                                                                        .addField("Server join messages", data === undefined ? "None" : data)
                                                                        .addField("Join message", data2 === undefined ? "None" : data2)
                                                                        .addField("Channel Join message", data3 === undefined ? "None" : "<#" + data3 + ">")
                                                                        .addField("Server leave messages", data4 === undefined ? "None" : data4)
                                                                        .addField("Leave message", data6 === undefined ? "None" : data6)
                                                                        .addField("Leave channel", data5 === undefined ? "None" : "<#" + data5 + ">")
                                                                        .addField("Anti-alt", data7 === undefined ? "None" : data7)
                                                                        .addField("Anti-alt days", data8 + " day(s)")
                                                                        .addField("Anti-ads", data9 === undefined ? "None" : data9)
                                                                        .addField("Anti-ads setting", data10 === undefined ? "None" : data10)
                                                                        .addField("Whitelisted channel", data11  === undefined ? "None" : "<#" + data11 + ">")
                                                                        .addField("Modlogs", data12 === undefined ? "None" : data12)
                                                                        .addField("Modlog channel",  data13 === undefined ? "None" : "<#" + data13 + ">")
                                                                        .addField("Anti-user ads",  data14 === undefined ? "None" : data14)
                                                                        .addField("Anti-user ads configuration", data15  === undefined ? "None" : data15)
                                                                        .addField("Custom Commands Prefix", data16 === undefined ? "None" : data16)
                                                                        message.channel.send(info)
                                                                      });
                                                                    });
                                                                  });
                                                                });
                                                              });
                                                            });
                                                          });
                                                        });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
    }
    if (command === `${prefix}ydownload` || command === mentionprefix + "ydownload") {
        var dir = `./music/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const suffix = args.join(' ')
        var searchstring = suffix
        if (!suffix.toLowerCase().startsWith('http')) {
            searchstring = 'ytsearch1:' + suffix;
        }
        message.channel.send("`" + "Searching..." + "`")
        .then(r=>{
          ytSearch(suffix, function(err, results) {
            const videos = results.videos
            const firstResult = videos[ 0 ]
            if(err || videos[ 0 ] === undefined) return r.edit("`No results`")
            var YD = new YoutubeMp3Downloader({
              "ffmpegPath": "./node_modules/ffmpeg-binaries/bin/ffmpeg.exe",
              "outputPath": `./music/${message.guild.id}/`,
              "youtubeVideoQuality": "highest",
              "queueParallelism": 2,
              "progressTimeout": 2000
            });
            YD.download(firstResult.videoId, firstResult.title + ".mp3");
            YD.on("error", function(error) {
              r.edit("`" + "An error occured while trying to download the video." + "`")
              console.error(err)
            });
            YD.on("progress", function(progress) {
              r.edit("`" + "Downloading..." +  "  (" + firstResult.title + ")" +"`")
            });
            YD.on("finished", function(err, data) {
              setTimeout(function() {
                message.channel.send({file: `./music/${message.guild.id}/${firstResult.title}.mp3`}).catch(err=> message.channel.send("`" + "An error occured, mostly because file is bigger than 8MB." + "`"))
                r.delete()
              }, 1000);
            });
          });
        });
    }
    if (command === `${prefix}userinfo` || command === mentionprefix + "userinfo") {
        var color = ["#00ff00", "#00ffd2", "#ff0000", "#002bff", "#ff00db", "#d7ff05", "#ff9c05"]
        var colors = color[Math.floor(Math.random() * color.length)];
        let userz = message.mentions.users.first() && message.mentions.users.first().id || message.guild.members.filter(r=> r.user.username.startsWith(args[0]) || r.user.discriminator.startsWith(args[0]) || r.id === args[0]).first() || message.author && message.author.id
        if(!userz) return message.channel.send("`" + "Please mention someone to view their information." + "`")
        if(userz.id === botID) return message.channel.send("`" + "Sorry but i can't show you my own profile as an error keeps on throwing out, use another bot to do that." + "`")
        message.guild.fetchMember(userz)
        .then(r=> {
          let join = message.guild.member(userz).joinedAt
          let status = userz.presence.status
          let avatar = userz.displayAvatarURL
          let lol = userz.presence.game
          let permss = message.guild.member(userz).highestRole.name
          let admin = message.guild.member(userz).hasPermission("ADMINISTRATOR", true)
          let nickname = message.guild.members.get(userz.id).nickname
          let extra1 = message.guild.member(userz).roles.size
          let extra2 = message.guild.member(userz).roles.map(r=> r).join(',')
          const usernfo = new Discord.RichEmbed()
          .setDescription(`${userz}'s info`)
          .setImage(userz.user.displayAvatarURL || userz.user.defaultAvatarURL)
          .setColor(colors)
          .addField("Full name:", `${userz.user.username}#${userz.user.discriminator}`)
          .addField("ID:", `${userz.id}`)
          .addField("Last message:", userz.lastMessage !== null ? userz.lastMessage : "No last messages")
          .addField("Nickname:", nickname !== null ? nickname : "No nickname")
          .addField("Status:", status)
          .addField("Playing:", lol == null ? "None" : userz.presence.game.name)
          .addField("Bot:", userz.user.bot)
          .addField("Admin:", admin)
          .addField("Highest Role:", permss)
          .addField("Number of roles", extra1)
          .addField("Discord join date:", userz.user.createdAt)
          .addField("Guild join date:", join)
          return message.channel.send(usernfo)
        }).catch(err=> message.channel.send(`Couldn't find the user`))
    }
    if (command === `${prefix}sinfo` || command === mentionprefix + "sinfo") {
        var color = ["#00ff00","#00ffd2","#ff0000","#002bff","#ff00db","#d7ff05","#ff9c05"]
        var colors = color[Math.floor(Math.random() * color.length)];
        let server = message.guild.name
        let owner = message.guild.owner
        let lol = message.guild.iconURL
        let reg = message.guild.region
        let assholez = message.guild.members.filter(r=> r.user.bot).filter(r=> r.user.presence.status !== "offline").map(r=> r.user.username)
        let AFKTimeout = message.guild.afkTimeout
        let Userc = message.guild.memberCount
        let vclist = message.guild.channels.filter(r=> r.type === "voice")
        let txlist = message.guild.channels.filter(r=> r.type === "text")
        let ctlist = message.guild.channels.filter(r=> r.type === "category")
        let rlmention = message.guild.roles.filter(r=> r.mentionable)
        let rlhoist = message.guild.roles.filter(r=> r.hoist)
        let rladmin = message.guild.roles.filter(r=> r.hasPermission("ADMINISTRATOR"))
        let createdate = message.guild.createdAt
        message.guild.fetchMembers()
        .then(r=> {
            let ass = r.members.map(r=> r.user.bot).reduce(function(a ,b) {
                return b ? a + 1 : a;
            }, 0);
            let cunt = r.members.map(r=> !r.user.bot).reduce(function(a ,b) {
                return b ? a + 1 : a;
            }, 0);
            let ccc =  r.members.map(r=> r.user.presence.status !== 'offline').reduce(function(a ,b) {
                return b ? a + 1 : a;
            }, 0);
            let sss = r.members.filter(r=> r.user.presence.status !== 'offline').map(r=> !r.user.bot).reduce(function(a ,b) {
                return b ? a + 1 : a;
            }, 0);
            let aaa = r.members.filter(r=> r.user.presence.status !== 'offline').map(r=> r.user.bot).reduce(function(a ,b) {
                return b ? a + 1 : a;
            }, 0);
            let sinfo = new Discord.RichEmbed()
              .setDescription("Here is the server's information")
              .setThumbnail(lol)
              .setColor(colors)
              .addField("Owner", r.owner.user.username + "#" + r.owner.user.discriminator)
              .addField("Server Name", server)
              .addField("Server ID", message.guild.id)
              .addField("Region:", reg)
              .addField("AFK Timeout", AFKTimeout)
              .addField("This server has", r.members.size + " total Users" + " (" + ass + " Bots)" + " (" + cunt + " Humans/users" + ")")
              .addField("There are", ccc + " users online " + "(" + sss + " Humans" + ")" + " (" + aaa + " Bots" + ")")
              .addField("This server has", message.guild.channels.size + " total channels" + " " + "(" + vclist.size + " voice channels)" + " " + "(" + txlist.size + " text channels" + ")" + " (" + ctlist.size + " categories )")
              .addField("This server has", message.guild.roles.size + " Roles" + " (" + rlmention.size + " mentionable)" + " (" + rlhoist.size + " hoisted)" + " (" + rladmin.size + " admin)")
              .addField("Server created at:", createdate)
              message.channel.send(sinfo)
        });
    }
    if (command === `${prefix}binfo` || command === mentionprefix + "binfo") {
        var color = ["#00ff00","#00ffd2","#ff0000","#002bff","#ff00db","#d7ff05","#ff9c05"]
        var colors = color[Math.floor(Math.random() * color.length)];
        var botuptime = bot.uptime;
        var x = botuptime / 1000
        seconds = Math.floor(x % 60)
        x /= 60
        minutes =  Math.floor(x % 60)
        x /= 60
        hours =  Math.floor(x % 24)
        x /= 24
        days = Math.floor(x % 24)
        var uptime = days + ' day(s) ' +  hours + ' hour(s) ' + minutes + ' Minute(s)  ' + seconds + ' Second(s)'
        request.get("https://chanonlim.pythonanywhere.com/botinfo/silverbotv1/manifest.json", {json: true}, (err, res, r) => {
          var data5 = fs.readFileSync("./botstart.txt")
          const aimbot = new Discord.RichEmbed()
          .setDescription("BOT INFORMATION", true)
          .addField("Name:", bot.user.username, true)
          .addField("Version", "v" + package.version, true)
          .setColor(colors)
          .addField("Uptime:", uptime, true)
          .addField("Bot started at", data5, false)
          .addField("Total users:", bot.users.size, true)
          .addField("Seen on:", bot.guilds.size + " servers", true)
          .addField("Playing status", bot.user.presence.game !== null && bot.user.presence.game !== undefined ? bot.user.presence.game.name : "None", true)
          .addField("Ping", bot.ping)
          .addField("Voice Connections", bot.voiceConnections.size, true)
          .addField("Other things", `[Support Server](${r.supportServer})\n[GitHub](${r.github})`, true)
          .addField("Support status", r.state, true)
          .addField("Important info", r.notes, true)
          .addField("Created by:", "SilverRoxetZZ#8200/SuperNiintendo#3700 (Open Source Version)", true)
          return message.channel.send(aimbot)
        })
    }
    if (command === `${prefix}dice` || command === mentionprefix + "dice") {
        const what = args.join('.')
        if(isNaN(what)) return message.channel.send("`HAALLA that's not a number!!!!!`")
        if(what.length < 1) return message.channel.send("`" + "Please type a number" + "`")
        if(what.length >=50) return message.channel.send("`" + "Your number is too long, maximum characters is 50." + "`")
        const roll = Math.floor(Math.random() * what)
        message.channel.send("`" + "You rolled a " + roll + "!" + "`")
    }
    if (command === `${prefix}poll`) {
        const question = args.join(' ')
        if(question.length <1) return message.channel.send("`" + "Please provide a question." + "`")
        message.channel.send("**POLL**" + "\n" + question + "\n" + "\n" + "Yes: :thumbsup:" + "\n" + "No: :thumbsdown:")
        .then(r=>{
          r.react("👍")
          r.react("👎")
        });
    }
    if (command === `${prefix}reverse` || command === mentionprefix + "reverse") {
        const msg = args.join(' ')
        const lol = msg.split("").reverse().join('')
        if(msg.length <1) return message.channel.send("`" + "Please type a message." + "`")
        message.channel.send(lol)
    }
    if(command === `${prefix}charactercount` || command === mentionprefix + "charactercount") {
      const massage = args.join(' ')
      if(massage.length <1) return message.channel.send("`" + "You typed nothing." + "`")
      message.channel.send("`" + "You typed: " + massage.length + " characters" + "`")
    }
    if(command === `${prefix}tag` || command === mentionprefix + "tag") {
        const what = args[0]
        if(what === "v") {
            const what2 = args[1]
            fs.readFile('./tags/' + what2 + ".txt", 'utf8', function(err, data) {
              if(err) return message.channel.send("`" + "Cannot find tag: " + what2 + "`")
              message.channel.send(data)
            });
        }
        if(what === "random") {
            fs.readdir('./tags/', function(err, items) {
                var random = items[Math.floor(Math.random() * items.length)];
                fs.readFile('./tags/' + random, function(err, data) {
                  if(err) return message.channel.send("`" + "No tags worldwide found" + "`")
                  message.channel.send("`TAG NAME: " + random.split(".").shift() + "`"  + "\n" + "\n" + data)
                });
            });
        }
        if (what === "search") {
            fs.readdir('./tags/', function(err, items) {
                const search1 = args.slice(1).join(' ')
                if(search1.length <1) return message.channel.send("`" + "Provide a tag to look for" + "`")
                let lol = items.filter(r=> r.toUpperCase().toLowerCase().startsWith(search1))
                message.channel.send("`" + "SEARCH RESULTS (" + lol.length + ")" + "\n" + lol.map(a => a.split('.').shift()).join("\n") + "`")
            });
        }
        if (what === "add") {
            const nodude = message.mentions.users.first()
            if(nodude) return message.channel.send("`" + "Sorry, but tags cannot have mentions in them." + "`")
            const what2 = args[1]
            const what3 = args.slice(2).join(' ')
            if(what3.length <1) return message.channel.send("`" + "Please supply a message!" + "`")
            if(what3.length >640) return message.channel.send("`Tags must be less than 640 characters`")
            fs.readFile('./tags/' + what2 + ".txt", 'utf8', function(err, data) {
                if(!err) return message.channel.send("`" + "This tag already exists!" + "`")
                if(err) {
                  fs.writeFile('./tags/' + what2 + ".txt", what3 + "\n" + "\n" + "`" + "Tag by: " + message.author.username + "#" + message.author.discriminator + "`", function(err) {
                    fs.writeFile('./tagowner/' + what2 + ".txt", message.author.id, function(err) {
                      if(err) return;
                      message.channel.send("`" + "Tag " + '"'+ what2 + '"'+ " has been created" + "`")
                    });
                  });
                }
            });
        }
        if(what === "edit") {
            const nodude = message.mentions.users.first()
            if(nodude) return message.channel.send("`" + "Sorry, but tags cannot have mentions in them." + "`")
            const what2 = args[1]
            const what3 = args.slice(2).join(' ')
            if(what3.length <1) return message.channel.send("`" + "Please supply a message!" + "`")
            if(what3.length >640) return message.channel.send("`Tags must be less than 640 characters`")
            fs.readFile('./tags/' + what2 + ".txt", 'utf8', function(err, data) {
                if(err) return message.channel.send("`" + "This tag does not exist!" + "`")
                fs.readFile('./tagowner/' + what2 + ".txt", 'utf8', function(err, data2) {
                    if(message.author.id !== data2) return message.channel.send("`" + "This tag does not belong to you." + "`")
                    if(!err) {
                      fs.writeFile('./tags/' + what2 + ".txt", what3 + "\n" + "\n" + "`" + "Tag by: " + message.author.username + "#" + message.author.discriminator  + " (edited)" + "`", function(err) {
                        fs.writeFile('./tagowner/' + what2 + ".txt", message.author.id, function(err) {
                          if(err) return;
                          message.channel.send("`" + "Tag " + '"'+ what2 + '"'+ " has been edited" + "`")
                        });
                      });
                    }
                  });
              });
        }
        if(what === "remove") {
            const what2 = args[1]
            fs.readFile('./tags/' + what2 + ".txt", 'utf8', function(err, data2) {
              fs.readFile('./tagowner/' + what2 + ".txt", 'utf8', function(err, data) {
                if(err) return message.channel.send("`" + "Tag not found." + "`")
                if(message.author.id !== data) return message.channel.send("`" + "This tag does not belong to you" + "`")
                if(message.author.id === data) {
                   fs.unlink('./tags/' + what2 + ".txt",function(err) {
                     fs.unlink('./tagowner/' + what2 + ".txt",function(err) {
                       message.channel.send("`" + "Tag: " + "'" +what2 + "'" + " has been removed." + "`")
                     });
                  });
                }
              });
            });
        }
    }
    if(command === `${prefix}blur` || command === mentionprefix + "blur") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
          }
          talkedRecently.add(message.author.id);
          setTimeout(() => {
            talkedRecently.delete(message.author.id);
          }, 10000);
        var dir = `./finished/${message.guild.id}/`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}blur`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] ||bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
          gm(who)
          .blur(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25))
          .write(`./finished/${message.guild.id}/blur.png`, function(err) {
            if(err) console.log(err)
            message.channel.send({file: `./finished/${message.guild.id}/blur.png`})
            r.delete()
          });
        });
    }
    if(command === `${prefix}blackwhite` || command === mentionprefix + "blackwhite") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}blackwhite`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] ||bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() &&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if (who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .monochrome()
            .write(`./finished/${message.guild.id}/monochrome.png`, function(err) {
                if(err) console.log(err)
                message.channel.send({file: `./finished/${message.guild.id}/monochrome.png`})
                r.delete()
            });
        });
    }
    if (command === `${prefix}greyscale` || command === mentionprefix + "greyscale") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}greyscale`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .write(`./finished/${message.guild.id}/greyscale.png`, function(err) {
                Jimp.read(`./finished/${message.guild.id}/greyscale.png`, function(err, greyscale) {
                  if(err) console.log(err)
                  greyscale
                  .greyscale()
                  .write(`./finished/${message.guild.id}/greyscale.jpg`, function(err) {
                    message.channel.send({file: `./finished/${message.guild.id}/greyscale.jpg`})
                    r.delete()
                  });
                });
            });
        });
    }
    if(command === `${prefix}newpoll`) {
        const what = args.join(' ')
        if(what.length <1) return message.channel.send("`Please supply a question`")
        var dir = `./poll/num/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var dir2 = `./poll/ques/${message.guild.id}`;
        if (!fs.existsSync(dir2)){
           fs.mkdirSync(dir2);
        }
        var dir3 = `./poll/votes/${message.guild.id}`;
        if (!fs.existsSync(dir3)){
           fs.mkdirSync(dir3);
        }
        fs.readdir(`./poll/num/${message.guild.id}`, function(err, items) {
          fs.readdir(`./poll/ques/${message.guild.id}`, function(err, items2) {
            fs.readdir(`./poll/votes/${message.guild.id}`, function(err, items3) {
               var lolfuck = items.length + 1
               var lolfuck2 = items2.length + 1
               var lolfuck3 = items3.length + 1
               var dir99 = `./poll/votes/${message.guild.id}/${lolfuck}`;
               if (!fs.existsSync(dir99)){
                  fs.mkdirSync(dir99);
               }
               var dir6 = `./poll/votes/${message.guild.id}/${lolfuck}/ids`;
               if (!fs.existsSync(dir6)){
                  fs.mkdirSync(dir6);
               }
               var dir7 = `./poll/votes/${message.guild.id}/${lolfuck}/tot1`;
               if (!fs.existsSync(dir7)){
                  fs.mkdirSync(dir7);
               }
               var dir8 = `./poll/votes/${message.guild.id}/${lolfuck}/tot2`;
               if (!fs.existsSync(dir8)){
                  fs.mkdirSync(dir8);
               }
               fs.writeFile(`./poll/ques/${message.guild.id}/${lolfuck2}.txt`, what, function(err) {
                 var dir4 = `./poll/votes/${message.guild.id}/${lolfuck3}`;
                 if (!fs.existsSync(dir4)){
                   fs.mkdirSync(dir4);
                 }
                  fs.writeFile(`./poll/votes/${message.guild.id}/${lolfuck3}/vote1.txt`, "0", function(err) {
                    fs.writeFile(`./poll/votes/${message.guild.id}/${lolfuck3}/vote2.txt`, "0", function(err) {
                        fs.readFile(`./poll/votes/${message.guild.id}/${lolfuck3}/vote1.txt`, "utf8", function(err, data1) {
                          fs.readFile(`./poll/votes/${message.guild.id}/${lolfuck3}/vote2.txt`, "utf8", function(err, data2) {
                              message.channel.send(`**POLL** #${lolfuck}` + "\n" + what + "\n" + "\n" + `Yes: ${data1}  No: ${data2}`)
                              .then(r=> {
                                fs.writeFile(`./poll/num/${message.guild.id}/${lolfuck}.txt`, r.id, function(err) {
                                  if(err) return;
                                });
                              });
                          });
                      });
                  });
                });
              });
            });
          });
        });
    }
    if (command === `${prefix}vote`) {
        message.channel.fetchMessages()
        .then(r=> {
            const numb = args[0]
            const what = args.slice(1).join(' ')
            if(what === "yes") {
                message.delete()
                fs.readdir(`./poll/num/${message.guild.id}`, function(err, items) {
                  fs.readdir(`./poll/ques/${message.guild.id}`, function(err, items2) {
                    fs.readdir(`./poll/votes/${message.guild.id}`, function(err, items3) {
                        if(err) return;
                        var lolfuck = items.length
                        var lolfuck2 = items2.length
                        var lolfuck3 = items3.length
                        fs.readFile(`./poll/votes/${message.guild.id}/${numb}/ids/${message.author.id}.txt`, 'utf8', function(err, data69) {
                          if(!err)  message.channel.send("`You have already voted`")
                          .then(r=> r.delete(3000))
                          if(err) {
                            var dir699 = `./poll/votes/${message.guild.id}`;
                            if (!fs.existsSync(dir699)){
                              fs.mkdirSync(dir699);
                            }
                            var dir4 = `./poll/votes/${message.guild.id}/${lolfuck3}/tot1`;
                            if (!fs.existsSync(dir4)){
                              fs.mkdirSync(dir4);
                            }
                            var dir5 = `./poll/votes/${message.guild.id}/${lolfuck3}/tot2`;
                            if (!fs.existsSync(dir5)){
                              fs.mkdirSync(dir5);
                            }
                            var dir6 = `./poll/votes/${message.guild.id}/${lolfuck3}/ids`;
                            if (!fs.existsSync(dir6)){
                              fs.mkdirSync(dir6);
                            }
                            fs.writeFile(`./poll/votes/${message.guild.id}/${numb}/ids/${message.author.id}.txt`, 'true', function(err) {
                              fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot1`, function(err, total) {
                                fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot2`, function(err, total2) {
                                  fs.readFile(`./poll/num/${message.guild.id}/${numb}.txt`, 'utf8', function(err, data) {
                                    fs.readFile(`./poll/ques/${message.guild.id}/${numb}.txt`, 'utf8', function(err, data12) {
                                      fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote1.txt`, "utf8", function(err, data1) {
                                        fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote2.txt`, "utf8", function(err, data2) {
                                          if(err) return message.channel.send("`Error`")
                                          var fuckoff = data1 + 1
                                          var mathfloor = total.length + 1
                                          var mathfloor2 = total2.length + 1
                                          fs.writeFile(`./poll/votes/${message.guild.id}/${numb}/tot1/${mathfloor}.txt`, 'junk', function(err) {
                                            fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot1/`, function(err, thiccingrid) {
                                              fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot2/`, function(err, thiccingrid2) {
                                                fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote1.txt`, "utf8", function(err, new1) {
                                                  fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote2.txt`, "utf8", function(err, new2) {
                                                    let rofl = r.find(r=> r.id === data)
                                                    if(!rofl) message.channel.send("`That poll number can't be found!`")
                                                    .then(r=> r.delete(3000))
                                                    if(rofl) rofl.edit(`**POLL** #${numb}` + "\n" + data12 + "\n" + "\n" + `Yes: ${thiccingrid.length}  No: ${thiccingrid2.length}`)
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          }
                        });
                      });
                    });

                  });
                }
                if (what === "no") {
                  message.delete()
                  fs.readdir(`./poll/num/${message.guild.id}`, function(err, items) {
                    fs.readdir(`./poll/ques/${message.guild.id}`, function(err, items2) {
                      fs.readdir(`./poll/votes/${message.guild.id}`, function(err, items3) {
                        if(err) return;
                        var lolfuck = items.length
                        var lolfuck2 = items2.length
                        var lolfuck3 = items3.length
                        fs.readFile(`./poll/votes/${message.guild.id}/${numb}/ids/${message.author.id}.txt`, 'utf8', function(err, data69) {
                          if(!err)  message.channel.send("`You have already voted`")
                          .then(r=> r.delete(3000))
                          if(err) {
                            var dir699 = `./poll/votes/${message.guild.id}`;
                            if (!fs.existsSync(dir699)){
                              fs.mkdirSync(dir699);
                            }
                            var dir4 = `./poll/votes/${message.guild.id}/${lolfuck3}/tot1`;
                            if (!fs.existsSync(dir4)){
                              fs.mkdirSync(dir4);
                            }
                            var dir4 = `./poll/votes/${message.guild.id}/${lolfuck3}/tot2`;
                            if (!fs.existsSync(dir4)){
                              fs.mkdirSync(dir4);
                            }
                            var dir5 = `./poll/votes/${message.guild.id}/${lolfuck3}/ids`;
                            if (!fs.existsSync(dir5)){
                              fs.mkdirSync(dir5);
                            }
                            fs.writeFile(`./poll/votes/${message.guild.id}/${numb}/ids/${message.author.id}.txt`, 'true', function(err) {
                              fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot1`, function(err, total) {
                                fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot2`, function(err, total2) {
                                  fs.readFile(`./poll/num/${message.guild.id}/${numb}.txt`, 'utf8', function(err, data) {
                                    fs.readFile(`./poll/ques/${message.guild.id}/${numb}.txt`, 'utf8', function(err, data12) {
                                      fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote1.txt`, "utf8", function(err, data1) {
                                        fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote2.txt`, "utf8", function(err, data2) {
                                          if(err) return message.channel.send("`Error`")
                                          var fuckoff = data1 + 1
                                          var mathfloor = total.length + 1
                                          var mathfloor2 = total2.length + 1
                                          fs.writeFile(`./poll/votes/${message.guild.id}/${numb}/tot2/${mathfloor2}.txt`, 'junk', function(err) {
                                            fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot1/`, function(err, thiccingrid) {
                                              fs.readdir(`./poll/votes/${message.guild.id}/${numb}/tot2/`, function(err, thiccingrid2) {
                                                fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote1.txt`, "utf8", function(err, new1) {
                                                  fs.readFile(`./poll/votes/${message.guild.id}/${numb}/vote2.txt`, "utf8", function(err, new2) {
                                                    if(err) console.log(err)
                                                    let rofl = r.find(r=> r.id === data)
                                                    if(!rofl) message.channel.send("`That poll number can't be found!`")
                                                    .then(r=> r.delete(3000))
                                                    if(rofl) rofl.edit(`**POLL** #${numb}` + "\n" + data12 + "\n" + "\n" + `Yes: ${thiccingrid.length}  No: ${thiccingrid2.length}`)
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          }
                        });
                      });
                    });
                  });
                }
              });
    }
    if (command === `${prefix}messup` || command === mentionprefix + "messup") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}messup`
        const who = message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] ||bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() &&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .gamma(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
            .shade(Math.floor(Math.random() * 5), Math.floor(Math.random() * 5))
            .write(`./finished/${message.guild.id}/fuckify.png`, function(err) {
                if(err) console.log(err)
                message.channel.send({file: `./finished/${message.guild.id}/fuckify.png`})
                r.delete()
            });
        });
    }
    if(command === `${prefix}createaccount`) {
        var dir = `./accounts/${message.author.id}/`;
        if (fs.existsSync(dir)) return message.channel.send("`" + "You already have an account!" + "`")
           const name = args[0]
           if(name.length >16) return message.channel.send("`" + "Usernames can be a maximum of 16 characters." + "`")
           var dir3 = './subscribers/' + message.author.id
           if (!fs.existsSync(dir3)){
             fs.mkdirSync(dir3);
           }
           var dir2 = './subscribers/' + message.author.id + "/posts"
           if (!fs.existsSync(dir2)){
             fs.mkdirSync(dir2);
           }
           fs.readFile('./accpublic/' + name + ".txt", 'utf8', function(err, data) {
                if(!err) return message.channel.send("`" + "An account wit this username already exists." + "`")
                if(err) {
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                    fs.writeFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt", name ,function(err2) {
                      fs.writeFile('./accpublic/' + name + ".txt", message.author.id , function(err) {
                        if(err) return;
                        message.channel.send("`" + "Your account has been created, " + name + "!" + "`")
                      });
                    });
                }
              });
    }
    if (command === `${prefix}mysubscribings`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            fs.readdir('./subbing/' + message.author.id, function(err, items) {
              if(err) return message.channel.send("`" + "You have no subscribings!" + "`")
              if(items.length <1) return message.channel.send("`" + "You have no subscribings!" + "`")
              message.channel.send("`" + items.join("\n") + "`")
            });
        });
    }
    if(command === `${prefix}mysubscribers`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            fs.readdir('./subscribers/' + message.author.id, function(err, items) {
              if(err) return message.channel.send("`" + "You have no subscribings!" + "`")
              if(items.length <1) return message.channel.send("`" + "You have no subscribings!" + "`")
              message.channel.send("`" + items.join("\n") + "`")
            });
        });
    }
    if(command === `${prefix}subscribe`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            var dir = './subbing/' + message.author.id
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            const who = args[0]
            fs.readFile('./accpublic/' + who + ".txt", 'utf8', function(err, data2) {
              if(err) return message.channel.send("`" + "Sorry, that user was not found." + "`")
              if(message.author.id === data2) return message.channel.send("`" + "You cannot subscribe to yourself!" + "`")
              fs.readFile('./subscribers/' + data2 + "/" +  data + ".txt", 'utf8', function(err66) {
                fs.readFile('./subbing/' + message.author.id + "/" +  who + ".txt", 'utf8', function(err66) {
                  if(!err66) return message.channel.send("`" + "You are already subscribing this person!" + "`")
                  fs.writeFile('./subscribers/' + data2 + "/" +  data + ".txt", data, function(err1) {
                    fs.writeFile('./subbing/' + message.author.id + "/" +  who + ".txt", data, function(err2) {
                      if(err2) console.log(err)
                      if(err1) console.log(err)
                      message.channel.send("`" + "You are now subscribing " + who + "!" + "`")
                      var dir3 = './subscribers/' + data2 + "/posts/" + message.author.id
                      if (!fs.existsSync(dir3)){
                        fs.mkdirSync(dir3);
                      }
                      fs.readFile('./subdm/' + data2 + "/" + "setting.txt", 'utf8', function(err69, shitz) {
                        if(shitz === "on") {
                          bot.users.get(data2).send("`" + data + " is now subscribing you!" + "`")
                        }
                      });
                    });
                  });
                });
              });
            });
        });
    }
    if(command === `${prefix}subdm`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            var dir = './subdm/' + message.author.id
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
            const what = args[0]
            if(what === "on") {
              fs.writeFile('./subdm/' + message.author.id + "/setting.txt","on" ,function(err) {
                message.channel.send("Channel subscribers DM enabled!")
            });
          }
          if(what === "off") {
              fs.writeFile('./subdm/' + message.author.id + "/setting.txt","off", function(err) {
                message.channel.send("Channel subscribers DM disabled!")
            });
          }
        });
    }
    if(command === `${prefix}unsubdm`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            var dir = './subdm/' + message.author.id
            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
            const what = args[0]
            if(what === "on") {
              fs.writeFile('./subdm/' + message.author.id + "/setting2.txt","on" ,function(err) {
                message.channel.send("Channel unsubscribers DM enabled!")
              });
            }
            if(what === "off") {
              fs.writeFile('./subdm/' + message.author.id + "/setting2.txt","off", function(err) {
                message.channel.send("Channel unsubscribers DM disabled!")
              });
            }
          });
        }
    if(command === `${prefix}unsubscribe`) {
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            if(err) return message.channel.send("`" + "You don't have an account, please create one first." + "`")
            const who = args[0]
            fs.readFile('./subbing/' + message.author.id + "/" + who + ".txt", function(err, data3) {
                fs.readFile('./accpublic/' + who + ".txt", 'utf8', function(err2, data2) {
                  if(err) return message.channel.send("`" + "You are not subscribing this person!" + "`")
                  if(message.author.id === data2) return message.channel.send("`" + "You cannot unsubscribe yourself" + "`")
                  fs.unlink('./subbing/' + message.author.id + "/" + who + ".txt", function(err1) {
                    fs.unlink('./subscribers/' + data2 + "/" + data + ".txt", function(err2) {
                      if(err1) console.log(err1)
                      if(err2) console.log(err2)
                      message.channel.send("`" + "You have now unsubscribed " + who + "!" + "`")
                      fs.readFile('./subdm/' + data2 + "/" + "setting2.txt", 'utf8', function(err4, shitz) {
                        if(shitz === "on") {
                          bot.users.get(data2).send("`" + data + " has unsubscribed you" + "`").catch(err=> console.log(err))
                        }
                      });
                    });
                  });
                });
              });
            });
    }
    if(command === `${prefix}subinfo`) {
        var dir = `./subbing/${message.author.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var dir2 = `./subscribers/${message.author.id}/`;
        if (!fs.existsSync(dir2)){
            fs.mkdirSync(dir2);
        }
        fs.readFile('./accounts/' + message.author.id + "/" + message.author.id + ".txt",'utf8', function(err, data) {
            fs.readdir('./subscribers/' + message.author.id, function(err2, items) {
                fs.readdir('./subbing/' + message.author.id, function(err3, items2) {
                  if(err) return message.channel.send("`" + "You don't have an account, please create one" + "`")
                  const info = new Discord.RichEmbed()
                  .setDescription('YOUR INFO')
                  .addField("Account Name", data)
                  .addField('Subscribers', items.length - 1)
                  .addField("Subscribing", items2.length)
                  message.channel.send(info)
                });
            });
      });
    }
    if(command === `${prefix}randomcolors` || command === mentionprefix + "randomcolors") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}randomcolors`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first()&&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .gaussian(1, 1)
            .density(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
            .bitdepth(Math.floor(Math.random() * 100))
            .colorize(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255))
            .write(`./finished/${message.guild.id}/randomcolors.png`, function(err) {
                if(err) console.log(err)
                message.channel.send({file: `./finished/${message.guild.id}/randomcolors.png`})
                r.delete()
            });
        });
    }
    if(command === `${prefix}flip` || command === mentionprefix + "flip") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}flip`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first()&&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL||message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .flip()
            .write(`./finished/${message.guild.id}/flip.png`, function(err) {
                if(err) console.log(err)
                message.channel.send({file: `./finished/${message.guild.id}/flip.png`})
                r.delete()
            });
        });
    }
    if(command === `${prefix}mirror` || command === mentionprefix + "mirror") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}mirror`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first()&&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .write(`./finished/${message.guild.id}/mirror.png`, function(err) {
            Jimp.read(`./finished/${message.guild.id}/mirror.png`, function(err, comms) {
                if(err) console.log(err)
                comms
                .mirror(true, false)
                .write(`./finished/${message.guild.id}/mirror.jpg`)
                message.channel.send({file: `./finished/${message.guild.id}/mirror.jpg`})
                r.delete()
            });
          });
      });
    }
    if(command === `${prefix}invert` || command === mentionprefix + "invert") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        var cmdname = `${prefix}invert`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first()&&bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .write(`./finished/${message.guild.id}/invert.png`, function(err) {
            Jimp.read(`./finished/${message.guild.id}/invert.png`, function(err, comms) {
              if(err) console.log(err)
              comms
              .invert()
              .write(`./finished/${message.guild.id}/invert.jpg`)
              message.channel.send({file: `./finished/${message.guild.id}/invert.jpg`})
              r.delete()
            });
          });
      });
    }
    if(command === `${prefix}drunk` || command === mentionprefix + "drunk") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var random1 = [true,false]
        const randomzz = Math.floor[Math.random() * 10]
        var random1s = random1[Math.floor(Math.random() * random1.length)];
        var cmdname = `${prefix}drunk`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL || message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .write(`./finished/${message.guild.id}/drunk.png`, function(err) {
            Jimp.read(`./finished/${message.guild.id}/drunk.png`, function(err, comms) {
                if(err) console.log(err)
            comms
            .quality(100)
            .fade(0.3)
            .invert()
            .blur(2)
            .setPixelColor(10, 10, 20)
            .mirror(random1s, random1s)
            .write(`./finished/${message.guild.id}/drunk.jpg`)
                message.channel.send({file: `./finished/${message.guild.id}/drunk.jpg`})
                r.delete()
            });
          });
        });
    }
    if(command === `${prefix}edge` || command === `${mentionprefix}edge`) {
      if (talkedRecently.has(message.author.id)) {
        return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 10000);
      var dir = `./finished/${message.guild.id}/`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      var cmdname = `${prefix}edge`
      const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
      if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
      if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
      message.channel.send("`" + "Processing..." + "`")
      .then(r=> {
        gm(who)
        .resize(500, 500)
        .magnify()
        .blur(7, 3)
        .edge(3)
        .write(`./finished/${message.guild.id}/edge.png`, function (err) {
          Jimp.read(`./finished/${message.guild.id}/edge.png`, function(err, junk) {
            junk
            .setPixelColor(20, 10, 30)
            .write(`./finished/${message.guild.id}/edge.jpg`, function(err) {
              r.delete()
              if(err) console.log(err)
              message.channel.send({file: `./finished/${message.guild.id}/edge.jpg`})
            });
          });
        })
      });
    }
    if(command === `${prefix}gdrunk` || command === mentionprefix + "gdrunk") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var dir2 = `./img/gdrunk/${message.guild.id}/`;
        if (!fs.existsSync(dir2)){
           fs.mkdirSync(dir2);
        }
        var random1 = [true, false]
        const randomzz = Math.floor[Math.random() * 10]
        var random1s = random1[Math.floor(Math.random() * random1.length)];
        var cmdname = `${prefix}gdrunk`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .write(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err) {
              Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                if(err) console.log(err)
                comms
                .quality(100)
                .fade(0.3)
                .invert()
                .blur(2)
                .setPixelColor(5, 10, 15)
                .mirror(random1s, random1s)
                .write(`./img/gdrunk/${message.guild.id}/drunk1.jpg`, function(err) {
                  Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                      if(err) console.log(err)
                      comms
                      .quality(100)
                      .fade(0.4)
                      .blur(1)
                      .setPixelColor(7, 8, 5)
                      .mirror(random1s, random1s)
                      .write(`./img/gdrunk/${message.guild.id}/drunk2.jpg`, function(err) {
                        Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                          if(err) console.log(err)
                          comms
                          .quality(100)
                          .fade(0.5)
                          .invert()
                          .blur(3)
                          .setPixelColor(4, 2, 6)
                          .mirror(random1s, random1s)
                          .write(`./img/gdrunk/${message.guild.id}/drunk3.jpg`, function(err) {
                            Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                              if(err) console.log(err)
                              comms
                              .quality(100)
                              .fade(0.6)
                              .blur(3)
                              .setPixelColor(1, 2, 3)
                              .mirror(random1s, random1s)
                              .write(`./img/gdrunk/${message.guild.id}/drunk4.jpg`, function(err) {
                                Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                if(err) console.log(err)
                                comms
                                .quality(100)
                                .fade(0.6)
                                .invert()
                                .blur(3)
                                .setPixelColor(2, 5, 8)
                                .mirror(random1s, random1s)
                                .write(`./img/gdrunk/${message.guild.id}/drunk5.jpg`, function(err) {
                                  Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                    if(err) console.log(err)
                                    comms
                                    .quality(100)
                                    .fade(0.6)
                                    .setPixelColor(10, 5, 8)
                                    .mirror(random1s, random1s)
                                    .write(`./img/gdrunk/${message.guild.id}/drunk6.jpg`, function(err) {
                                      Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                        if(err) console.log(err)
                                        comms
                                        .quality(100)
                                        .fade(0.6)
                                        .invert()
                                        .setPixelColor(100, 100, 100)
                                        .mirror(random1s, random1s)
                                        .write(`./img/gdrunk/${message.guild.id}/drunk7.jpg`, function(err) {
                                          Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                            if(err) console.log(err)
                                            comms
                                            .quality(100)
                                            .fade(0.6)
                                            .greyscale()
                                            .setPixelColor(150, 110, 120)
                                            .mirror(random1s, random1s)
                                            .write(`./img/gdrunk/${message.guild.id}/drunk8.jpg`, function(err) {
                                              Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                                if(err) console.log(err)
                                                comms
                                                .quality(100)
                                                .fade(0.6)
                                                .invert()
                                                .setPixelColor(130, 145, 132)
                                                .mirror(random1s, random1s)
                                                .write(`./img/gdrunk/${message.guild.id}/drunk9.jpg`, function(err) {
                                                  Jimp.read(`./img/gdrunk/${message.guild.id}/drunk.jpg`, function(err, comms) {
                                                    if(err) console.log(err)
                                                    comms
                                                    .quality(100)
                                                    .fade(0.6)
                                                    .invert()
                                                    .greyscale()
                                                    .setPixelColor(200, 200, 200)
                                                    .mirror(random1s, random1s)
                                                    .write(`./img/gdrunk/${message.guild.id}/drunk10.jpg`, function(err) {
                                                      gm()
                                                      .command('convert')
                                                      .in('-loop', '0')
                                                      .in('-delay', '10')
                                                      .in(`./img/gdrunk/${message.guild.id}/drunk1.jpg`, `./img/gdrunk/${message.guild.id}/drunk2.jpg`, `./img/gdrunk/${message.guild.id}/drunk3.jpg`, `./img/gdrunk/${message.guild.id}/drunk4.jpg`, `./img/gdrunk/${message.guild.id}/drunk5.jpg`, `./img/gdrunk/${message.guild.id}/drunk6.jpg`, `./img/gdrunk/${message.guild.id}/drunk7.jpg`, `./img/gdrunk/${message.guild.id}/drunk8.jpg`, `./img/gdrunk/${message.guild.id}/drunk9.jpg`, `./img/gdrunk/${message.guild.id}/drunk10.jpg`)
                                                      .in('-resize', '500x500')
                                                      .write(`./finished/${message.guild.id}/gdrunk.gif`, function(err) {
                                                        message.channel.send({file: `./finished/${message.guild.id}/gdrunk.gif`})
                                                        r.delete()
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
        });
    }
    if(command === `${prefix}garbagee` || command === mentionprefix + "garbagee") {
        if (talkedRecently.has(message.author.id)) {
          return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var random1 = [true, false]
        const randomzz = Math.floor[Math.random() * 10]
        var random1s = random1[Math.floor(Math.random() * random1.length)];
        var cmdname = `${prefix}garbagee`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        message.channel.send("`" + "Processing... (WARNING: flashing content of this GIF may be disturbing for your eyes)" + "`")
        .then(r=> {
            gm(who)
            .resize(500, 500)
            .write(`./finished/${message.guild.id}/s1.png`, function(err) {
              gm(`./finished/${message.guild.id}/s1.png`)
              .resize(500, 500)
              .adjoin()
              .write(`./finished/${message.guild.id}/s2.png`, function(err) {
                gm(`./finished/${message.guild.id}/s2.png`)
                .resize(500, 500)
                .monochrome()
                .write(`./finished/${message.guild.id}/s3.png`, function(err) {
                  gm(`./finished/${message.guild.id}/s3.png`)
                  .shade(Math.floor(Math.random() * 2), Math.floor(Math.random() * 2))
                  .resize(500, 500)
                  .write(`./finished/${message.guild.id}/s4.png`, function(err) {
                    gm(`./finished/${message.guild.id}/s4.png`)
                    .resize(500, 500)
                    .colorize(Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50))
                    .write(`./finished/${message.guild.id}/s5.png`, function(err) {
                      gm(`./finished/${message.guild.id}/s5.png`)
                      .resize(500, 500)
                      .blur(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
                      .write(`./finished/${message.guild.id}/s6.png`, function(err) {
                        gm(`./finished/${message.guild.id}/s6.png`)
                        .resize(500, 500)
                        .contrast(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4))
                        .write(`./finished/${message.guild.id}/s7.png`, function(err) {
                          gm(`./finished/${message.guild.id}/s7.png`)
                          .resize(500, 500)
                          .enhance()
                          .write(`./finished/${message.guild.id}/s8.png`, function(err) {
                            gm(`./finished/${message.guild.id}/s8.png`)
                            .resize(500, 500)
                            .colorize(Math.floor(Math.random() * 70), Math.floor(Math.random() * 70), Math.floor(Math.random() * 70))
                            .write(`./finished/${message.guild.id}/s9.png`, function(err) {
                              gm(`./finished/${message.guild.id}/s9.png`)
                              .resize(500, 500)
                              .cycle(Math.floor(Math.random() * 10))
                              .write(`./finished/${message.guild.id}/s10.png`, function(err) {
                                gm(`./finished/${message.guild.id}/s10.png`)
                                  .resize(500, 500)
                                  .gamma(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4))
                                  .write(`./finished/${message.guild.id}/s11.png`, function(err) {
                                    gm(`./finished/${message.guild.id}/s10.png`)
                                      .resize(500, 500)
                                      .flip()
                                      .write(`./finished/${message.guild.id}/s12.png`, function(err) {
                                        gm(`./finished/${message.guild.id}/s12.png`)
                                          .resize(500, 500)
                                          .flip()
                                          .write(`./finished/${message.guild.id}/s13.png`, function(err) {
                                            if(err) console.log(err)
                                            gm()
                                            .command('convert')
                                            .in('-loop', '0')
                                            .in('-delay', '5')
                                            .in(`./finished/${message.guild.id}/s1.png`, `./finished/${message.guild.id}/s2.png`, `./finished/${message.guild.id}/s3.png`, `./finished/${message.guild.id}/s4.png`, `./finished/${message.guild.id}/s5.png`,`./finished/${message.guild.id}/s6.png`, `./finished/${message.guild.id}/s7.png`, `./finished/${message.guild.id}/s8.png` , `./finished/${message.guild.id}/s9.png`, `./finished/${message.guild.id}/s10.png`, `./finished/${message.guild.id}/s11.png`, `./finished/${message.guild.id}/s12.png`, `./finished/${message.guild.id}/s13.png`)
                                            .in('-resize', '500x500')
                                            .write(`./finished/${message.guild.id}/garbagee.gif`, function(err) {
                                              message.channel.send({file: `./finished/${message.guild.id}/garbagee.gif`})
                                              r.delete()
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
    }
    if(command === `${prefix}rainbow` || command === mentionprefix + "rainbow") {
        if (talkedRecently.has(message.author.id)) {
          return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var random1 = [ 255, 0, 0, 255, 165, 0, 255, 250, 0, 170, 255, 0, 89, 255, 0, 0, 255, 8, 0, 255, 119, 2, 255, 242, 1, 136, 255, 0, 22, 255, 127, 0, 255, 250, 0, 255, 255, 0, 152, 255, 0, 46 ]
        const randomzz = Math.floor[Math.random() * 10]
        var random1s = random1[Math.floor(Math.random() * random1.length)];
        var cmdname = `${prefix}rainbow`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing... (WARNING: flashing content of this GIF may be disturbing for your eyes)" + "`")
        .then(r=> {
            gm(who)
            .resize(500, 500)
            .write(`./finished/${message.guild.id}/s1.png`, function(err) {
              gm(`./finished/${message.guild.id}/s1.png`)
              .resize(500, 500)
              .background("#9400D3")
              .colorize(255, 0, 0)
              .write(`./finished/${message.guild.id}/s2.png`, function(err) {
                gm(`./finished/${message.guild.id}/s1.png`)
                .resize(500, 500)
                .monochrome()
                .background("#4B0082")
                .colorize(255, 165, 0)
                .write(`./finished/${message.guild.id}/s3.png`, function(err) {
                  gm(`./finished/${message.guild.id}/s1.png`)
                  .colorize(255, 250, 0)
                  .background("#ff002e")
                  .resize(500, 500)
                  .write(`./finished/${message.guild.id}/s4.png`, function(err) {
                    gm(`./finished/${message.guild.id}/s1.png`)
                    .resize(500, 500)
                    .background("#0000FF")
                    .colorize(170, 255, 0)
                    .write(`./finished/${message.guild.id}/s5.png`, function(err) {
                      gm(`./finished/${message.guild.id}/s1.png`)
                      .resize(500, 500)
                      .background("#00FF00")
                      .colorize(89, 255, 0)
                      .write(`./finished/${message.guild.id}/s6.png`, function(err) {
                        gm(`./finished/${message.guild.id}/s1.png`)
                        .resize(500, 500)
                        .background("#FFFF00")
                        .colorize( 0, 255, 8)
                        .write(`./finished/${message.guild.id}/s7.png`, function(err) {
                          gm(`./finished/${message.guild.id}/s1.png`)
                          .resize(500, 500)
                          .background("#FF7F00")
                          .colorize(0, 255, 119)
                          .write(`./finished/${message.guild.id}/s8.png`, function(err) {
                            gm(`./finished/${message.guild.id}/s1.png`)
                            .resize(500, 500)
                            .background("#FF0000")
                            .colorize(2, 255, 242)
                            .write(`./finished/${message.guild.id}/s9.png`, function(err) {
                              gm(`./finished/${message.guild.id}/s1.png`)
                              .resize(500, 500)
                              .colorize(1, 136, 255)
                              .background("#9400D3")
                              .write(`./finished/${message.guild.id}/s10.png`, function(err) {
                                gm(`./finished/${message.guild.id}/s1.png`)
                                .resize(500, 500)
                                .background("#4B0082")
                                .colorize( 0, 22, 255)
                                .write(`./finished/${message.guild.id}/s11.png`, function(err) {
                                    gm(`./finished/${message.guild.id}/s1.png`)
                                    .resize(500, 500)
                                    .background("#0000FF")
                                    .colorize(127, 0, 255)
                                    .write(`./finished/${message.guild.id}/s12.png`, function(err) {
                                        gm(`./finished/${message.guild.id}/s1.png`)
                                        .resize(500, 500)
                                        .background("#00FF00")
                                        .colorize(250, 0, 255)
                                        .write(`./finished/${message.guild.id}/s13.png`, function(err) {
                                            if(err) console.log(err)
                                            gm()
                                            .command('convert')
                                            .in('-loop', '0')
                                            .in('-delay', '5')
                                            .in(`./finished/${message.guild.id}/s1.png`, `./finished/${message.guild.id}/s2.png`, `./finished/${message.guild.id}/s3.png`, `./finished/${message.guild.id}/s4.png`, `./finished/${message.guild.id}/s5.png`,`./finished/${message.guild.id}/s6.png`, `./finished/${message.guild.id}/s7.png`, `./finished/${message.guild.id}/s8.png` , `./finished/${message.guild.id}/s9.png`, `./finished/${message.guild.id}/s10.png`, `./finished/${message.guild.id}/s11.png`, `./finished/${message.guild.id}/s12.png`, `./finished/${message.guild.id}/s13.png`)
                                            .in('-resize', '500x500')
                                            .write(`./finished/${message.guild.id}/rainbow.gif`, function(err) {
                                              message.channel.send({file: `./finished/${message.guild.id}/rainbow.gif`})
                                              r.delete()
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
    }
    if(command === `${prefix}rotate` || command === mentionprefix + "rotate") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const much = args.slice(1).join(' ')
        if(much.length <1) return message.channel.send("Please type a number of amount to rotate.")
        var cmdname = `${prefix}rotate`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL
        if(!who) return message.channel.send("`" + "Please input an attachment or a user mention." + "`")
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing..." + "`")
        .then(r=> {
            gm(who)
            .rotate("#FFFFFF", much)
            .write(`./finished/${message.guild.id}/rotate.png`, function(err) {
                if(err) console.log(err)
                message.channel.send({file: `./finished/${message.guild.id}/rotate.png`})
                r.delete()
            });
        });
    }
    if(command === `${prefix}weird` || command === mentionprefix + "weird") {
        if (talkedRecently.has(message.author.id)) {
          return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        var dir = `./finished/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        var dir2 = `./img/weird/${message.guild.id}/`;
        if (!fs.existsSync(dir2)){
           fs.mkdirSync(dir2);
        }
        var cmdname = `${prefix}weird`
        const who =  message.mentions.users.first() && message.mentions.users.first().avatarURL || message.content.slice(cmdname.length + 1).startsWith('http') && message.content.slice(cmdname.length + 1) || message.attachments.map(r => r.url)[0] || bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first() && bot.users.filter(r=> r.username.startsWith(args[0]) || r.id === args[0]).first().avatarURL ||message.author.avatarURL
        if(who.endsWith(".gif")) return message.channel.send("`GIF images/avatars doesn't work with this command`")
        message.channel.send("`" + "Processing... (WARNING: flashing content of this GIF may be disturbing for your eyes)" + "`")
        .then(r=> {
            gm(who)
            .resize(500, 500)
            .crop(500, 500, 0, 0)
            .write(`./img/weird/${message.guild.id}/weird1.png`, function(err) {
                gm(who)
                .monochrome()
                .resize(500, 500)
                .crop(400, 400, 0, 0)
                .write(`./img/weird/${message.guild.id}/weird2.png`, function(err) {
                    gm(who)
                    .resize(500, 500)
                    .crop(300,300, 0, 0)
                    .write(`./img/weird/${message.guild.id}/weird3.png`, function(err) {
                        gm(who)
                        .monochrome()
                        .resize(500, 500)
                        .crop(200, 200, 0, 0)
                        .write(`./img/weird/${message.guild.id}/weird4.png`, function(err) {
                            gm(who)
                            .resize(500, 500)
                            .crop(100, 100, 0, 0)
                            .write(`./img/weird/${message.guild.id}/weird5.png`, function(err) {
                                gm(who)
                                .resize(500, 500)
                                .monochrome()
                                .crop(200, 100, 230 , 204)
                                .write(`./img/weird/${message.guild.id}/weird6.png`, function(err) {
                                    gm(who)
                                    .resize(500, 500)
                                    .crop(400, 400, 100, 100)
                                    .write(`./img/weird/${message.guild.id}/weird7.png`, function(err) {
                                        gm(who)
                                        .resize(500, 500)
                                        .monochrome()
                                        .crop(300,300, 200, 200)
                                        .write(`./img/weird/${message.guild.id}/weird8.png`, function(err) {
                                            gm(who)
                                            .resize(500, 500)

                                            .crop(200, 200, 300, 300)
                                            .write(`./img/weird/${message.guild.id}/weird9.png`, function(err) {
                                                gm(who)
                                                .resize(500, 500)
                                                .monochrome()
                                                .crop(100, 100, 400, 400)
                                                .write(`./img/weird/${message.guild.id}/weird10.png`, function(err) {
                                                    gm(who)
                                                    .resize(500, 500)
                                                    .crop(500, 500, 500, 500)
                                                    .write(`./img/weird/${message.guild.id}/weird11.png`, function(err) {
                                                        gm(who)
                                                        .resize(500, 500)
                                                        .monochrome()
                                                        .crop(500, 500, 500, 500)
                                                        .write(`./img/weird/${message.guild.id}/weird12.png`, function(err) {
                                                            gm(who)
                                                            .resize(500, 500)
                                                            .crop(500, 400, 300,200)
                                                            .write(`./img/weird/${message.guild.id}/weird13.png`, function(err) {
                                                                gm(who)
                                                                .monochrome()
                                                                .resize(500, 500)
                                                                .crop(200, 300, 400, 500)
                                                                .write(`./img/weird/${message.guild.id}/weird14.png`, function(err) {
                                                                    gm(who)
                                                                    .resize(500, 500)
                                                                    .crop(300, 100, 200, 400)
                                                                    .write(`./img/weird/${message.guild.id}/weird15.png`, function(err) {
                                                                      gm()
                                                                      .command('convert')
                                                                      .in('-loop', '0')
                                                                      .in('-delay', '5')
                                                                      .in(`./img/weird/${message.guild.id}/weird1.png`, `./img/weird/${message.guild.id}/weird2.png`,`./img/weird/${message.guild.id}/weird3.png`,`./img/weird/${message.guild.id}/weird4.png`,`./img/weird/${message.guild.id}/weird5.png`,`./img/weird/${message.guild.id}/weird6.png`,`./img/weird/${message.guild.id}/weird7.png`,`./img/weird/${message.guild.id}/weird8.png`,`./img/weird/${message.guild.id}/weird9.png`,`./img/weird/${message.guild.id}/weird10.png`,`./img/weird/${message.guild.id}/weird11.png`, `./img/weird/${message.guild.id}/weird12.png`, `./img/weird/${message.guild.id}/weird13.png`, `./img/weird/${message.guild.id}/weird14.png`,`./img/weird/${message.guild.id}/weird15.png`)
                                                                      .in('-resize', '500x500')
                                                                      .write(`./finished/${message.guild.id}/weird.gif`, function(err) {
                                                                        if(err) console.log(err)
                                                                        message.channel.send({file: `./finished/${message.guild.id}/weird.gif`})
                                                                        r.delete()
                                                                      });
                                                                    });
                                                                  });
                                                                });
                                                              });
                                                            });
                                                          });
                                                        });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
    }
    if(command === `${prefix}setgoodbyemessage` || command === mentionprefix + "setgoodbyemessage") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        const what = args[0]
        if (what === "on") {
            const which = message.mentions.channels.first()
            if(!which) return message.channel.send("`" + "Please mention a channel." + "`")
            var dir = `./config/${message.guild.id}/`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            fs.writeFile('./config/' + message.guild.id + "/" + "gchannel.txt", which.id, function(err) {
              fs.writeFile('./config/' + message.guild.id + "/" + "gsetting.txt", "on", function(err) {
                if(err) return message.channel.send("`" + "Sorry, an error occured" + "`")
                message.channel.send("`" + "Goodbye messages has been set to " + which.name + "!" + "`")
              });
          });
        }
        if(what === 'off') {
          var dir = `./config/${message.guild.id}/`;
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          fs.writeFile('./config/' + message.guild.id + "/" + "gsetting.txt", "off", function(err) {
            message.channel.send("`" + "Turned off goodbye messages." + "`")
          });
        }
    }
    if(command === `${prefix}setjoinmessage` || command === mentionprefix + "setjoinmessage") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        const what = args[0]
        if(what === "on") {
            const which = message.mentions.channels.first()
            if(!which) return message.channel.send("`" + "Please mention a channel." + "`")
            var dir = `./config/${message.guild.id}/`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            fs.writeFile('./config/' + message.guild.id + "/" + "channel.txt", which.id, function(err) {
                fs.writeFile('./config/' + message.guild.id + "/" + "setting.txt", "on", function(err) {
                  if(err) return message.channel.send("`" + "Sorry, an error occured" + "`")
                  message.channel.send("`" + "Welcome messages has been set to " + which.name + "!" + "`")
                });
              });
      }
      if(what === 'off') {
        var dir = `./config/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile('./config/' + message.guild.id + "/" + "setting.txt", "off", function(err) {
          message.channel.send("`" + "Turned off welcome messages." + "`")
        });
      }
    }
    if(command === `${prefix}joinmessage` || command === mentionprefix + "joinmessage") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
            var dir = `./config/${message.guild.id}/`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            const what = args.join(' ')
            if(what.length < 1) return message.channel.send("`" + "Please supply a message." + "`")
            fs.readFile('./config/' + message.guild.id + "/setting.txt", 'utf8', function(err, data) {
                if(data === "off") return message.channel.send("`" + "Welcome messages are disabled, please enable them first." + "`")
                fs.writeFile('./config/' + message.guild.id + "/message.txt", what, function(err) {
                  if(err) return message.channel.send("`" + "An error occured, please check your message and try again." + "`")
                  message.channel.send("`" + "Welcome message set!" + "`")
                });
            });
    }
    if(command === `${prefix}userads` || command === mentionprefix + "userads") {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        var dir = `./userads/${message.guild.id}/`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const what = args[0]
        const what2 = args.slice(1).join(' ')
        if(what === "on") {
           if(what2 === "kick") {
              fs.writeFile(`./userads/${message.guild.id}/en.txt`, 'on', function(err) {
                fs.writeFile(`./userads/${message.guild.id}/setting.txt`, 'kick', function(err) {
                     message.channel.send("`Configure successfull`")
                });
              });
            }
            if(what2 === "ban") {
              fs.writeFile(`./userads/${message.guild.id}/en.txt`, 'on', function(err) {
               fs.writeFile(`./userads/${message.guild.id}/setting.txt`, 'ban', function(err) {
                   message.channel.send("`Configure successfull`")
               });
              });
            }
          }
            if(what === "off") {
              fs.writeFile(`./userads/${message.guild.id}/en.txt`, 'off', function(err) {
                message.channel.send("`Configure successfull`")
              });
            }
    }
    if(command === `${prefix}leavemessage` || command === mentionprefix + "leavemessage") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
      var dir = `./config/${message.guild.id}/`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      const what = args.join(' ')
      if(what.length < 1) return message.channel.send("`" + "Please supply a message." + "`")
      fs.readFile('./config/' + message.guild.id + "/gsetting.txt", 'utf8', function(err, data) {
          if(data === "off") return message.channel.send("`" + "Goodbye messages are disabled, please enable them first." + "`")
          fs.writeFile('./config/' + message.guild.id + "/gmessage.txt", what, function(err) {
            if(err) return message.channel.send("`" + "An error occured, please check your message and try again." + "`")
            message.channel.send("`" + "Goodbye message set!" + "`")
          });
      });
    }
    if(command === `${prefix}imposter` || command === mentionprefix + "imposter") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        if(!message.guild.member(botID).hasPermission('MANAGE_WEBHOOKS')) return message.channel.send("Please add " + "`" + "MANAGE_WEBHOOKS" + "`" + " Permission on me in order to use this command.")
        message.channel.startTyping()
        const who = message.mentions.users.first() && message.mentions.users.first().id || args[0]
        let lmao = bot.users.get(who)
        if(!lmao) {
          message.channel.send("`" + "Sorry, cannot find that user." + "`")
          message.channel.stopTyping()
        }
        if(lmao) {
          var lol11 = message.guild.fetchMember(lmao)
          .then(r=> {
            var lol22 = r.nickname
            var avv = lmao.avatarURL || lmao.defaultAvatarURL
            const what = args.slice(1).join(' ')
            if(what.length <1) {
              message.channel.send("`" + "Please input a message to imposter." + "`")
              message.channel.stopTyping()
            }
            message.channel.createWebhook(lol22 !== null ? lol22: lmao.username, avv)
            .then(wb=> {
              wb.send(what)
              wb.delete()
              setTimeout(function() {
                message.channel.stopTyping()
              }, 1000);
            });
          }).catch(err=> {
            var avv = lmao.avatarURL || lmao.defaultAvatarURL
            const what = args.slice(1).join(' ')
            if(what.length <1) {
              message.channel.send("`" + "Please input a message to imposter." + "`")
              message.channel.stopTyping()
            }
            message.channel.createWebhook(lmao.username, avv)
            .then(wb=> {
              wb.send(what)
              wb.delete()
              setTimeout(function() {
                message.channel.stopTyping()
              }, 1000);
            });
          });
        }
    }
    if(command === `${prefix}impost` || command === mentionprefix + "impost") {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send("`" + "You cannot use this command for another 10 seconds" + "`")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
        const name = args[0]
        const url1 = args[1]
        const what = args.slice(2).join(' ')
        if(!message.guild.member(botID).hasPermission('MANAGE_WEBHOOKS')) return message.channel.send("Please add " + "`" + "MANAGE_WEBHOOKS" + "`" + " Permission on me in order to use this command.")
        let webhookzz = message.channel.createWebhook(name, url1)
        .then(wb=> {
          wb.send(what)
          wb.delete()
        }).catch(err=> message.channel.send("`" + "Please supply a name (with no spaces), an image url, and a text to message." + "`"))
    }
    if(command === `${prefix}kick` || command === mentionprefix + "kick") {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("`You must have 'KICK_MEMBERS' permission to use this command`")
        const who = message.mentions.users.first()
        if(!who) return message.channel.send("`" + "Please mention a user to kick them." + "`")
        const reason = args.slice(1).join(' ')
        const reason2 = reason !== args.slice(1).join(' ').length > 1 ?  reason : "Admin has not given a reason."
        if(!message.guild.member(botID).hasPermission("KICK_MEMBERS")) return message.channel.send("Please add " + "`" + "KICK_MEMBERS" + "`" + " Permission on me in order to kick " + "`" +  who.username + "`")
        if(who.id === message.author.id) return message.channel.send("`" + "You cannot kick yourself" + "`")
        if(!message.guild.member(who.id).kickable) return message.channel.send("`" + who.username + "`" + "cannot be kicked.")
        let lmao = who.send("You have been kicked from  " + "`" + message.guild.name + "`" + " Reason: " + "`" + reason2 + "`" + "  Kicked by: " + "`" + message.author.username + "`").catch(err=> message.channel.send("Failed to send message to " + "`" + who.username + "`" + " most likely they have disabled DMs or the bot was too slow."))
        setTimeout(function() {
          message.guild.member(who).kick()
        }, 1000)
        message.channel.send("`" + who.username + "`" + " Has been kicked.")
    }
    if(command === `${prefix}mkick` || command === `${mentionprefix}mkick`) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("`You must have 'KICK_MEMBERS' permission to use this command`")
        const who = message.mentions.users
        who.forEach(async (member, id) => {
          message.guild.member(member).kick()
        });
        message.channel.send(`kicked ${who.size} members`)
        .then(r=> r.delete(5000))
    }
    if(command === `${prefix}mban` || command === `${mentionprefix}mban`) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`You must have 'BAN_MEMBERS' permission to use this command`")
        const who = message.mentions.users
        who.forEach(async (member, id) => {
          message.guild.member(member).ban()
        });
        message.channel.send(`banned ${who.size} members`)
        .then(r=> r.delete(5000))
    }
    if(command === `${prefix}rolekick` || command === `${mentionprefix}rolekick`) {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("`You must have 'KICK_MEMBERS' permission to use this command`")
        if(!message.guild.member(botID).hasPermission("KICK_MEMBERS")) return message.channel.send("Please add " + "`" + "KICK_MEMBERS" + "`" + " Permission on me in order to kick people")
        const which = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args.join(' '))
        if(!which) return message.channel.send("`Role not found`")
        let lmao = message.guild.fetchMembers()
        .then(them=> {
            let rofl = message.guild.members.filter(r=> r.roles.has(which.id))
            rofl.forEach(async (member, id) => {
              member.kick()
            });
            message.channel.send("`Kicked " + rofl.size + " member(s)`")
            .then(r=> {
              r.delete(5000)
            });
          });
    }
    if(command === `${prefix}roleban` || command === `${prefix}roleban`) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`You must have 'BAN_MEMBERS' permission to use this command`")
        if(!message.guild.member(botID).hasPermission("BAN_MEMBERS")) return message.channel.send("Please add " + "`" + "BAN_MEMBERS" + "`" + " Permission on me in order to ban people")
        const which = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args.join(' '))
        if(!which) return message.channel.send("`Role not found`")
        let lmao = message.guild.fetchMembers()
        .then(them=> {
            let rofl = message.guild.members.filter(r=> r.roles.has(which.id))
            rofl.forEach(async (member, id) => {
              member.ban()
              .then(r=> {
                r.delete(5000)
              });
            });
            message.channel.send("`Banned " + rofl.size + " member(s)`")
        });
    }
    if(command === `${prefix}delmsg` || command === mentionprefix + "delmsg") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`You must have 'MANAGE_MESSAGES' permission to use this command`")
        const messagecount = args[0]
        if(!message.guild.member(botID).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Please add " + "`" + "MANAGE_MESSAGES" + "`" + " Permission on me in order to delete messages on this channel.")
        message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages))
        .then(messages => message.channel.send("Deleted " + messages.size + " messages"))
        .then(r=> r.delete('5000'))
    }
    if(command === `${prefix}ban` || command === mentionprefix + "ban") {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`You must have 'BAN_MEMBERS' permission to use this command`")
        const who = message.mentions.users.first()
        if(!who) return message.channel.send("`" + "Please mention a user to ban them." + "`")
        const reason = args.slice(1).join(' ')
        const reason2 = reason !== args.slice(1).join(' ').length > 1 ?  reason : "Admin has not given a reason."
        if(!message.guild.member(botID).hasPermission("BAN_MEMBERS")) return message.channel.send("Please add " + "`" + "BAN_MEMBERS" + "`" + " Permission on me in order to ban " + "`" +  who.username + "`")
        if(who.id === message.author.id) return message.channel.send("`" + "You cannot ban yourself" + "`")
        if(!message.guild.member(who.id).bannable) return message.channel.send("`" + who.username + "`" + "cannot be banned.")
        let lmao = who.send("You have been banned from  " + "`" + message.guild.name + "`" + " Reason: " + "`" + reason2 + "`" + "  Banned by: " + "`" + message.author.username + "`").catch(err=> message.channel.send("Failed to send message to " + "`" + who.username + "`" + " most likely they have disabled DMs or the bot was too slow."))
        setTimeout(function() {
          message.guild.member(who).ban()
        }, 1000)
        message.channel.send("`" + who.username + "`" + " Has been banned.")
    }
    if(command === `${prefix}unban` || command === mentionprefix + "unban") {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`You must have 'BAN_MEMBERS' permission to use this command`")
        if(!message.guild.member(bot.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("`I need 'BAN_MEMBERS' permission to unban users`")
        const who = args.join(' ')
        message.guild.fetchBans()
        .then(r=> {
            const what = r.filter(r=> r.username.startsWith(who) || r.id === who)
            message.guild.unban(what.first().id)
            message.channel.send("`Unbanned '" + what.map(r=> r.tag) + "'`")
        }).catch(err=> message.channel.send("`Could not find the user`"))
    }
    if(command === `${prefix}idban` || command === mentionprefix + "idban") {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("`You must have 'BAN_MEMBERS' permission to use this command`")
        if(!message.guild.member(bot.user.id).hasPermission("BAN_MEMBERS")) return message.channel.send("`I need 'BAN_MEMBERS' permission to ban users`")
        const who = args.join(' ')
        if(who.length <1) return message.channel.send("`" + "Please provide an ID to ban" + "`")
        bot.fetchUser(who)
        .then(r=> {
          message.guild.ban(who, {reason: "ID Banned"})
          message.channel.send("`" + "Banned ID: " + who + "`")
        }).catch(err=> message.channel.send("`Could not find the user ID`"))
    }
    if(command === `${prefix}toggleantiads` || command === `${mentionprefix}toggleantiads`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        var dir = `./antiads/${message.guild.id}`;
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        const what = args[0]
        if(what === "on") {
          const what2 = args.slice(1).join(' ')
          if(what2 === "delete") {
              fs.writeFile(`./antiads/${message.guild.id}/en.txt`, "on" , function(err) {
                  fs.writeFile(`./antiads/${message.guild.id}/setting.txt`, "delete" ,function(err) {
                    message.channel.send("`" + "Anti advertisement messages set to delete message" + "`")
                  });
              });
          }
          if(what2 === "kick") {
            fs.writeFile(`./antiads/${message.guild.id}/en.txt`, "on" ,function(err) {
              fs.writeFile(`./antiads/${message.guild.id}/setting.txt`, "kick" ,function(err) {
                message.channel.send("`" + "Anti advertisement messages set to kick user" + "`")
              });
            });
          }
          if(what2 === "ban") {
            fs.writeFile(`./antiads/${message.guild.id}/en.txt`, "on" ,function(err) {
              fs.writeFile(`./antiads/${message.guild.id}/setting.txt`, "ban" ,function(err) {
                message.channel.send("`" + "Anti advertisement messages set to ban user" + "`")
              });
            });
          }
        }
        if(what === "off") {
            fs.writeFile(`./antiads/${message.guild.id}/en.txt`, "off" , function(err) {
              message.channel.send("`" + "Disabled anti ads" + "`")
            });
        }
    }
    if(command === `${prefix}rate` || command === `${mentionprefix}rate`) {
      return // TODO
      /*setTimeout(function () {
        ratedrec.delete(message.author.id)
      }, 600000);*/
    }
    if (command === `${prefix}issue` || command === `${mentionprefix}issue`)) {
      return // TODO
      /*setTimeout(function () {
        issuereport.delete(message.author.id)
      }, 600000);*/
    }
    if(command === `${prefix}antiadswhitelist` || command === `${mentionprefix}antiadswhitelist`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        const chann = message.mentions.channels.first()
        if(!chann) return message.channel.send("`" + "Please mention a channel" + "`")
        fs.writeFile(`./antiads/${message.guild.id}/whitelist.txt`, chann.id ,function(err) {
            message.channel.send("`" + chann.name + " has been marked as 'whitelisted channel' for advertisements" + "`")
        });
    }
    if(command === `${prefix}removewhitelist` || command === `${mentionprefix}removewhitelist`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        fs.writeFile(`./antiads/${message.guild.id}/whitelist.txt`, "None" ,function(err) {
            message.channel.send("`" + "Removed whitelisted channel for anti-ads" + "`")
        });
    }
    if(command === `${prefix}toggleantialt` || command === `${mentionprefix}toggleantialt`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
        var dir = `./antialt/${message.guild.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const what = args[0]
        const what2 = args.slice(1).join(' ')
        if(what === "on") {
            if(what2.length <1) return message.channel.send("`" + "Please provide a number of days from 1/3/7/14 " + "`")
            fs.writeFile(`./antialt/${message.guild.id}/config.txt`, "on", function(err) {
              fs.writeFile(`./antialt/${message.guild.id}/date.txt`, what2, function(err) {
                if(isNaN(what2)) return message.channel.send("`Please provide a number`")
                if(what2 === "0") return message.channel.send("`Minimum is 1 Day.`")
                message.channel.send("`" + "Accounts must now be older than "+ what2+ " Day in order to join this server." + "`")
              });
            });
        }
        if(what === "off") {
            fs.writeFile(`./antialt/${message.guild.id}/config.txt`, "off", function(err) {
                message.channel.send("`" + "Disabled account-oldage" + "`")
            });
        }
    }
    if(command === `${prefix}roast` || command === mentionprefix + "roast") {
        const who = message.mentions.users.first() || message.author
        var roast = [
            "Were you born on the highway? That is where most accidents happen.",
            "I was going to give you a nasty look... but I see you already have one.",
            "Remember when I asked for your opinion? Me neither.",
            "Everyone’s entitled to act stupid once in awhile, but you really abuse the privilege.",
            "I'm trying to see things from your point of view, but I can't get my head that far up my ass.",
            "I haven't seen a fatty like you run that fast since twinkies went on sale for the first time.",
            "Two wrongs don't make a right, take your parents as an example.",
            "Just looking at you, I now understand why some animals eat their young offspring.",
            "Does time actually fly when you're having sex, or was it just one minute after all?",
            "You should go do that tomorrow. Oh wait, nevermind, you've made enough mistakes already for today.",
            "This is why you dont have nice things",
            "My teacher told me to erase mistakes, i'm going to need a bigger eraser.",
            "You're IQ's lower than your dick size.",
            "Are you always such an idiot, or do you just show off when I’m around?",
            "There are some remarkably dumb people in this world. Thanks for helping me understand that.",
            "I could eat a bowl of alphabet soup and shit out a smarter statement than whatever you just said.",
            "You’re about as useful as a screen door on a submarine.",
            "You always bring me so much joy—as soon as you leave the room.",
            "Stupidity’s not a crime, so feel free to go.",
            "If laughter is the best medicine, your face must be curing the world.",
            "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.",
            "It looks like your face caught fire and someone tried to put it out with a hammer.",
            "Scientists say the universe is made up of neutrons, protons and electrons. They forgot to mention morons like you.",
            "Why is it acceptable for you to be an idiot but not for me to point it out?",
            "You're so fat you could sell shade.",
            "Your family tree must be a cactus because everyone on it is a prick.",
            "You'll never be the man your mother is.",
            "Just because you have an ass doesn't mean you need to act like one.",
            "Which sexual position produces the ugliest children? Ask your mother she knows.",
            "If I had a face like yours I'd sue my parents.",
            "The zoo called. They're wondering how you got out of your cage?",
            "Hey, you have something on your chin... no, the 3rd one down.",
            "Aww, it's so cute when you try to talk about things you don't understand.",
            "You are proof that evolution can go in reverse.",
            "Brains aren't everything. In your case they're nothing.",
            "You're so ugly when you look in the mirror, your reflection looks away.",
            "I'm sorry I didn't get that - I don't speak idiot.",
            "It's better to let someone think you're stupid than open your mouth and prove it.",
            "Were you born this stupid or did you take lessons?",
            "You're such a beautiful, intelligent, wonderful person. Oh I'm sorry, I thought we were having a lying competition.",
            "Don't you get tired of putting make up on two faces every morning?",
            "Hey, I'm straighter than the pole your mom dances on.",
            "If ugliness were measured in bricks, you would be the Great Wall of China.",
            "I thought I said goodbye to you this morning when I flushed the toilet",
            "If you're trying to improve the world, you should start with yourself. Nothing needs more help than you do",
            "Zombies are looking for brains. Don't worry. You're safe.",
            "spreading rumors? At least you found a hobby spreading something other than your legs.",
            "i would tell you to eat trash but that’s cannibalism",
            "If you spoke your mind, you would be speechless",
            "I can fix my ugliness with plastic surgery but you on the other hand will stay stupid forever",
            "Acting like a dick won't make yours any bigger",
            "If I wanted to hear from an asshole, I would have farted",
            "Roses are red. Violets are blue. God made us beautiful. What the hell happened to you?",
            "You remind me of a penny, two faced and worthless!",
            "I've met some pricks in my time but you my friend, are the f*cking cactus",
            "I'd slap you, but that would be animal abuse",
            "If you're gonna be a smartass, first you have to be smart. Otherwise you're just an ass. ",
            "I know I’m talking like an idiot. I have to, other wise you wouldn't understand me.",
            "You're so dumb, your brain cell died of loneliness",
            "You shouldn't let your mind wander..its way to small to be out on its own",
            "I don't know what makes you so dumb, but its working",
            "You should put the diaper on your mouth, that's where the craps comin' out.",
            "You would be much more likable if it wasn’t for that hole in your mouth that stupid stuff comes out of. ",
            "Could you go away please, I'm allergic to douchebags",
            "If you had any intelligence to question I would have questioned it already.",
            "I wish I had a lower I.Q,  maybe then I could enjoy your company.",
            "I would answer you back but life is too short, just like your d*ck",
            "Mirrors don't lie. Lucky for you, they can't laugh either.",
            "I was right there are no humans in this channel",
            "You have a face not even a mother could love....",
            "You know what I would find if I looked up idiot in the dictionary a picture of you?",
            "You make the guys on Jackass look like Einstein.....",
            "I would slap you but I don't want to make your face look any better",
            "Sorry, I can't put small objects in my mouth or Ill choke",
            "Too bad you can't wear those instagram filters in real life",
            "Your life must be gone far downhill if you are talking to me instead of a real human",
            "You are so stupid the only good purpose you serve is being a slave",
            "You should wear a condom on your head, if you're going to be a dick you might as well dress like one",
            "Have you been shopping lately? They're selling lives at the mall, you should get one"
          ]
          var roasts = roast[Math.floor(Math.random() * roast.length)];
          message.channel.send(who.username + " " + roasts)
    }
    if(command === `${prefix}inviteme` || command === mentionprefix + "inviteme") {
        message.channel.send("`" + "You wanna add me to your server? Here you go!" + "`" + "\n" + `https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=0`)
    }
    if(command === `${prefix}togglemodlog`) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
      var dir = `./modsetting/${message.guild.id}`;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      var dir2 = `./modchannel/${message.guild.id}`;
      if (!fs.existsSync(dir2)){
       fs.mkdirSync(dir2);
      }
      const what = args[0]
      if(what === "on") {
        const chan = message.mentions.channels.first()
        if(!chan) return message.channel.send("`Please mention a channel where modlogs are gonna be stored`")
        fs.writeFile(`./modsetting/${message.guild.id}/setting.txt`, "on", function(err) {
            fs.writeFile(`./modchannel/${message.guild.id}/setting.txt`, chan.id , function(err) {
                message.channel.send("`" + "modlogs have been set to " + chan.name + "`")
            });
        });
      }
      if(what === "off") {
        fs.writeFile(`./modsetting/${message.guild.id}/setting.txt`, "off", function(err) {
          message.channel.send("`" + "modlogs have been turned off" + "`")
        });
      }
    }
    const what = command
    fs.readFile('./customcom/prefix/' + message.guild.id + "/prefix" + ".txt", function(err, data) {
      fs.readFile('./customcom/com/' + message.guild.id + "/" + what + "/" + what + ".txt", function(err, data2) {
        if(err) return;
        message.channel.send(" " + data2)
      });
    });
    fs.readFile(`./antiads/${message.guild.id}/en.txt`, "utf8" ,function(err, data) {
      if(err) return;
      if(data === "on") {
        fs.readFile(`./antiads/${message.guild.id}/whitelist.txt`, "utf8" ,function(err, data3) {
          if(message.channel.id === data3) return;
          fs.readFile(`./antiads/${message.guild.id}/setting.txt`, "utf8" ,function(err, data2) {
            if(data2 === "delete") {
              var no = [
                "discord.gg",
                "discordapp.com/invite/"
              ]
              if (no.some(word => message.content.toLowerCase().includes(word))) {
                if(message.member.hasPermission("ADMINISTRATOR")) return;
                message.delete()
                message.channel.send(message.author + ", please do not advertise")
                .then(r=> r.delete(3000))
              }
            }
            if(data2 === "kick") {
              var no = [
                "discord.gg",
                "discordapp.com/invite/"
              ];
              if (no.some(word => message.content.toLowerCase().includes(word))) {
                message.delete()
                if(!message.member.kickable) return;
                message.member.kick("Advertising")
                message.channel.send(message.author + ", please do not advertise")
                .then(r=> r.delete(3000))
              }
            }
            if(data2 === "ban") {
              var no = [
                "discord.gg",
                "discordapp.com/invite/"
              ];
              if (no.some(word => message.content.toLowerCase().includes(word))) {
                message.delete()
                if(!message.member.bannable) return;
                message.member.ban({reason: "Advertising"})
                message.channel.send(message.author + ", please do not advertise")
                .then(r=> r.delete(3000))
              }
            }
          });
        });
      }
    });
    if(command === `!r`) {
        fs.readdir(`./cases/${message.guild.id}`, function(err, items) {
            fs.readFile(`./modsetting/${message.guild.id}/setting.txt`, 'utf8', function(err, shit33) {
                if(err) return;
                if(shit33 === "on") {
                  fs.readFile(`./modchannel/${message.guild.id}/setting.txt`, 'utf8', function(err, shit) {
                    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("`You must have 'ADMINISTRATOR' permission to use this command`")
                    let wadaok = bot.channels.find('id', shit)
                    if(!wadaok) return;
                    if(message.channel.id !== shit) return;
                    message.delete()
                    const what = args[0]
                    const what2 = args.slice(1).join(' ')
                    let lmao = message.channel.fetchMessages()
                    fs.readdir(`./cases/${message.guild.id}`, function(err, items) {
                      var itemz = items.length
                      fs.readFile(`./names/${message.guild.id}/` + what + ".txt", 'utf8', function(err, data2) {
                        fs.readFile(`./casename/${message.guild.id}/` + what + ".txt", 'utf8', function(err, data3) {
                          fs.readFile(`./color/${message.guild.id}/` + what + ".txt", 'utf8', function(err, data4) {
                            if(message.author.id !== bot.user.id) {
                              const fuck = new Discord.RichEmbed()
                              .setDescription("Case " + what +  " | " + data3)
                              .addField("User", data2)
                              .setColor(data4)
                              .addField("Moderator", message.author.username + "#" + message.author.discriminator)
                              .addField("Reason", what2)
                              lmao.then(r=> {
                                fs.readFile(`./cases/${message.guild.id}/` + what + ".txt", 'utf8', function(err, data) {
                                  let lolfcku = r.find(r=> r.id === data)
                                  if(!lolfcku) return message.channel.send("`Case not found`")
                                  .then(r=> r.delete(3000))
                                  if(lolfcku) return lolfcku.edit(fuck)
                                });
                              }).catch(err=> {
                                message.channel.send("`Something went wrong`")
                                .then(r=> r.delete(3000))
                              });
                            }
                          });
                        });
                      });
                    });
                  });
                }
              });
            });
          }
});
bot.on('guildDelete', guild => {
    if (settings.game) {
      var text = gamename
      var values = {
        servers: bot.guilds.size,
        users: bot.users.size
      }
      var games = text.replace(/\{\{([^}]+)\}\}/g, function(i, match) {
          return values[match]
      });
      bot.user.setPresence(games, {type: 0})
    }
    if (settings.guildNotify) {
      bot.channels.find(r=> r.id === settings.guildNotifyChannel).send("`I've been removed from: " + guild.name + " ///Owner: "+ guild.owner.user.username + "#" + guild.owner.user.discriminator + ` // ${guild.members.size} members // ` + `ID: // ${guild.id}` + "`")
    }
});
bot.on('guildCreate', guild => {
    if (settings.allowBotFarms == false) {
      guild.fetchMembers()
      .then(r=> {
        let lol = r.members.filter(r=> r.user.bot).size
        let lol2 = r.members.filter(r=> !r.user.bot).size
        if(lol > 10 && lol > lol2) {
          const embed = new Discord.RichEmbed()
          .setDescription("Someone tried to add me to a bot farm!")
          .addField("Guild name", guild.name)
          .addField("Owner", r.owner.id + " (" + r.owner.user.tag + ")")
          .addField("Humans", lol2)
          .addField("Bots", lol)
          if (settings.guildNotify) bot.channels.find(r=> r.id === settings.guildNotifyChannel).send(embed)
          guild.leave()
        }
      });
    }
    if (settings.game) {
      var text = gamename
      var values = {
        servers: bot.guilds.size,
        users: bot.users.size
      }
      var games = text.replace(/\{\{([^}]+)\}\}/g, function(i, match) {
          return values[match]
      });
      bot.user.setPresence(games, {type: 0})
    }
    fs.readFile(`./blacklisted/${guild.owner.id}/black.txt`, function(err, data) {
        if(data === "true") {
            setTimeout(function() {
              guild.leave()
            }, 2000);
        }
        if(err) {
          let main1 = guild.channels.find(r=> r.name === "general")
          var color = ["#00ff00","#00ffd2","#ff0000","#002bff","#ff00db","#d7ff05","#ff9c05"]
          var colors = color[Math.floor(Math.random() * color.length)];
          const help = new Discord.RichEmbed()
          .setTitle("Heyo!")
          .setColor(colors)
          .addField("Thanks for adding me to your server!", "I am made by SilverRoxetZZ, and I am a multi-purpose bot, maybe not a full multi-purpose but a meme bot.")
          .addField("type " + prefix + "help for a list of commands I can give you", "Enjoy using me!")
          if(!main1) return;
          main1.send(help)
        }
    });
    if (settings.guildNotify) {
      bot.channels.find(r=> r.id === settings.guildNotifyChannel).send("`I've been added to: " + guild.name + " ///Owner: "+ guild.owner.user.username + "#" + guild.owner.user.discriminator + ` // ${guild.members.size} members // ` + `ID: // ${guild.id}` + "`")
    }
});
bot.on('guildMemberAdd', member => {
    fs.readFile(`./userads/${member.guild.id}/en.txt`, "utf8" ,function(err, data) {
        if(err) return;
        if(data === "on") {
            fs.readFile(`./userads/${member.guild.id}/setting.txt`, "utf8" ,function(err, data2) {
              if(data2 === "kick") {
                var no = [
                    "discord.gg",
                    "discordapp.com/invite/"
                ];
                if(no.some(word=> member.user.username.toLowerCase().includes(word))) {
                  member.kick("Advertising username/nickname")
                }
              }
              if(data2 === "ban") {
                var no = [
                  "discord.gg",
                  "discordapp.com/invite/"
                ];
                if(no.some(word=> member.user.username.includes(word))) {
                    member.ban("Advertising username/nickname")
                }
            }
        });
    }
  });
  fs.readFile('./config/' + member.guild.id + "/setting.txt", 'utf8', function(err, data) {
    if(err) return;
    if(data === "on") {
    fs.readFile('./config/' + member.guild.id + "/channel.txt", 'utf8', function(err, data2) {
        if(err) return;
        fs.readFile('./config/' + member.guild.id + "/message.txt", 'utf8', function(err3, data3) {
          if(err3) return;
          member.guild.fetchMembers()
          .then(r=> {
            var text = data3
            var values = {
              server: member.guild.name,
              user: member,
              owner: r.owner.user.tag,
              members: r.members.size,
              humans: r.members.filter(r=> !r.user.bot).size,
              bots: r.members.filter(r=> r.user.bot).size
            }
            var mystring = text.replace(/\{\{([^}]+)\}\}/g, function(i, match) {
              return values[match]
            });
            let lmaof = bot.channels.find(r=> r.id === data2)
            if(!lmaof) return;
            bot.channels.get(data2).send(mystring)
          });
        });
      });
    }
  });
  fs.readFile('./antialt/' + member.guild.id + "/config.txt", 'utf8', function(err, data) {
    fs.readFile('./antialt/' + member.guild.id + "/date.txt", 'utf8', function(err, data2) {
      if(err) return;
      if(data === "on") {
        if(Date.now() - member.user.createdAt < Number(data2)*24*60*60*1000) {
            member.send("Accounts must be older than " + data2 + " day(s) in order to join this server.")
            setTimeout(function() {
               member.kick()
            }, 1000);
          } else {}
      }
    });
  });
});
bot.on('guildMemberRemove', member => {
    var dir = `./cases/${member.guild.id}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    var dir2 = `./names/${member.guild.id}`;
    if (!fs.existsSync(dir2)){
       fs.mkdirSync(dir2);
    }
    var dir3 = `./casename/${member.guild.id}`;
    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
    }
    var dir4 = `./color/${member.guild.id}`;
    if (!fs.existsSync(dir4)){
       fs.mkdirSync(dir4);
    }
    fs.readdir(`./cases/${member.guild.id}`, function(err, items) {
        fs.readFile(`./modsetting/${member.guild.id}/setting.txt`, 'utf8', function(err, shit33) {
            if(err) return;
            if(shit33 === "on") {
              fs.readFile(`./modchannel/${member.guild.id}/setting.txt`, 'utf8', function(err, shit) {
                let wadaok = bot.channels.find('id', shit)
                if(!wadaok) return;
                var itemrare = items.length + 1
                let lol = bot.channels.find(r=> r.name )
                if(!lol) return;
                member.guild.fetchAuditLogs()
                .then(r=> {
                  let lmfao = r.entries.filter(r=> r.actionType === "DELETE").filter(r=> r.action === "MEMBER_KICK")
                  let lmfao2 = lmfao.map(r=> r.target.id)
                  const altreason = lmfao.first().reason
                  const altmoderator = lmfao.first().executor.username + "#" +  lmfao.first().executor.discriminator
                  const timeaudit = Date.now() - lmfao.first().createdTimestamp
                  if(Math.floor(timeaudit/1000) < -22) {
                    const embed = new Discord.RichEmbed()
                    .setDescription("Case " + itemrare +  " | Kick")
                    .addField("User", member.user.username + "#" + member.user.discriminator + " (" + member.user + ")")
                    .addField("Moderator", altmoderator)
                    .setColor("#FFA500")
                    .addField("Reason", altreason !== null ? altreason : "`moderator, please do !r " + itemrare + " <reason>`")
                    bot.channels.get(shit).send(embed)
                    .then(r=> {
                      fs.readdir(`./cases/${member.guild.id}/`, function(err, items) {
                        fs.readdir(`./names/${member.guild.id}/`, function(err, items2) {
                          fs.readdir(`./casename/${member.guild.id}/`, function(err, items22) {
                            fs.readdir(`./color/${member.guild.id}/`, function(err, items33) {
                              var items1 = items.length + 1
                              var items3 = items2.length + 1
                              var items4 = items22.length + 1
                              var items5 = items33.length + 1
                              fs.writeFile(`./cases/${member.guild.id}/` + items1 + ".txt", r.id, function(err) {
                                fs.writeFile(`./names/${member.guild.id}/` + items3 + ".txt", member.user.username + "#" + member.user.discriminator + "(" + member.user + ")", function(err) {
                                  fs.writeFile(`./casename/${member.guild.id}/` + items4 + ".txt", "Kick", function(err) {
                                    fs.writeFile(`./color/${member.guild.id}/` + items4 + ".txt", "#FFA500", function(err) {
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  }
                });
              });
            }
          });
    });
    fs.readFile('./config/' + member.guild.id + "/gsetting.txt", 'utf8', function(err, data) {
        if(err) return;
        if(data === "on") {
          fs.readFile('./config/' + member.guild.id + "/gchannel.txt", 'utf8', function(err, data2) {
            if(err) return;
            fs.readFile('./config/' + member.guild.id + "/gmessage.txt", 'utf8', function(err3, data3) {
              if(err3) return;
              member.guild.fetchMembers()
              .then(r=> {
                var text = data3
                var values = {
                  server: member.guild.name,
                  user: member.user.username + "#" + member.user.discriminator,
                  owner: r.owner.user.tag,
                  members: r.members.size,
                  humans: r.members.filter(r=> !r.user.bot).size,
                  bots: r.members.filter(r=> r.user.bot).size
                }
                var mystring = text.replace(/\{\{([^}]+)\}\}/g, function(i, match) {
                  return values[match]
                });
                let lmaof = bot.channels.find(r=> r.id === data2)
                if(!lmaof) return;
                bot.channels.get(data2).send(mystring)
              });
            });
          });
        }
      });
    });
bot.on('voiceStateUpdate', (oldMember, newMember) => {
  const fuck = newMember.guild.member(botID).voiceChannel
  if(!fuck) return;
  fs.readFile(`./musicsettings/${newMember.guild.id}/config.txt`, "utf8", function(err, data) {
    const nigga = fuck.members.filter(r=> !r.user.bot).size
    if(nigga <1) {
      const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == newMember.guild.id);
      const dispatcher = voiceConnection.player.dispatcher;
      if(!dispatcher) return;
      if (dispatcher.paused) return;
      if (!dispatcher.paused) dispatcher.pause();
      fs.readFile(`./musicsettings/${newMember.guild.id}/channel.txt`, "utf8", function(err, data2) {
        if(err) return;
        bot.channels.get(data2).send("`" + "All users have left voice channel, playback is now paused." + "`").catch(err=> console.log(err))
      });
    }
    if(data === "true") {
      if(nigga >0) {
        const voiceConnection = bot.voiceConnections.find(val => val.channel.guild.id == newMember.guild.id);
        if(voiceConnection === null) return;
        const dispatcher = voiceConnection.player.dispatcher;
        if(!dispatcher) return;
        fs.readFile(`./musicsettings/${newMember.guild.id}/channel.txt`, "utf8", function(err, data2) {
            if(err) return;
            if (dispatcher.paused) {
              dispatcher.resume()
              bot.channels.get(data2).send("`" + "Playback is now resuming." + "`").catch(err=> console.log(err))
            }
            if (!dispatcher.paused) return;
        });
      }
    }
  });
});
bot.on('messageUpdate', (oldMessage, newMessage) => {
    fs.readFile(`./antiads/${newMessage.guild.id}/en.txt`, "utf8" ,function(err, data) {
        if(err) return;
        if(data === "on") {
            fs.readFile(`./antiads/${newMessage.guild.id}/setting.txt`, "utf8" ,function(err, data2) {
                fs.readFile(`./antiads/${newMessage.guild.id}/whitelist.txt`, "utf8" ,function(err, data3) {
                    if(newMessage.channel.id === data3) return;
                    if(err) {}
                    if(data2 === "delete") {
                      var no = [
                        "discord.gg",
                        "discordapp.com/invite/"
                      ];
                      if (no.some(word => newMessage.content.toLowerCase().includes(word))) {
                        if(newMessage.member.hasPermission("ADMINISTRATOR")) return;
                        newMessage.delete()
                        newMessage.channel.send(newMessage.author + ", please do not advertise")
                        .then(r=> r.delete(3000))
                      }
                    }
                    if(data2 === "kick") {
                      var no = [
                        "discord.gg",
                        "discordapp.com/invite/"
                      ];
                      if (no.some(word => newMessage.content.toLowerCase().includes(word))) {
                        newMessage.delete()
                        if(!newMessage.member.kickable) return;
                        newMessage.member.kick("Advertising")
                        newMessage.channel.send(newMessage.author + ", please do not advertise")
                        .then(r=> r.delete(3000))
                      }
                    }
                    if(data2 === "ban") {
                        var no = [
                          "discord.gg",
                          "discordapp.com/invite/"
                        ];
                        if (no.some(word => newMessage.content.toLowerCase().includes(word))) {
                          newMessage.delete()
                          if(!newMessage.member.bannable) return;
                          newMessage.member.ban("Advertising")
                          newMessage.channel.send(newMessage.author + ", please do not advertise")
                          .then(r=> r.delete(3000))
                        }
                    }
              });
          });
        }
    });
});
bot.on('guildBanAdd', (guild, user) => {
    var dir = `./cases/${guild.id}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    var dir2 = `./names/${guild.id}`;
    if (!fs.existsSync(dir2)){
       fs.mkdirSync(dir2);
    }
    var dir3 = `./casename/${guild.id}`;
    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
    }
    var dir4 = `./color/${guild.id}`;
    if (!fs.existsSync(dir4)){
        fs.mkdirSync(dir4);
    }
    fs.readdir(`./cases/${guild.id}`, function(err, items) {
          fs.readFile(`./modsetting/${guild.id}/setting.txt`, 'utf8', function(err, shit33) {
            if(err) return;
            if(shit33 === "on") {
              fs.readFile(`./modchannel/${guild.id}/setting.txt`, 'utf8', function(err, shit) {
                let wadaok = bot.channels.find('id', shit)
                if(!wadaok) return;
                var itemrare = items.length + 1
                let lol = bot.channels.find(r=> r.name )
                if(!lol) return;
                guild.fetchAuditLogs()
                .then(r=> {
                  let lmfao = r.entries.filter(r=> r.actionType === "DELETE").filter(r=> r.action === "MEMBER_BAN_ADD")
                  let lmfao2 = lmfao.map(r=> r.target.id)
                  const altreason = lmfao.first().reason
                  const altmoderator = lmfao.first().executor.username + "#" +  lmfao.first().executor.discriminator
                  const embed = new Discord.RichEmbed()
                  .setDescription("Case " + itemrare +  " | Ban")
                  .addField("User", user.username + "#" + user.discriminator + " (" + user + ")")
                  .addField("Moderator", altmoderator)
                  .setColor("#FF0000")
                  .addField("Reason", altreason !== null ? altreason : "`moderator, please do !r " + itemrare + " <reason>`")
                  bot.channels.get(shit).send(embed)
                  .then(r=> {
                    fs.readdir(`./cases/${guild.id}/`, function(err, items) {
                      fs.readdir(`./names/${guild.id}/`, function(err, items2) {
                        fs.readdir(`./casename/${guild.id}/`, function(err, items22) {
                          fs.readdir(`./color/${guild.id}/`, function(err, items33) {
                            var items1 = items.length + 1
                            var items3 = items2.length + 1
                            var items4 = items22.length + 1
                            var items5 = items33.length + 1
                            fs.writeFile(`./cases/${guild.id}/` + items1 + ".txt", r.id, function(err) {
                              fs.writeFile(`./names/${guild.id}/` + items3 + ".txt", user.username + "#" + user.discriminator + "(" + user + ")", function(err) {
                                fs.writeFile(`./casename/${guild.id}/` + items4 + ".txt", "Ban", function(err) {
                                  fs.writeFile(`./color/${guild.id}/` + items4 + ".txt", "#FF0000", function(err) {
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
        });
    });
});
bot.on('guildBanRemove', (guild, user) => {
    var dir = `./cases/${guild.id}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    var dir2 = `./names/${guild.id}`;
    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
    }
    var dir3 = `./casename/${guild.id}`;
    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
    }
    var dir4 = `./color/${guild.id}`;
    if (!fs.existsSync(dir4)){
        fs.mkdirSync(dir4);
    }
    fs.readdir(`./cases/${guild.id}`, function(err, items) {
        fs.readFile(`./modsetting/${guild.id}/setting.txt`, 'utf8', function(err, shit33) {
            if(err) return;
            if(shit33 === "on") {
              fs.readFile(`./modchannel/${guild.id}/setting.txt`, 'utf8', function(err, shit) {
                let wadaok = bot.channels.find('id', shit)
                if(!wadaok) return;
                var itemrare = items.length + 1
                guild.fetchAuditLogs()
                .then(r=> {
                  let lmfao = r.entries.filter(r=> r.actionType === "CREATE").filter(r=> r.action === "MEMBER_BAN_REMOVE")
                  let lmfao2 = lmfao.map(r=> r.target.id)
                  const altreason = lmfao.first().reason
                  const altmoderator = lmfao.first().executor.username + "#" +  lmfao.first().executor.discriminator
                  const embed = new Discord.RichEmbed()
                  .setDescription("Case " + itemrare +  " | Unban")
                  .addField("User", user.username + "#" + user.discriminator + " (" + user + ")")
                  .addField("Moderator", altmoderator)
                  .setColor("#00FF00")
                  .addField("Reason", altreason !== null ? altreason : "`moderator, please do !r " + itemrare + " <reason>`")
                  bot.channels.get(shit).send(embed)
                  .then(r=> {
                    fs.readdir(`./cases/${guild.id}/`, function(err, items) {
                      fs.readdir(`./names/${guild.id}/`, function(err, items2) {
                        fs.readdir(`./casename/${guild.id}/`, function(err, items22) {
                          fs.readdir(`./color/${guild.id}/`, function(err, items33) {
                            var items1 = items.length + 1
                            var items3 = items2.length + 1
                            var items4 = items22.length + 1
                            var items5 = items33.length + 1
                            fs.writeFile(`./cases/${guild.id}/` + items1 + ".txt", r.id, function(err) {
                              fs.writeFile(`./names/${guild.id}/` + items3 + ".txt", user.username + "#" + user.discriminator + "(" + user + ")", function(err) {
                                fs.writeFile(`./casename/${guild.id}/` + items4 + ".txt", "Unban", function(err) {
                                  fs.writeFile(`./color/${guild.id}/` + items4 + ".txt", "#00FF00", function(err) {
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
        });
    });
});
bot.on('guildMemberUpdate', (oldMember, newMember) => {
    fs.readFile(`./userads/${newMember.guild.id}/setting.txt`, "utf8" ,function(err, data2) {
        if(data2 === "kick") {
            var no = [
                "discord.gg",
                "discordapp.com/invite/"
            ];
            if(no.some(word=> newMember.nickname === null ? undefined : newMember.nickname.includes(word) ||  newMember.user.username.toLowerCase().includes(word))) {
              newMember.kick("Advertising username/nickname")
            }
        }
        if(data2 === "ban") {
            var no = [
              "discord.gg",
              "discordapp.com/invite/"
            ]
            if(no.some(word=> newMember.nickname === null ? undefined : newMember.nickname.includes(word) || newMember.user.username.includes(word))) {
              newMember.ban("Advertising username/nickname")
            }
        }
    });
    var dir = `./cases/${newMember.guild.id}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    var dir2 = `./names/${newMember.guild.id}`;
    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
    }
    var dir3 = `./casename/${newMember.guild.id}`;
    if (!fs.existsSync(dir3)){
        fs.mkdirSync(dir3);
    }
    var dir4 = `./color/${newMember.guild.id}`;
    if (!fs.existsSync(dir4)){
        fs.mkdirSync(dir4);
    }
    fs.readdir(`./cases/${newMember.guild.id}`, function(err, items) {
        fs.readFile(`./modsetting/${newMember.guild.id}/setting.txt`, 'utf8', function(err, shit33) {
            if(err) return;
            if(shit33 === "on") {
              fs.readFile(`./modchannel/${newMember.guild.id}/setting.txt`, 'utf8', function(err, shit) {
                let wadaok = bot.channels.find('id', shit)
                if(!wadaok) return;
                const role = newMember.guild.roles.find(r=> r.name === "Muted")
                if(!role) return;
                if(newMember.roles.has(role.id)) {
                  if(!oldMember.roles.has(role.id)) {
                    fs.readdir(`./cases/${newMember.guild.id}`, function(err, items) {
                      var itemrare = items.length + 1
                      let lol = bot.channels.find('id', shit)
                      if(!lol) return;
                      newMember.guild.fetchAuditLogs()
                      .then(r=> {
                        let lmfao = r.entries.filter(r=> r.actionType === "UPDATE").filter(r=> r.action === "MEMBER_ROLE_UPDATE")
                        let lmfao2 = lmfao.map(r=> r.target.id)
                        const altmoderator = lmfao.first().executor.username + "#" +  lmfao.first().executor.discriminator
                        const embed = new Discord.RichEmbed()
                        .setDescription("Case " + itemrare +  " | Mute")
                        .addField("User", newMember.user.username+ "#" + newMember.user.discriminator + " (" + newMember + ")")
                        .addField("Moderator", altmoderator)
                        .setColor("#FFFF00")
                        .addField("Reason", "`moderator, please do !r " + itemrare + " <reason>`")
                        bot.channels.get(shit).send(embed)
                        .then(r=> {
                          fs.readdir(`./cases/${newMember.guild.id}`, function(err, items) {
                            fs.readdir(`./names/${newMember.guild.id}`, function(err, items2) {
                              fs.readdir(`./casename/${newMember.guild.id}`, function(err, items22) {
                                fs.readdir(`./color/${newMember.guild.id}`, function(err, items33) {
                                  var items1 = items.length + 1
                                  var items3 = items2.length + 1
                                  var items4 = items22.length + 1
                                  var items5 = items33.length + 1
                                  fs.writeFile(`./cases/${newMember.guild.id}/` + items1 + ".txt", r.id, function(err) {
                                    fs.writeFile(`./names/${newMember.guild.id}/` + items3 + ".txt", newMember.user.username + "#" + newMember.user.discriminator + "(" + newMember + ")", function(err) {
                                      fs.writeFile(`./casename/${newMember.guild.id}/` + items4 + ".txt", "Mute", function(err) {
                                        fs.writeFile(`./color/${newMember.guild.id}/` + items4 + ".txt", "#FFFF00", function(err) {
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  }
                }
    if(oldMember.roles.has(role.id) && !newMember.roles.has(role.id)) {
        fs.readdir(`./cases/${newMember.guild.id}`, function(err, items) {
            var itemrare = items.length + 1
            let lol = bot.channels.find('id', shit)
            if(!lol) return;
            newMember.guild.fetchAuditLogs()
            .then(r=> {
              let lmfao = r.entries.filter(r=> r.actionType === "UPDATE").filter(r=> r.action === "MEMBER_ROLE_UPDATE")
              let lmfao2 = lmfao.map(r=> r.target.id)
              const altmoderator = lmfao.first().executor.username + "#" +  lmfao.first().executor.discriminator
              const embed = new Discord.RichEmbed()
              .setDescription("Case " + itemrare +  " | Unmute")
              .addField("User", newMember.user.username+ "#" + newMember.user.discriminator + " (" + newMember + ")")
              .addField("Moderator", altmoderator)
              .setColor("#00FF00")
              .addField("Reason", "`moderator, please do !r " + itemrare + " <reason>`")
              bot.channels.get(shit).send(embed)
              .then(r=> {
                fs.readdir(`./cases/${newMember.guild.id}`, function(err, items) {
                  fs.readdir(`./names/${newMember.guild.id}`, function(err, items2) {
                    fs.readdir(`./casename/${newMember.guild.id}`, function(err, items22) {
                        fs.readdir(`./color/${newMember.guild.id}`, function(err, items33) {
                          var items1 = items.length + 1
                          var items3 = items2.length + 1
                          var items4 = items22.length + 1
                          var items5 = items33.length + 1
                          fs.writeFile(`./cases/${newMember.guild.id}/` + items1 + ".txt", r.id, function(err) {
                            fs.writeFile(`./names/${newMember.guild.id}/` + items3 + ".txt", newMember.user.username + "#" + newMember.user.discriminator + "(" + newMember + ")", function(err) {
                              fs.writeFile(`./casename/${newMember.guild.id}/` + items4 + ".txt", "Unmute", function(err) {
                                fs.writeFile(`./color/${newMember.guild.id}/` + items4 + ".txt", "#00FF00", function(err) {
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          }
        });
      }
    });
  });
});

bot.login(settings.token)
