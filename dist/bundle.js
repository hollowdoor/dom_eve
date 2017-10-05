'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var eventsProto = objectAssign(Object.create(null), {
    on: function on(name, cb, options){
        this.element.addEventListener(name, cb, options);
        this._records[name] = this._records[name] || [];
        this._records[name].push([
            name, cb, options
        ]);
        return this;
    },
    off: function off(name, cb, options){
        this.element.removeEventListener(name, cb, options);

        if(this._records[name] !== void 0){
            var records = this._records[name];

            for(var i=0; i<records.length; i++){
                if(records[i][1] === cb && records[i][2] === options){
                    records.splice(i, 1);
                    if(i + 1 !== records.length){
                        --i;
                    }
                }
            }
        }
        return this;
    },
    dispatch: function dispatch(event){
        this.element.dispatchEvent(event);
        return this;
    },
    clear: function clear(){
        var this$1 = this;

        for(var name in this$1._records){
            var records = this$1._records[name];
            records.forEach(function (record){
                (ref = this$1).off.apply(ref, record);
                var ref;
            });
        }
        return this;
    }
});

function events(element, tracker){
    if ( tracker === void 0 ) tracker = null;

    var eve = Object.create(eventsProto);
    eve._records = Object.create(null);
    if(typeof element === 'string'){
        eve.element = document.querySelector(element);
    }else{
        eve.element = element;
    }    

    if(tracker){
        tracker.list.push(eve);
    }

    return eve;
}

events.track = function track(){
    return {
        list: [],
        clear: function clear(){
            this.list.forEach(function (item){
                item.clear();
            });
        }
    };
};

module.exports = events;
//# sourceMappingURL=bundle.js.map
