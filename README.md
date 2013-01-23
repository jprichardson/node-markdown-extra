Node.js - markdown-extra
================

Some extra methods for parsing markdown.


Why?
----

I needed some markdown parsing methods for other modules.


Installation
------------

    npm install markdown-extra



Example
-------

Take a markdown file and retrieve some info from it:

```markdown
<!--
author: JP Richardson
publish: 2012-03-04
tags: war, history
anything: can write anything
-->

The Fall of the Roman Empire
============================

**Julius Ceasar** was...

```

### heading(markdown) / title(markdown)

Get its heading or title...

```javascript
var mde = require('markdown-extra');
var title = mde.heading(mymarkdown);
console.log(title); //The Fall of the Roman Empire
```


### content(markdown)

Get its content ...

```javascript
var mde = require('markdown-extra');
var meta = mde.content(mymarkdown);

console.log(meta);
```

outputs...

```markdown
The Fall of the Roman Empire
============================

**Julius Ceasar** was...

```


### metadata(markdown, [parser])

Get its metadata. Pass in a function for an optional parser.

```javascript
var mde = require('markdown-extra');
var meta = mde.metadata(mymarkdown);

console.log(meta);
```

outputs...

    author: JP Richardson
    publish: 2012-03-04
    tags: war, history
    anything: can write anything



See tests for more usage...

License
-------

(MIT License)

Copyright 2012, JP Richardson  <jprichardson@gmail.com>


