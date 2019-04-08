import {h} from 'preact'
import ApolloClient from "apollo-boost"
import {ApolloProvider, Query} from "react-apollo"
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

const query = gql`
  {
    feed {
      threadsConnection(next: 4) {
        pageInfo {
          endCursor
          hasNextPage
        }
        threads {
          root {
            id
            author {
              name
            }
          }
        }
      }
    }
  }
`

function Thread(props) {

  const {author, id} = props.root

  return h('li', {key: id}, [`Author: ${author.name}, id: ${id}`])

}

//TODO: this needs to be a stateful component.
function Feed(props) {
  return h(Query, {query}, [
    ({loading, error, data}) => {
      console.log(data);
      const { pageInfo, threads } = !loading && data.feed.threadsConnection
      return h('div', {}, [
        `isLoading: ${loading}`,
        !loading && h('ul', {}, threads.map(Thread))
      ])
    }
  ])
}


function App(props) {
  return h(ApolloProvider, {client}, [
    h('h1', {}, [
      `Welcome 2 ${props.name}`,
      h(Feed)
    ])
  ])
}

export default App
