import regexEmoji from 'regex-emoji'
import matchAll from 'match-all'
import emojis from 'emoji-named-characters'

const replaceEmojiWithUnicode = text => text.value.replace(regexEmoji(), name => {
  var matches = matchAll(name, regexEmoji())
  if (matches.length === 0) { return name }

  var match = matches.next()

  return emojis[match] && emojis[match].character
})

export default replaceEmojiWithUnicode
