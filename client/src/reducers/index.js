import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import dealerReducer from './dealerReducer';
import partsReducer from './partsReducer';
import compareReducer from './compareReducer';
import cartReducer from './cartReducer';
import sortedCartReducer from './sortedCartReducer';
import customerReducer from './customerReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  dealer: dealerReducer,
  parts: partsReducer,
  compare: compareReducer,
  cart: cartReducer,
  sortedCart: sortedCartReducer,
  customer: customerReducer,
  chat: chatReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
