import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Sticky, StickyContainer } from 'react-sticky'
import gql from 'graphql-tag'

import { Menu, ResponsiveNavigation } from 'react-foundation'
import NavLinkListItem from './router/navLinkListItem'
import PublicFeed from './feeds/publicFeed'
import PrivateFeed from './feeds/privateFeed'
import MentionsFeed from './feeds/mentionsFeed'
import ParticipatingFeed from './feeds/participatingFeed'
import BySomeoneYouFollowFeed from './feeds/bySomeoneYouFollowFeed'
import RepliedToBySomeoneYouFollowFeed from './feeds/repliedToBySomeoneYouFollowFeed'
import MentionsNotification from './notifications/mentionsNotification'
import { CursorContext } from './cursor/cursorProvider'
import { WhoAmIContext } from './authors/whoAmIProvider'
import store from 'store2'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

function Profile () {
  return <h2>Profile</h2>
}

function Post ({ match: { params: { id } } }) {
  // !!NOTE!! id has the % sigil removed to make it possible to uri encode the message id. It gets added back on here.
  const messageId = `%${decodeURIComponent(id)}`
  return <h2>Post for {messageId}</h2>
}
function Author ({ match: { params: { id } } }) {
  const authorId = decodeURIComponent(id)
  return <h2>Author {authorId}</h2>
}

const getCursorQuery = gql`
  {
    dbCursor
  }
`

const getWhoAmIQuery = gql`
  {
    whoAmI{
      id
    }
  }
`

const storedCursor = store.get('dbCursor')
const storedWhoAmI = store.get('whoAmI')

function App () {
  const [ cursor, setCursor ] = useState(storedCursor)
  const [ whoAmI, setWhoAmI ] = useState(storedWhoAmI)

  useEffect(() => {
    console.log('use effect')

    // If we don't have a stored cursor in local storage, we need to query the db to get the latest.
    if (!storedCursor) {
      client.query({ query: getCursorQuery })
        .then(result => {
          const cursor = result.data.dbCursor
          store.set('dbCursor', cursor)
          setCursor(cursor)
        })
    }
    // Might as well always check who am i.
    client.query({ query: getWhoAmIQuery })
      .then(result => {
        const whoAmI = result.data.whoAmI.id
        store.set('whoAmI', whoAmI)
        setWhoAmI(whoAmI)
      })
  }, [true]) // Passing [true] means this effect will only run once.

  return (
    <WhoAmIContext.Provider value={{ whoAmI: whoAmI, updateWhoAmI: (whoAmI) => setWhoAmI(whoAmI) }} >
      <CursorContext.Provider value={{ cursor: cursor, updateCursor: (cursor) => setCursor(cursor) }} >
        <StickyContainer>
          <ApolloProvider client={client}>
            <Router>
              <Sticky>{({ style }) => {
                return (
                  <ResponsiveNavigation style={style} >
                    <Menu isExpanded isVertical horizontalOnMedium>
                      <NavLinkListItem to='/private'>Private</NavLinkListItem>
                      <NavLinkListItem to='/mentions'>Mentions {<MentionsNotification />}</NavLinkListItem>
                      <NavLinkListItem to='/profile'>Profile</NavLinkListItem>
                      <NavLinkListItem to='/bySomeoneYouFollow'>By Someone You Follow</NavLinkListItem>
                      <NavLinkListItem to='/repliedToBySomeoneYouFollow'>Replied To By Someone You Follow</NavLinkListItem>
                      <NavLinkListItem to='/participating'>Participating</NavLinkListItem>
                      <NavLinkListItem to='/public'>All</NavLinkListItem>
                    </Menu>
                    <ul className='menu'>
                      <li><input type='search' size={50} placeholder='Search: eg Sunrise Choir AND Mikey NOT singing' /></li>
                      <li><button type='button' className='button'>Search</button></li>
                    </ul>
                  </ResponsiveNavigation>
                )
              }}
              </Sticky>
              <div className='cell auto cell-block-container' >
                <div className='grid-x' >
                  <div id='content-view' className='cell auto'>
                    <Switch>
                      <Route path='/public' exact component={() => <PublicFeed />} />
                      <Route path='/private/' component={() => <PrivateFeed />} />
                      <Route path='/participating/' component={() => <ParticipatingFeed />} />
                      <Route path='/bySomeoneYouFollow/' component={() => <BySomeoneYouFollowFeed />} />
                      <Route path='/repliedToBySomeoneYouFollow/' component={() => <RepliedToBySomeoneYouFollowFeed />} />
                      <Route path='/profile' component={Profile} />
                      <Route path='/mentions/' component={() => <MentionsFeed />} />
                      <Route path='/post/:id' component={Post} />
                      <Route path='/author/:id' component={Author} />
                      <Redirect from='/' to='/bySomeoneYouFollow' />
                    </Switch>
                  </div>
                </div>
              </div>
            </Router>
          </ApolloProvider>
        </StickyContainer>
      </CursorContext.Provider>
    </WhoAmIContext.Provider>
  )
}

export default App
