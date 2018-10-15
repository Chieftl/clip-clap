let convertRules = {
  'plus': {
    'restriction': text => text.match(/\d+\+\d+/g),
    'convert': text => text.replace(/(\d+)\+(\d+)/g, (match, val1, val2) => parseInt(val1) + parseInt(val2)),
  },
}

export default {
  convert(text) {
    for (let ruleName in convertRules) {
      let rule = convertRules[ruleName]

      if (typeof rule.restriction != 'function') new Error('restriction must be a function')
      if (typeof rule.convert != 'function') new Error('convert must be a function')

      if (!rule.restriction(text)) continue
      text = rule.convert(text)
    }
    return text
  }
}
