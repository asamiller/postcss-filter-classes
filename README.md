PostCSS Filter Classes
===========

Based on _(stolen from)_ [CSS Byebye](https://github.com/AoDev/css-byebye).

PostCSS filter classes is a node module that lets you filter a css file down to
just the classes you want to keep.


Description
------------

It's very simple: pass a list of selectors that you want to keep and it will remove everything else from your CSS.

Usage
------

PostCSS Filter Classes is a CSS post processor and a `postcss` plugin;
read the [postcss docs](https://github.com/postcss/postcss/blob/master/docs/api.md) for more details.

**Run it as indicated in postcss docs:**

```js
var filterClasses = require('postcss-filter-classes');
postcss(filterClasses(options)).process(css);
```

* css is your stylesheet
* options is an object that has at least the `rulesToKeep` property defined.


### options

`rulesToKeep` is an array of `strings` or `regular expressions` (selectors).

If you provide a string, it will remove the rule(s) for this exact selector.


### Examples ###

Some CSS:

```css
 a { font-size: 12px; }
 .hello .h1 { background: red }
 .world { color: blue }
```

Using the plugin:

```js
var postcss = require('postcss')
var cssbyebye = require('css-byebye')

var rulesToKeep = ['.hello .h1', '.world']
var options = { rulesToKeep: rulesToKeep, map: false }

// pretend that css var contains the css above
var result = postcss(cssbyebye(options)).process(css)
```

`result` will be an object like this:

```js
{
  css: ' .hello .h1 { background: red } .world { color: blue }'
}
```

If you use the postcss `map` option, then source map will be added to the result object.
