import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authorized from './slices/authentication.slices';
import authentication from './slices/authorized.slices';
import {createEpicMiddleware} from 'redux-observable';
import {RootEpic} from './epic';

const epicMiddleware = createEpicMiddleware();
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });

export const store = configureStore({
  reducer: {
    authorized: authorized,
    authentication: authentication,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(epicMiddleware),
});

epicMiddleware.run(RootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
