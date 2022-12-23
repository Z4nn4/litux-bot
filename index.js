global.Discord = require("discord.js");

const { token } =require('./config.json');

const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits,
    PermissionsBitField,
    Partials,
    REST,
    Routes,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    InteractionType,
    SlashCommandBuilder,
    bold,
    italic,
    codeBlock,
    SelectMenuBuilder
  } = require('discord.js');

  
  
  global.client = new Client(
    {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.User
      ],
    }
  );

//login
client.login(token);


client.on("ready", () => {
  console.log("Sono Online!")


  client.guilds.cache.forEach(guild => {
    guild.commands.create({
        name: "creator",
        description: "the creator is?"
    })

    client.guilds.cache.forEach(guild => {
      guild.commands.create({
          name: "help",
          description: "help"
      })
    })

    client.guilds.cache.forEach(guild => {
      guild.commands.create({
          name: "panel",
          description: "panel",
          Permissions:"AMMINISTRATOR"
      })
    })

    client.guilds.cache.forEach(guild => {
      guild.commands.create({
          name: "partner",
          description: "inserisci la tua partner",
          options: [
            {
              name: "text",
              description:"inserisci la tua partner",
              type: Discord.ApplicationCommandOptionType.String,
              required: true,
            }
          ]
      })
    })
})


/*
    client.guilds.cache.forEach(guild => {
      guild.commands.create({
        name:"prova",
        description: "prova options",
        options: [
          {
            name: "prova",
            description:"prova",
            type: Discord.ApplicationCommandOptionType.String
          }
        ]
      })
    })
*/



client.on('guildMemberAdd', (member) => {

    const channel = client.channels.cache.get("1048553136203235418") //id canale benvenuto

    const embedwelcome = new EmbedBuilder()
        .setAuthor({name:`${member.user.tag}`, iconURL: `${member.displayAvatarURL()}`})
        .setTitle("Benvenuto/a su ```iltux unity```")
        .setDescription(`${member.toString()} , benvenuto/a su ${member.guild.name}. \nti ricordo di guardare in <#1046873123372412998>🎉🤗 !`)
        .setColor("#0296f1")
        .setThumbnail(`${member.displayAvatarURL()}`)
        .setFooter({text: 'by `litux unity`', iconURL: 'https://media.discordapp.net/attachments/1012788940949950556/1028265868850892830/smscr.png?width=676&height=676'})
        .setTimestamp()

    channel.send({ embeds: [embedwelcome]})})
})

client.on("interactionCreate", interaction => {
  if(!interaction.isCommand()) return

  if(interaction.commandName == "creator") {

    const embedcreator = new EmbedBuilder()
      .setTitle("creators")
      .setDescription("`_znlq_` \n `samu` \n `.ƊAƦƘX`")
      .setThumbnail("https://cdn.discordapp.com/icons/1038203733026283631/c8a8f63bcc433ff2f02922cf7195b7ce.png?size=512")
      .setTimestamp()
      .setFooter({ text: 'litux unity bot', iconURL: 'https://cdn.discordapp.com/icons/1038203733026283631/c8a8f63bcc433ff2f02922cf7195b7ce.png?size=512' })
      .setAuthor({ name: 'litux bot', iconURL: 'https://cdn.discordapp.com/icons/1038203733026283631/c8a8f63bcc433ff2f02922cf7195b7ce.png?size=512'})
    interaction.reply({embeds: [embedcreator]})
  }
})

client.on("interactionCreate", interaction => {
  if(!interaction.isCommand()) return

  if(interaction.commandName == "help") {

    const embedhelp = new EmbedBuilder()
      .setTitle('ecco tutti i comandi di questo bot')
      .setDescription(
        "> */help*" +
        "```questo comando ti diràtutti i comandi di questo bot```" +
        "*/creator*" +
        "```questo comando ti mostrerà tutti gli sviluppatori di questo bot```" +
        "*/rules*" +
        "```ti farà vedere tutte le regole del server```"
      )
      .setTimestamp()
      .setFooter({ text: 'litux unity bot', iconURL: 'https://cdn.discordapp.com/icons/1038203733026283631/c8a8f63bcc433ff2f02922cf7195b7ce.png?size=512' })
      .setAuthor({ name: 'litux bot', iconURL: 'https://cdn.discordapp.com/icons/1038203733026283631/c8a8f63bcc433ff2f02922cf7195b7ce.png?size=512'})
    interaction.reply({embeds: [embedhelp]})
  }
})
client.on("interactionCreate", interaction => {
  if(!interaction.isCommand()) return

  if(interaction.commandName == "panel") {

    const ticketbutton = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('apri un ticket')
        .setStyle(ButtonStyle.Primary)
        .setCustomId("idticket")
    );

      const ticketembedbutton = new EmbedBuilder()
      .setTitle('apri un ticket')
      .setColor('DarkRed')
      .setDescription('se ha bisogno di aiuto \n apri un ticket schiacciando i pulsanti quà in basso')
      .setTimestamp()
    
    interaction.reply({embeds: [ticketembedbutton], components:[ticketbutton]})
  }
})
client.on("interactionCreate", interaction => {
  if (!interaction.isButton()) return

  if (interaction.customId == "idticket") {

    const embedlog = new EmbedBuilder()
      .setTitle("qualcuno ha aperto un ticket")
      .setTimestamp()

    client.channels.cache.get("1052206069197324319").send({embeds:[embedlog]})
    interaction.reply({content: "per il momento siamo in manutenzione"})
  }
})

client.on("interactionCreate", interaction => {
  if(!interaction.isCommand()) return

  if(interaction.commandName == "partner") {
    const partnertext = interaction.options.getString('text')

    const embedmessage = new EmbedBuilder()
    .setTitle("partner eseguita con successo!")
    .setTimestamp()

    const embedpartner = new EmbedBuilder()
    .setTitle("partner")
    .setDescription(partnertext)
    .setTimestamp()

    client.channels.cache.get("1052229348981215346").send({embeds:[embedpartner]})

    interaction.reply({embeds:[embedmessage]})
  }
})







