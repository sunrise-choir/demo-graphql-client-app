import React, { PureComponent } from 'react'

import Markdown from './markdown'
import AuthorThumbnail from './authorThumbnail'

class ThreadSummary extends PureComponent {
  render () {
    const { thread } = this.props
    return (
      <div className='grid-x'>
        <div className='cell small-2'>
          <AuthorThumbnail author={thread.root.author} />
        </div>
        <div className='cell small-10'>
          <Markdown source={thread.root.text} />
        </div>
        <div />
      </div>
    )
  }
}

export default ThreadSummary
