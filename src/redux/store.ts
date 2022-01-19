import { getConfig } from '../config';
import { configureStore } from './configureStore';

export const store = configureStore(getConfig().store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
