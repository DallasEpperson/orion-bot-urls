const knownUrls = require('./urls.config.json');

let sentenceSyntax = /(?:(?:list|say|show(?: me| us)?|tell (?:me|us)|what (?:are|is)|what're|what's)) (?:all )?the (?:([^"]*) )?url(?:s)?(?: for ([^"]*))?/i;
//TODO tweak regex to guarantee either group 1 or 2

module.exports.PluginName = 'URL Repository';

module.exports.CanHandleMessage = function(messageText){
    let syntaxPasses = sentenceSyntax.test(messageText.toLowerCase());
    if (!syntaxPasses) return false;
    let match = sentenceSyntax.exec(messageText.toLowerCase());
    if(!match[1] && !match[2]) return false;
    return true;
};

module.exports.HandleMessage = function(event, sendMsg){
    let requestedUrlName = '';
    let match = sentenceSyntax.exec(event.text.toLowerCase());
    if(!!match[1]) requestedUrlName = match[1].toLowerCase();
    if(!!match[2]) requestedUrlName = match[2].toLowerCase();

    let matchingUrls = knownUrls.filter(function(a){return a.tags.includes(requestedUrlName)});

    if(matchingUrls < 1){
        sendMsg('Sorry, I am not familiar with any URLs matching that description.', event.channel);
        return;
    }
    
    if(matchingUrls.length === 1){
        sendMsg(`<${matchingUrls[0].url}|${matchingUrls[0].name}>`, event.channel);
        return;
    }
    
    let msg = matchingUrls.map(function(a){return `• <${a.url}|${a.name}>`}).join('\n');
    sendMsg(msg, event.channel);
};