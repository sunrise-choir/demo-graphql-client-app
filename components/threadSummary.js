import React, { PureComponent } from 'react'
import { uniqBy } from 'ramda'

import Markdown from './markdown'
import AuthorThumbnail from './authorThumbnail'

class ThreadSummary extends PureComponent {
  render () {
    const { thread, thread: { replies } } = this.props
    const uniqueReplies = uniqBy((reply) => reply.author.id)(replies)
    console.log(uniqueReplies)
    return (
      <div className='grid-x'>
        <div className='cell small-2'>
          <AuthorThumbnail author={thread.root.author} />
        </div>
        <div className='cell small-10'>
          <Markdown source={thread.root.text} />
        </div >
        {thread.replies.length > 0 && <div className='grid-x small-8 small-offset-2'>
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
