import React from 'react';
import ComposedApp from './src/ComposedApp';
import ApolloProvider from 'react-apollo';
import { client } from './ApolloClient';
// import './ReactotronConfig';

const App = () => (
	<ApolloProvider client={client}>
		<ComposedApp />
	</ApolloProvider>
);

export default App;
