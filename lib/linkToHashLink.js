import ref from 'ssb-ref'

function linkToHashLink (uri) {
  if (ref.isMsgId(uri)) {
    // Gah! The percent sigil is not url friendly. Chop it off, we'll put it back on later I guess. Gross
    return `#/post/${encodeURIComponent(uri.slice(1))}`
  }
  if (ref.isFeedId(uri)) {
    return `#/author/${encodeURIComponent(uri)}`
  }

  return uri
}

export default linkToHashLink
