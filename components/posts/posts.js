import React from 'react'
import Markdown from '../markdown/markdown'
import AuthorThumbnail from '../authors/authorThumbnail'

function Posts ({ items }) {
  return items.map((post) => {
    return (
      <div className='grid-x' key={post.id}>
        <div className='cell medium-8 medium-offset-2 small-offset-1' >
          <div className='grid-x'>
            <div className='cell small-2'>
              <AuthorThumbnail author={post.author} />
            </div>
            <div className='cell small-10'>
              <Markdown source={post.text} />
            </div >
          </div>
        </div>
      </div>
    )
  })
}

export default Posts
