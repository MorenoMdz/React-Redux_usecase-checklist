import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Componente from './Componente';

const App = () => (
  <Provider store={store}>
    <Componente />
  </Provider>
);

export default App;
