const clipboard = require('electron-clipboard-extended')

export default {
  addWatcher(convertFunction) {
    if (typeof convertFunction != 'function') new Error('convertFunction must be a function')

    let clipboardTextTrigger = () => {
      let text = clipboard.readText()
      let textNew = convertFunction(text)
      if (textNew == text) return

      console.log('new text in clipboard: ', textNew)

      clipboard.off('text-changed')
      clipboard.writeText(textNew)
      setTimeout(() => clipboard.on('text-changed', clipboardTextTrigger), 500)
    }

    clipboard
    .on('text-changed', clipboardTextTrigger)
    .startWatching()
  }
}
