import React from 'react'
import ThreadSummary from './threadSummary'

function Threads ({ threads }) {
  return threads.map((thread) => {
    return (
      <div className='grid-x' key={thread.root.id}>
        <div className='cell medium-8 medium-offset-2 small-offset-1' >
          <ThreadSummary thread={thread} />
        </div>
      </div>
    )
  })
}

export default Threads
