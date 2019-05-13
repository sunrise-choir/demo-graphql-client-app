import React from 'react'
import classNames from 'classnames'
import ThreadSummary from './threadSummary'

function Threads ({ items }) {
  return items.map((thread) => {
    return (
      <div className={classNames(['grid-x'])} key={thread.root.id}>
        <div className='cell large-8 large-offset-2 medium-10 medium-offset-1 small-12 small-offset-0' >
          <ThreadSummary thread={thread} />
        </div>
      </div>
    )
  })
}

export default Threads
