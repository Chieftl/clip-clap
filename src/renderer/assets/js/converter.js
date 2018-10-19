let convertRules = {
  'phones': {
    'restriction': text => text.replace(/[- ()]/g, '').trim().match(/\d{10,}/gm),
    'convert': val => {
      //067 123 456 7
      //067 123 456 7 ; 067 223 456 7
      let lines = val.split(/[\r\n;]/)
      lines = lines.map(line => line.trim().replace(/^(0\d{2}) ?/, '+38($1)'))
      val = lines.join('; ')
      return val
    },
  },
  'coords': {
    'restriction': text => text.match(/-?\d+, ?-?\d+/gm),
    'convert': text => text.replace(/^(-?\d+).(\d+), ?(-?\d+).(\d+)$/gm, '$1,$2; $3,$4'),
  },
  'opening_hours': {
    'restriction': text => text.match(/^(mf|ms|ьа|ьі) ?\d{4}/gm),
    'convert': val => {
      //mf1018u1220
      //ms1018 a 1119 u1220
      //mf10131418u1220
      //mf8181314u920
      //ьа8181314ф920
      val = val.toLowerCase()
      val = val.replace(/([ьаіфг])/g, match => 'mfsau'['ьаіфг'.indexOf(match)])
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
