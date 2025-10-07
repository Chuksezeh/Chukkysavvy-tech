import { configureStore } from "@reduxjs/toolkit";
import cartReducerProduct from "./productCounter";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
       key:"root",
       version: 1,
       storage
};

const reducer = combineReducers({
       cartProduct: cartReducerProduct
})
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
       reducer: persistedReducer,
});
export default store;