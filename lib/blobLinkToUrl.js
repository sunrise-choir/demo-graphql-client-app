import ref from 'ssb-ref'

const blobLinkToUrl = (uri) => {

  if (ref.isBlob(uri)) {
    var prefix = `http://localhost:8989/blobs/get`
    var link = ref.parseLink(uri)
    link =  linkToUrl(prefix, link)
    return link
  }
  return uri;
}

function linkToUrl (prefix, link) {
  if (link == null || !ref.isBlob(link.link)) return null
  var url = `${prefix}/${link.link}`
  if (typeof link.query === 'object') {
    url += '?' + Object.keys(link.query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(link.query[key])}`)
      .join('&')
  }
  return url
}

export default blobLinkToUrl
