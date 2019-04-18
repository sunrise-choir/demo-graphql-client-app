import ref from 'ssb-ref'
import linkToUrl from './linkToUrl'

const blobLinkToUrl = (uri) => {
  if (ref.isBlob(uri)) {
    var prefix = `http://localhost:8989/blobs/get`
    var link = ref.parseLink(uri)
    link = linkToUrl(prefix, link)
    return link
  }
  return uri
}

export default blobLinkToUrl
