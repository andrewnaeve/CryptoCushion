import React from 'react';
import ComposedApp from './src/ComposedApp';
import { store } from './src/redux/configureStore';
import { Provider } from 'react-redux';

const App = () => (
	<Provider store={store}>
		<ComposedApp />
	</Provider>
);

export default App;
