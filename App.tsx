import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/Navigator/AppNavigator';
import store from './src/Redux/Store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};

export default App;

