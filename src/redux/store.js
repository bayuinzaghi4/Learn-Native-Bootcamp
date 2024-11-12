import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});

export const persistor = persistStore(store);