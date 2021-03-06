import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import JourneyList from './components/Journey/JourneyList';
import AddJourney from './components/Journey/AddJourney';
import './styles/_index.scss';

const client = new ApolloClient({
  uri: 'https://journey-app-342.herokuapp.com/graphql'
});

class Root extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <section>
          <JourneyList />
          <AddJourney />
        </section>
      </ApolloProvider>
    );
  }
}

export default Root;
