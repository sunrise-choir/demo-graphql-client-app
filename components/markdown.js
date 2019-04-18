import React from 'react'
import ReactMarkdown from 'react-markdown'

import replaceEmojiWithUnicode from '../lib/replaceEmojiWithUnicode'
import blobLinkToUrl from '../lib/blobLinkToUrl'
import linkToHashLink from '../lib/linkToHashLink'

function Markdown ({ source }) {
  return (
    <ReactMarkdown source={source} renderers={{ text: replaceEmojiWithUnicode }} transformLinkUri={linkToHashLink} transformImageUri={blobLinkToUrl} />
  )
}

export default Markdown
