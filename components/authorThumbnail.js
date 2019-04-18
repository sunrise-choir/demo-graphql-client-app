import React, { PureComponent } from 'react'
import blobLinkToUrl from '../lib/blobLinkToUrl'

class AuthorThumbnail extends PureComponent {
  render () {
    const { author } = this.props
    return (
      <div className='grid-x'>
        <div className='cell small-4'>
          <img src={blobLinkToUrl(author.imageLink)} />
        </div>
        <div className='cell'>
          {author.name}
        </div>
      </div>
    )
  }
}

export default AuthorThumbnail
