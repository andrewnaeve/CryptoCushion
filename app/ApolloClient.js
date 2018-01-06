import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { api } from './config.json';
const { development: { URL } } = api;
console.log(`${URL}/graphql`);
export const client = new ApolloClient({
	link: new HttpLink({ uri: `${URL}/graphql` }),
	cache: new InMemoryCache()
});
