import React from 'react';
import { Provider } from 'react-redux';
import store from './utils/store';
import NavigationStack from './navigation/NavigationContainer';

function App(): React.JSX.Element {
  return (
  <Provider store={store}>
    <NavigationStack />
  </Provider>
  );
}

export default App;
