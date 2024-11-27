import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "v1",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;
