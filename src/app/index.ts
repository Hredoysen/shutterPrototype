import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';


const middlewares: never[] = [];

const persistConfig = {
  key: 'TestPersist',
  keyPrefix: '',
  storage,
  whitelist: ['cashApi', 'auth', 'theme', 'base'],
};

// eslint-disable-next-line
const store: any = configureStore({
  reducer: persistReducer(persistConfig, rootReducer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

store.asyncReducers = {};
export const persistor = persistStore(store);

export const injectReducer = (key: string, reducer: never) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    persistReducer(persistConfig, rootReducer(store.asyncReducers))
  );
  persistor.persist();
  return store;
};

export default store;
