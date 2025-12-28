import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

// exporting the type of store
export type AppStore = typeof store;
// exporting the dispatches of store
export type AppDispatch = typeof store.dispatch;
// exporting root state
export type RootState = ReturnType<typeof store.getState>;