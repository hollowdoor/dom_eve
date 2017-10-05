dom-eve
======

Install
----

`npm install --save dom-eve`

Use `rollup`, or some other module transpiler to include this library in your project.

Usage
---

```javascript
import events from 'dom-eve';
//Listen to a click event
events('#clickme').on('click', event=>{
    console.log('click!');
});
```

events(selector|element, tracker|undefined)
------------

The element of the first argument is the one that gets events.

`tracker` is an object that tracks events for clearing later.

events().on()
---------

Set an event listener. This is exactly like setting `element.addEventListener(name, handler, options|useCapture)`.

events().off()
-----

Remove an event listener. This is exactly like doing `element.removeEventListener(name, handler, options|useCapture)`.

events().clear()
----------

Remove all event listeners at once.

events.track()
-----

Create an event tracker that has a clear method. Use the clear method to remove all listeners from all elements being tracked.

```javascript
import events from 'dom-eve';
//A tracker keeps track of events.
let tracker = events.track();

//The optional second argument to events() can be
//a tracker which is created with event.track();
events('#clickme', tracker).on('click', event=>{
    console.log('click!');
});

events('#remove', tracker).on('click', event=>{
    //Clear all of the events of '#clickme'
    //and '#remove'
    tracker.clear();
});
```

About
----

I keep using the same pattern of setting normal events, and then removing them all at once later. This module is meant to make this "pattern" easier. `.on` is also easier than `.addEventListener`.

`dom-eve` uses `Object.create` so it might not support all the browsers you want. Otherwise it works quite well.
