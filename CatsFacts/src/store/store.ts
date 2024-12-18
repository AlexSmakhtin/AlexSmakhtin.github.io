import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {catReducer} from "./catFactsStore.ts";

const store = configureStore({
    reducer: {
        catsFacts: catReducer
    },
});
type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export { RootState, AppDispatch };