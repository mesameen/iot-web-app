import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter";

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

// exporting the type of store
export type AppStore = typeof store;
// exporting the dispatches of store
export type AppDispatch = typeof store.dispatch;
// exporting root state
export type RootState = ReturnType<typeof store.getState>;