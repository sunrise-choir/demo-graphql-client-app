function linkToUrl (prefix, link) {
  if (link == null) return null
  var url = `${prefix}/${link.link}`
  if (typeof link.query === 'object') {
    url += '?' + Object.keys(link.query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(link.query[key])}`)
      .join('&')
  }
  return url
}

export default linkToUrl
