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

  T (metaData === d)
})

test('+ content', function() {
  var content = mde.content(data2);

  var d = [
      "# The Fall of the Roman Empire"
    , ""
    , "**Julius Ceasar** was..."
    , ""
    , ""].join('\n');

  T (content === d);
})

test('+ heading', function() {
  var title1 = mde.heading(data);
  var title2 = mde.heading(data2);

  T (title1 === 'The Fall of the Roman Empire')
  T (title2 === 'The Fall of the Roman Empire')
})

