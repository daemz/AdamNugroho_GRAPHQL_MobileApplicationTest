/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider } from '@apollo/react-hooks';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";

import RootNavigation from './src/Navigation/RootNavigation';

function App() {
  // const client = new ApolloClient({
  //   link: "https://apollo-fullstack-tutorial.herokuapp.com/",
  //   cache: new InMemoryCache()
  // })
  const client = new GraphQLClient({
    url: "https://apollo-fullstack-tutorial.herokuapp.com/"
  })
  
  return (
    // <ApolloProvider client={client}>
    //   <RootNavigation/>
    // </ApolloProvider>
    <ClientContext.Provider value={client}>
      <RootNavigation/>
    </ClientContext.Provider>
  );
};

export default App;
