import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { api } from './config.json';

export const client = new ApolloClient({
	link: new HttpLink({ uri: api.development.URL }),
	cache: new InMemoryCache()
});
