import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ComposedApp from './src/ComposedApp';
import { client } from './ApolloClient';
// import './ReactotronConfig';
const App = () => (
	<ApolloProvider client={client}>
		<ComposedApp />
	</ApolloProvider>
);

export default App;
