import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { ApolloLink, from } from 'apollo-link'

import Cookies from '@/utils/cookies'
import config from '@/config'

const graphqlUrl = process.env.NODE_ENV !== 'production' ? `${location.origin}/graphql` : '/graphql'

Vue.use(VueApollo)

const httpLink = new createHttpLink({
  uri: graphqlUrl,
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  let csrfToken = Cookies.getCookie('csrfToken') || ''
  return {
    headers: {
      ...headers,
      'x-csrf-token': process.env.NODE_ENV !== 'production' ? config.csrfToken : csrfToken,
      'x-csrf-token-portal': process.env.NODE_ENV !== 'production' ? config.csrfToken : csrfToken,
    },
  }
})

const loginRequiredMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    if (response && response.errors && response.errors[0] && response.errors[0].isAuth === false) {
      console.log('loginRequiredMiddleware:'+JSON.stringify(response));
      //location.href = '/signin'
      return
    }
    return response
  })
})

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
  link: from([loginRequiredMiddleware, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
  errorHandler(error) {
    console.log('Global apollo error handler')
    console.error(error)
  },
})

export default apolloProvider
