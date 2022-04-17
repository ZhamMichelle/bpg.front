import './App.css';
import { Button } from "@material-ui/core";
import React, { useState } from 'react';
import { createBrowserHistory } from "history";
import {BrowserRouter, Switch, Router, Route } from "react-router-dom";
import Page from './components/Page'
import {createStore} from 'redux';
import {rootReducer} from './store/Reducers'
import { Provider} from 'react-redux';


export const history = createBrowserHistory();
const store = createStore(rootReducer);
export const AppContext = React.createContext({
  showToastCreate: () => {},
  showToastDelete: () => {},
  showToastEdit: () => {},
  showToastError: (message: string) => console.error(message),
});
export const PATH_REFERENCE_BOOK = "/reference-book";

function App() {
    //return <Button variant="contained">Hello World</Button>;
    return (
        <Provider store={store} >
        <Router history={history}>
        <BrowserRouter>
        {/* <Switch> */}
          <Route  path="/" component={Page} />
        {/* </Switch> */}
        </BrowserRouter>
      </Router>
      </Provider>
      );
}

export default App;