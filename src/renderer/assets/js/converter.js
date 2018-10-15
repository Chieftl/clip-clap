let convertRules = {
  'opening_hours': {
    'restriction': text => text.match(/(mf|ms)/gm),
    'convert': val => {
      //mf1018u1220
      //ms1018 a 1119 u1220
      //mf10131418u1220
      //mf8181314u920
      val = val.toLowerCase()
      val = val.replace(/[^a-z0-9]/g, '')
      val = val.replace(/([^s])a/g, '$1Sa')
      val = val.replace(/([^s])u/g, '$1Su')
      val = val.replace('SaSu', 'Sa,Su')
      val = val.replace('mf', 'Mo-Fr')
      val = val.replace('ms', 'Mo-Sa')
      val = val.replace(/(\d{2})(1[2-5])(1[2-6])([^\d]|$)/g, '$2$3$1$4')
      val = val.replace(/(\d{1,2})(\d{2})(\d{2})(\d{2})/g, '$1:00-$2:00,$3:00-$4:00')
      val = val.replace(/(\d{1,2})(\d{2})/g, '$1:00-$2:00')
      val = val.replace(/(\d)([a-z])/ig, '$1; $2')
      val = val.replace(/([a-z])(\d)/ig, '$1 $2')
      val = val.replace(/([^\d])([3-9])/g, '$10$2')
      return val
    },
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