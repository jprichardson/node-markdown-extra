var marked = require('marked')

var MD_TOKEN_START = '<!--'
  , MD_TOKEN_END = '-->';

module.exports.metadata = function(content, type, parser) {
  var md = fetchMetadata(content).trim();

  var parsed = undefined;
  if (parser)
    parsed = parser(md);
  else
    parsed = md;

  if(type == 'json') {
    var json = {};

    parsed.split('\n').forEach(function(tupel) {
      var line = tupel.split(':');
      
      json[line[0].trim()] = line[1].trim();
    })

    return json;
  } else {
    return parsed;
  }
}

module.exports.content = function(content) {
  var metaData = fetchMetadata(content);

  return content.replace(MD_TOKEN_START + metaData + MD_TOKEN_END, '').trimLeft();
}

module.exports.heading = function(content) {
  content = module.exports.content(content);
  var items = marked.lexer(content);

  for (var i = 0; i < items.length; ++i) {
    if (items[i].type === 'heading' && items[i].depth === 1) return items[i].text;
  }
  
  return null;
}

module.exports.title = module.exports.heading


function fetchMetadata(content) {
  var pos1 = content.indexOf(MD_TOKEN_START) + MD_TOKEN_START.length;
  var pos2 = content.indexOf(MD_TOKEN_END, pos1);

  var metaData = content.substring(pos1, pos2);
  return metaData;
}
