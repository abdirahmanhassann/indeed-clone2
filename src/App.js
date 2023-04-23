
import {BrowserRouter as Router ,Route,Routes,Link}from 'react-router-dom'
import './App.css';
import Searched from './Components/Home/searched';
import Notfound from './Components/Home/Notfound';
import Home from './Components/Home/Home';
import Signin from './Components/SigninComponents/Signin';
import Signup from './Components/SigninComponents/Signup';
import EmployerSignupform from './Components/SigninComponents/Employer/EmployerSignupform';
import EmployerHome from './Components/SigninComponents/Employer/EmployerHome';
import Postjob from './Components/SigninComponents/Employer/EmployerPostjob';
import EmployerDashboard from './Components/SigninComponents/Employer/Employerdashboard';
import JobseekerSignup from './Components/SigninComponents/Jobseeker/JobseekerSignup';
import EmployerJobInsights from './Components/SigninComponents/Employer/EmployerJobInsights';
import JobseekerApplications from './Components/SigninComponents/Jobseeker/JobseekerApplications';
import { useSelector } from 'react-redux';
import EmployerEdit from './Components/SigninComponents/Employer/EmployerEdit';
import JobseekerNotifications from './Components/SigninComponents/Jobseeker/jobseekerNotifications';
import JobseekerViewJob from './Components/SigninComponents/Jobseeker/JobseekerViewJob';
import EmployerMessages from './Components/SigninComponents/Employer/employermessages';
import Jobseekermessages from './Components/SigninComponents/Jobseeker/jobseekermessages';
import Employernotifications from './Components/SigninComponents/Employer/employernotifications';
import JobseekerUpdate from './Components/SigninComponents/Jobseeker/JobseekerUpdate';
function App() 
{
  const employerlogin=useSelector(state=>state.reducer.employerloginstatus.employerlogin);
  const jobseekerlogin=useSelector(state=>state.reducer.jobseekerloginstatus.jobseekerlogin);
 return (
   <>
<Router>
   <Routes>
   <Route  path='/' element={<Home />}exact/>
 <Route  path= '/searched' element={<Searched /> }exact/>
 <Route  path= '/jobseekernotifications' element={jobseekerlogin? <JobseekerNotifications />:<Signin/> }exact/>
 <Route  path= '/jobseekerupdate' element={jobseekerlogin? <JobseekerUpdate />:<Signin/> }exact/>
 <Route  path= '/jobseekerViewJob' element={jobseekerlogin? <JobseekerViewJob />:<Signin/> }exact/>
 <Route  path= '/jobseekermessages' element={jobseekerlogin? <Jobseekermessages />:<Signin/> }exact/>
<Route path='*' element={<Notfound/>}/>
<Route path='Signin' element={<Signin/>}/>
<Route path='Signup' element={<Signup/>}/>
<Route path='Signup/Employer' element={<EmployerSignupform/>}/>
<Route path='/EmployerHome' element={<EmployerHome/>}/>
<Route path='/EmployerHome/Postjob' element={employerlogin ? <Postjob/> : <Signin/>}/>
<Route path='/EmployerHome/employernotifications' element={employerlogin ? <Employernotifications/> : <Signin/>}/>
<Route path='/EmployerHome/employermessages' element={employerlogin ? <EmployerMessages/> : <Signin/>}/>
<Route path='/EmployerHome/EmployerDashboard' element={employerlogin ? <EmployerDashboard/>: <Signin/>}/>
<Route path='/EmployerHome/EmployerDashboard/:name' element={employerlogin ? <EmployerJobInsights/> :<Signin/>}/>
<Route path='/EmployerHome/EmployerDashboard/editjob' element={employerlogin ? <EmployerEdit/> :<Signin/>}/>
<Route path='/Signup/Jobseeker' element={<JobseekerSignup/>}/>
<Route path='/Applications' element={jobseekerlogin ? <JobseekerApplications/>: <Signin/>}/>
</Routes>
</Router>
   </>
  );
}
export default App;
