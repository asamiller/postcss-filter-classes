/**
 * @module filter-classes
 */

var postcss = require('postcss')

/**
 * Escape a string so that it can be turned into a regex
 * @param  {String} str String to transform
 * @return {String}     Escaped string
 */
function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

/**
 * Turn strings from rules to remove into a regexp to concat them later
 * @param  {Mixed Array} rulesToKeep
 * @return {RegExp Array}
 */
function regexize (rulesToKeep) {
  var rulesRegexes = []
  for (var i = 0, l = rulesToKeep.length; i < l; i++) {
    if (typeof rulesToKeep[i] === 'string') {
      rulesRegexes.push(new RegExp('^\s*' + escapeRegExp(rulesToKeep[i]) + '\s*$'))
    } else {
      rulesRegexes.push(rulesToKeep[i])
    }
  }
  return rulesRegexes
}

/**
 * Concat various regular expressions into one
 * @param  {RegExp Array} regexes
 * @return {RegExp}       concatanated regexp
 */
function concatRegexes (regexes) {
  var rconcat = ''

  if (Array.isArray(regexes)) {
    for (var i = 0, l = regexes.length; i < l; i++) {
      rconcat += regexes[i].source + '|'
    }

    rconcat = rconcat.substr(0, rconcat.length - 1)

    return new RegExp(rconcat)
  }
}

/**
 * Return the actual postcss plugin to remove rules from the css
 */
var filterClasses = postcss.plugin('filter-classes', function (options) {
  return function hello (css) {
    var remregexes = regexize(options.rulesToKeep)
    var regex = concatRegexes(remregexes)

    css.walkRules(filterRule)

    function filterRule (rule) {
      var selectors = rule.selectors
      var filtered = []

      for (var j = 0, len = selectors.length; j < len; j++) {
        if (selectors[j].match(regex) !== null) {
          filtered.push(selectors[j])
        }
      }

      if (filtered.length > 1) {
        rule.selector = filtered.join(', ')
      } else if (filtered.length === 1) {
        rule.selector = filtered[0].trim()
      } else {
        rule.remove()
      }
    }
  }
})

module.exports = filterClasses
