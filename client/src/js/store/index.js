import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; //make store available to all components
import { createStore } from 'redux';
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);