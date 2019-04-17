import React from 'react'
import {HashRouter as Router, Route, Redirect, NavLink, Switch} from 'react-router-dom'
import ApolloClient from "apollo-boost"
import {ApolloProvider, Query} from "react-apollo"
import gql from "graphql-tag";

import NavLinkListItem from './navLinkListItem'

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

function Public() {
  return <h2>Public</h2>;
}

function Profile() {
  return <h2>Profile</h2>;
}

function Mentions() {
  return <h2>Mentions</h2>;
}

function Private() {
  return <h2>Private</h2>;
}

function Participating() {
  return <h2>Participating</h2>;
}


function App(props) {
  return(
  <ApolloProvider client={client}>
    <Router>
      <div className="grid-y large-grid-frame">
        <div className="cell large-auto large-cell-block-container">
          <div className="grid-x">
            <div id="sidebar" className="cell large-2 large-cell-block-y">
            <nav>
              <ul className="vertical menu">
                <li className="menu-text">Feeds</li>
                <NavLinkListItem to="/public">Public</NavLinkListItem>
                <NavLinkListItem to="/participating">Participating</NavLinkListItem>
                <NavLinkListItem to="/private">Private</NavLinkListItem>
              </ul>
            </nav>
            </div>
            <div className="cell large-10 large-cell-block-y">
              <div className="grid=x">
                <div id="topbar" className="top-bar">
                  <div className="top-bar-left">
                    <ul className="menu">
                      <NavLinkListItem to="/mentions">Mentions</NavLinkListItem>
                      <NavLinkListItem to="/profile">Profile</NavLinkListItem>
                    </ul>
                  </div>
                  <div className="top-bar-right">
                    <ul className="menu">
                      <li><input type="search" placeholder="Search: eg Sunrise Choir AND Mikey NOT singing"/></li>
                      <li><button type="button" className="button">Search</button></li>
                    </ul>
                  </div>
                </div>
                <div id="content-view" className="large-12">
                  <Switch>
                    <Route path="/public" exact component={Public} />
                    <Route path="/private/" component={Private} />
                    <Route path="/participating/" component={Participating} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/mentions" component={Mentions} />
                    <Redirect from="/" to="/public"/>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  </ApolloProvider>
  )
}

export default App
