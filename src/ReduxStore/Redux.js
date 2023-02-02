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
const jobseekerloginslice=createSlice(
    {
        name:'jobseekerlogin',
        initialState:false,
reducers:{
    jobseekerlogin :(state,action)=>{
        return {...state, jobseekerlogin: action.payload};
    },
   
  
}
    }
)
const employeremailslice=createSlice(
    {
        name:'employeremail',
        initialState:'',
reducers:{
    employeremail :(state,action)=>{
        return {...state, employeremail: action.payload};
    },
   
  
}
    }
)
const jobseekeremailslice=createSlice(
    {
        name:'jobseekeremail',
        initialState:{},
reducers:{
    jobseekeremail :(state,action)=>{
        return {...state, jobseekeremail: action.payload};
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
    employerloginstatus:employerloginslice.reducer,
    employeremailstatus:employeremailslice.reducer,
    jobseekeremailstatus:jobseekeremailslice.reducer,
    jobseekerloginstatus:jobseekerloginslice.reducer
})
const persistedReducer=persistReducer(persistConfig,reducer);


export const {addby} =searchslice.actions;
export const {employerlogin}=employerloginslice.actions;
export const {employeremail}=employeremailslice.actions;
export const {jobseekeremail}=jobseekeremailslice.actions;
export const {jobseekerlogin}=jobseekerloginslice.actions;

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
