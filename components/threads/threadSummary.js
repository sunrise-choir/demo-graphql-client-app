import React, { PureComponent } from 'react'
import { uniqBy } from 'ramda'

import Markdown from '../markdown/markdown'
import AuthorThumbnail from '../authors/authorThumbnail'

class ThreadSummary extends PureComponent {
  render () {
    const { thread, thread: { replies } } = this.props
    const uniqueReplies = uniqBy((reply) => reply.author.id)(replies)
    return (
      <div className='grid-x card'>
        <div className='cell card-section author-card-section'>
          <AuthorThumbnail author={thread.root.author} />
        </div>
        <div className='cell card-section '>
          <Markdown source={thread.root.text} />
        </div >
        {thread.replies.length > 0 && <div className='grid-x card-divider'>
          <div className='cell small-2'>
            {uniqueReplies.map((reply) => <AuthorThumbnail key={reply.author.id} author={reply.author} />)}
          </div>
          All the replies, length: {thread.replies.length}
        </div>}
      </div>
    )
  }
}

export default ThreadSummary
