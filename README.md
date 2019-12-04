jankdefer 🖥🔥
=============

It's like [domready](https://www.npmjs.com/package/domready), except it defers loading until the page framerate stabilizes. The
idea is that if requestAnimationFrame is running slowly, then the page has
either not loaded yet or the page is in a background tab.

This script ensures requestAnimationFrame runs at least 50fps for several frames
before calling back.

See also: [requestIdleCallback|https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback]

Usage
-----

Basic usage should be good enough for most scenarios:
```
const jankdefer = require('jankdefer');

jankdefer(myFunction);
```

Usage with options:
```
const jankdefer = require('jankdefer');

jankdefer(myFunction, {
  framerateTarget: 50,
  timeout: 3000,
  threshold: 5,
  debug: false,
});
```

Default options
-------------

Property        | Default | Description         
----------------|---------|---------------------
framerateTarget | 50      | Wait until the system is running at least 50fps. (Some slower devices do not run at 60)
timeout         | 3000    | Number of milliseconds after which the function will run anyway.
threshold       | 5       | Wait at least this many successful runs before calling back.
debug           | false   | Print debug info if you want to understand what's happening.
