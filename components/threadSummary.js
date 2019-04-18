import React, { PureComponent } from 'react'
import ReactMarkdown from 'react-markdown'

import AuthorThumbnail from './authorThumbnail'
import replaceEmojiWithUnicode from '../lib/replaceEmojiWithUnicode'
import blobLinkToUrl from '../lib/blobLinkToUrl'

class ThreadSummary extends PureComponent {
  render () {
    const { thread } = this.props
    return (
      <div className='grid-x'>
        <div className='cell small-2'>
          <AuthorThumbnail author={thread.root.author} />
        </div>
        <div className='cell small-10'>
          <ReactMarkdown source={thread.root.text} renderers={{ text: replaceEmojiWithUnicode }} transformImageUri={blobLinkToUrl} />
        </div>
        <div />
      </div>
    )
  }
}

export default ThreadSummary
