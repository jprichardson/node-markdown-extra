var testutil = require('testutil')
  , mde = require('../lib/markdown-extra')

var data = [""
       , "<!--"
       , "author: JP Richardson"
       , "publish: 2012-03-04"
       , "tags: war, history"
       , "anything: can write anything"
       , "-->"
       , ""
       , "The Fall of the Roman Empire"
       , "============================"
       , ""
       , "**Julius Ceasar** was..."
       , ""
       , ""].join('\n');

var data2 = [""
       , "<!--"
       , "author: JP Richardson"
       , "publish: 2012-03-04"
       , "tags: war, history"
       , "anything: can write anything"
       , "-->"
       , ""
       , "# The Fall of the Roman Empire"
       , ""
       , "**Julius Ceasar** was..."
       , ""
       , ""].join('\n');


suite('markdown-extra')

test('+ metadata', function() {
  var metaData = mde.metadata(data);

  var d = [
      "author: JP Richardson"
    , "publish: 2012-03-04"
    , "tags: war, history"
    , "anything: can write anything"
  ].join('\n')

  EQ (metaData, d)
})

test('+ metadata / with parsing', function() {
  var metadata = mde.metadata(data, function(md){ 
    var retObj = {};
    md.split('\n').forEach(function(line) {
      var data = line.split(':');
      retObj[data[0].trim()] = data[1].trim();
    });
    return retObj;
  });

  EQ (metadata.author, 'JP Richardson')
  EQ (metadata.publish, '2012-03-04')
  EQ (metadata.tags, 'war, history')
  EQ (metadata.anything, 'can write anything')
})

test('+ content', function() {
  var content = mde.content(data2);

  var d = [
      "# The Fall of the Roman Empire"
    , ""
    , "**Julius Ceasar** was..."
    , ""
    , ""].join('\n');

  EQ (content, d);
})

test('+ heading', function() {
  var title1 = mde.heading(data);
  var title2 = mde.heading(data2);

  EQ (title1, 'The Fall of the Roman Empire')
  EQ (title2, 'The Fall of the Roman Empire')
})

test('+ title', function() {
  var title1 = mde.title(data);
  var title2 = mde.title(data2);

  EQ (title1, 'The Fall of the Roman Empire')
  EQ (title2, 'The Fall of the Roman Empire')
})


