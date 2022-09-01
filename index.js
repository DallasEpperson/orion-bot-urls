const knownUrls = require('./urls.config.json');

let sentenceSyntax = /(?:(?:list|say|show(?: me| us)?|tell (?:me|us)|what (?:are|is)|what're|what's)) (?:all )?the (?:([^"]*) )?url(?:s)?(?: for ([^"]*))?/i;
//TODO tweak regex to guarantee either group 1 or 2

module.exports.PluginName = 'URL Repository';
module.exports.Version = '2.0.0';
module.exports.WrittenForVersion = '2.0.0';

const respond = async (say, message) => {
    let requestedUrlName = '';
    let match = sentenceSyntax.exec(message.text.toLowerCase());
    if(!!match[1]) requestedUrlName = match[1].toLowerCase();
    if(!!match[2]) requestedUrlName = match[2].toLowerCase();

    let matchingUrls = knownUrls.filter(function(a){return a.tags.includes(requestedUrlName)});

    if(matchingUrls < 1){
        await say('Sorry, I am not familiar with any URLs matching that description.');
        return;
    }

    let msg = matchingUrls.map(function(a){return `• <${a.url}|${a.name}>`}).join('\n');
    await say(msg);
};

const handleUrlQuery = async({message, say, client}) => {
    let myAppStuff = await client.auth.test();
    let appUserId = myAppStuff.user_id;

    // TODO - pass in a variable signifying if this message was directed at the bot
    switch (message.channel_type) {
        case 'channel': // public channel
        case 'group': // private channel
            if(message.text.includes(`<@${appUserId}>`)){
                await respond(say, message);
            }
            break;
        case 'im':
            await respond(say, message);
            break;
        default:
            break;
    }
};

module.exports.MessageHandlers = [
    {
        syntax: sentenceSyntax,
        handler: handleUrlQuery
    }
];