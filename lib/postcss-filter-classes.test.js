
var assert = require('assert')
var filterClasses = require('../lib/postcss-filter-classes')
var postcss = require('postcss')

describe('filterClasses', function () {
  it('should keep only the ruleset(s) that matches the given selectors', function (done) {
    var css = 'a { font-size: 12px; } .hello .h1 { background: red } .world { color: blue }'
    var rulesToKeep = ['.hello .h1', '.world']
    var expected = '.hello .h1 { background: red } .world { color: blue }'
    var options = { rulesToKeep: rulesToKeep, map: false }
    var result = postcss(filterClasses(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })

  it('should keep only the matching selector(s) from a group of selectors', function (done) {
    var css = '.hello .world { color: red }, .title, #id { color: red }'
    var rulesToKeep = ['.hello .world']
    var expected = '.hello .world { color: red }'
    var options = { rulesToKeep: rulesToKeep, map: false }
    var result = postcss(filterClasses(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })

  it('should support regex matching', function (done) {
    var css = '.item {} .item .desc { background: red } .list .item {}'
    var rulesToKeep = [/^\.item/]
    var expected = '.item {} .item .desc { background: red }'
    var options = { rulesToKeep: rulesToKeep, map: false }
    var result = postcss(filterClasses(options)).process(css)

    assert.strictEqual(result.css, expected)
    done()
  })
})
