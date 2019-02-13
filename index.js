const knownUrls = require('./urls.config.json');

let sentenceSyntax = /(?:say the |tell me the |(?:what is|what's) the )(?:([^"]*) )?url(?: for ([^"]*))?/;
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
    let urlFound = '';
    let match = sentenceSyntax.exec(event.text.toLowerCase());
    if(!!match[1]) requestedUrlName = match[1];
    if(!!match[2]) requestedUrlName = match[2];

    knownUrls.forEach(function (knownUrl){
        knownUrl.names.forEach(function(urlAlias){
            if (urlAlias === requestedUrlName){
                urlFound = knownUrl.url;
                return;
            }
        });
    });
    
    sendMsg(!urlFound? 'Sorry, I am not familiar with that URL.' : urlFound, event.channel);
};