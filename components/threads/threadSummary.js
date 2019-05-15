import React, { PureComponent } from 'react'
import { uniqBy } from 'ramda'

import Markdown from '../markdown/markdown'
import AuthorThumbnail from '../authors/authorThumbnail'

class ThreadSummary extends PureComponent {
  render () {
    const { thread, thread: { replies, root: { likesCount } } } = this.props
    const uniqueReplies = uniqBy((reply) => reply.author.id)(replies)
    return (
      <div className='thread-summary grid-x card'>
        <div className='thread-head grid-x align-justify cell card-section author-card-section'>
          <AuthorThumbnail author={thread.root.author} />
          {likesCount > 0 && <div className='likes-count cell small-1'>{likesCount} Like{likesCount > 1 && 's'}</div> }
        </div>
        <div className='cell card-section '>
          <Markdown source={thread.root.text} />
        </div >
        {thread.replies.length > 0 && <div className='grid-x card-divider'>
          <div className='cell grid-x'>
            {uniqueReplies.map((reply) => <AuthorThumbnail key={reply.author.id} author={reply.author} isNameDisabled />)}
          </div>
          {thread.replies.length} replies
        </div>}
      </div>
    )
  }
}

export default ThreadSummary
