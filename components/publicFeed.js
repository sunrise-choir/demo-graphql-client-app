import React, {Component} from 'react'
import {ApolloConsumer, Query} from "react-apollo"
import gql from "graphql-tag";
import InfiniteScroll from 'react-infinite-scroller'
import ReactMarkdown from 'react-markdown'
import ref from 'ssb-ref'
import regexEmoji from 'regex-emoji'
import matchAll from 'match-all'

import emojis from 'emoji-named-characters'


const emojiSupport = text => text.value.replace(regexEmoji(), name => {
  var matches = matchAll(name, regexEmoji())
  if(matches.length === 0)
    return name

  var match = matches.next()

  return emojis[match] && emojis[match].character
})

const transformImageUri = (uri) => {

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

const query = gql`
  query($next: Int, $after: String){
    threads(next: $next, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        root {
          id
          text
          author {
            id
          }
        }
      }
    }
  }
`

const authorQuery = gql`
  query($id: String!){
    author(id: $id) {
      name
    }
  }
`
function AuthorThumbnail({author}) {
  return (
    <Query query={authorQuery} variables={{id: author.id}} >
    {({loading, data}) => {
      if(loading) return <div>Loading...</div>

      const author = data.author
      return(
        <div>
          <div>
            {author.name}
          </div>
        </div>
      )
    }}
    </Query>
  )
}

function Thread({thread}) {
  return (
    <div className="grid-x">
      <div className="cell small-2">
        <AuthorThumbnail author={thread.root.author} />
      </div>
      <div className="cell small-10">
        <ReactMarkdown source={thread.root.text} renderers={{text: emojiSupport}} transformImageUri={transformImageUri}/>
      </div>
      <div>
      </div>
    </div>
  )
}

function Threads({threads}) {
  return threads.map((thread)=>{
    return(
      <div className="grid-x" key={thread.root.id}>
        <div className="cell medium-8 medium-offset-2 small-offset-1" >
          <Thread thread={thread} />
        </div>
      </div>
    )
  })
}

class PublicFeed extends Component{
  constructor(props){
    super(props)
    this.startCursor = props.cursor,
    this.endCursor = null
    this.state = {
      threads: []
    }
  }

  render(){
    return (
      <ApolloConsumer>
        { client => {
          return(
            <InfiniteScroll
            pageStart={0}
            loadMore={ (page)=>{
              const variables = {
                after: this.endCursor,
                next: 20
              }
              client.query({query, variables})
                .then(({data}) => {
                  const {threads:{nodes, pageInfo:{endCursor}}} = data

                  this.endCursor = endCursor
                  const threads = this.state.threads

                  nodes.forEach(node => threads.push(node))

                  this.setState({threads})
                })
            }}
            hasMore={true || false}
            useWindow={false}
            getScrollParent={this.props.getScrollParent}
            loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <Threads threads={this.state.threads}/>
            </InfiniteScroll>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default PublicFeed
