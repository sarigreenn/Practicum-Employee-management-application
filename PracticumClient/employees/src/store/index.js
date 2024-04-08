import React from "react";
import reducer from './reducer';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

