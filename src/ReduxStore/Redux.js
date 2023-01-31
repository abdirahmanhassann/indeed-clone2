import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";


const searchslice=createSlice(
    {
        name:'search',
        initialState:'',
reducers:{
    addby :(state,action)=>{
        return {...state, search: action.payload};
    },
   
  
}
    }
)
const employerloginslice=createSlice(
    {
        name:'employerlogin',
        initialState:false,
reducers:{
    employerlogin :(state,action)=>{
        return {...state, employerlogin: action.payload};
    },
   
  
}
    }
)
const persistConfig={
    key:"root",
    version:1,
    storage,
};
const reducer= combineReducers({
    search: searchslice.reducer,
    employerloginstatus:employerloginslice.reducer
})
const persistedReducer=persistReducer(persistConfig,reducer);


export const {addby} =searchslice.actions;

export const {employerlogin}=employerloginslice.actions;
const store=configureStore({
    reducer:{ 
               reducer:persistedReducer,
      }
      ,  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

}) 


export  let persistor= persistStore(store)



export default store;
