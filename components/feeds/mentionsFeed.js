import React from 'react'
import ScrollerHoc from '../scroller/scroller'
import query from '../../queries/post'
import Posts from '../posts/posts'

const variables = {
  mentionsAuthors: ['@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519']
}

function MentionsFeed ({ getScrollParent }) {
  const Scroller = ScrollerHoc(Posts, 'posts')
  return (
    <Scroller query={query} variables={variables} getScrollParent={getScrollParent} />
  )
}

export default MentionsFeed
