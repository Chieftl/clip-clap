let addNotification = msg => {
  let myNotification = new Notification('Clipboard changed', {
      body: msg
    })
}

const clipboard = require('electron-clipboard-extended')

export default {
  addWatcher(convertFunction, logFunction) {
    if (typeof convertFunction != 'function') new Error('convertFunction must be a function')
    if (typeof logFunction != 'function') new Error('convertFunction must be a function')

    let clipboardTextTrigger = () => {
      let text = clipboard.readText()
      logFunction('text:', text)

      let textNew = convertFunction(text)
      if (textNew == text) return

      logFunction('new text:', textNew)
      addNotification(`${text}\nwas changed to \n ${textNew}`)

      clipboard.off('text-changed')
      clipboard.writeText(textNew)
      setTimeout(() => clipboard.on('text-changed', clipboardTextTrigger), 500)
    }

    clipboard
    .on('text-changed', clipboardTextTrigger)
    .startWatching()
  }
}
