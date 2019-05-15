import React, { PureComponent } from 'react'
import blobLinkToUrl from '../../lib/blobLinkToUrl'
import ColorHash from 'color-hash'

const colorHash = new ColorHash()
const fallbackImageUrl = 'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

class AuthorThumbnail extends PureComponent {
  render () {
    const { author, isNameDisabled } = this.props
    return (
      <div className='cell auto grid-x grid-margin-x'>
        <div className='cell small-4 medium-2 large-1 '>
          {author.imageLink
            ? <img className='thumbnail' src={blobLinkToUrl(author.imageLink)} style={{ minHeight: '4rem', minWidth: '4rem', maxWidth: '4rem' }} />
            : <img className='thumbnail' src={fallbackImageUrl} style={{ 'backgroundColor': colorHash.hex(author.id), minHeight: '4rem', minWidth: '4rem', maxWidth: '4rem' }} />
          }
        </div>
        {!isNameDisabled && <div className='cell auto author-thumbnail-name'>
          {author.name}
        </div>}
      </div>
    )
  }
}

export default AuthorThumbnail
