import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice"; // Import the productReducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer); 
const persistedProductReducer = persistReducer(persistConfig, productReducer); 

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: persistedUserReducer,
    product: persistedProductReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
