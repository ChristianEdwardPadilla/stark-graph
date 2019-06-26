import { combineReducers } from 'redux';

// reducers
import activeReducer from './active-reducer';

// combine reducers
const reducers = combineReducers({
  activeState: activeReducer,
});

export default reducers;

/*
https://gist.github.com/gaearon/ffd88b0e4f00b22c3159
simplified version of combineReducers source:

// build the object containing references to all reducer function (finalReducers, see pick())
// then return a function that, when called, acts like a reducer function itself
export function combineReducers(reducers) {
  var finalReducers = pick(reducers, (val) => typeof val === 'function');
  return (state = {}, action) => mapValues(finalReducers,
    (reducer, key) => reducer(state[key], action)
  );
}

// assemble references to each of the reducer functions into one big object
function pick(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

// 
function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

export function createStore(reducer, initialState) {
  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(listener => listener());
    return action;
  }

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/INIT' });
  }

  dispatch({ type: '@@redux/INIT' });

  return { dispatch, subscribe, getState, replaceReducer };
}

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

export function bindActionCreators(actionCreators, dispatch) {
  return typeof actionCreators === 'function' ?
    bindActionCreator(actionCreators, dispatch) :
    mapValues(actionCreators, actionCreator =>
      bindActionCreator(actionCreator, dispatch)
    );
}
*/
