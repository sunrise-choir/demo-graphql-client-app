import React from 'react'
import ApolloClient from "apollo-boost"
import {ApolloProvider, Query} from "react-apollo"
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

function App(props) {
  return(
  <ApolloProvider client={client}>
    <div className="grid-y large-grid-frame">
      <div className="cell large-auto large-cell-block-container">
        <div className="grid-x">
          <div id="sidebar" className="cell large-2 large-cell-block-y">
          </div>
          <div className="cell large-10 large-cell-block-y">
            <div className="grid=x">
              <div id="topbar" className="large-12">Topbar.....</div>
              <div id="content-view" className="large-12">
                <h2>My first Apollo app 🚀</h2>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ApolloProvider>
  )
}

export default App
