import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import JourneyList from './components/JourneyList';
import AddJourney from './components/AddJourney';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql' 
});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>Test Root</h1>
        <JourneyList />
        <AddJourney /> 
        </div>        
      </ApolloProvider>
    );    
  }
}

export default Root;
