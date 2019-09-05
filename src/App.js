import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import HomepageComp from "./components/homepage.component";

function App() {
  return (
    <Provider store={store}>
      <HomepageComp />
    </Provider>
  );
}

export default App;