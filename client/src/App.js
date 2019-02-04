import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomeView from './views/HomeView';
import client from './ApolloClient';
import store from './store';
import ApartmentView from "./views/ApartmentView";
import Layout from './views/Layout';

class App extends Component {
  // change div to switch in below function
  /**
   * Since i want to search filter to be appear on each page through the app
   */
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomeView} />
                <Route exact path="/:location" component={HomeView} />
                <Route exact path="/apartments/:apartmentId" component={ApartmentView} />
              </Switch>
            </Layout>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
