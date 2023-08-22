// import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
// import rootReducer from "./reducers/index.js";
// //import { createStore, compose, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./sagas/index.js";

import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

// const sagaMiddleware = createSagaMiddleware();

// const store = compose(
//   applyMiddleware(sagaMiddleware),
//   window.devToolsExtension && window.devToolsExtension()
// )(configureStore)(rootReducer);

// sagaMiddleware.run(rootSaga);

// export default store;

export default function configureStoreFun(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(reduxImmutableStateInvariant()),
  });
}
