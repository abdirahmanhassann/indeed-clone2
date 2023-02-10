import { combineReducers } from "@reduxjs/toolkit";
import { employerlogin } from "../ReduxStore/Redux";
 import { employeremail } from "../ReduxStore/Redux";
import { jobseekeremail} from '../ReduxStore/Redux'
import { jobseekerlogin } from "../ReduxStore/Redux";
import { clickedjob } from "../ReduxStore/Redux";
import { reducerss } from "../ReduxStore/Redux";
export const rootReducer= combineReducers({
    employerloginstatus:reducerss.employerlogin.reducer,
    employeremailstatus:reducerss.employeremail.reducer,
    jobseekeremailstatus:reducerss.jobseekeremail.reducer,
    jobseekerloginstatus:reducerss.jobseekerlogin.reducer,
    clickedjobstatus:reducerss.clickedjob.reducer    

})
