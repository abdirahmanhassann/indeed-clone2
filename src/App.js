
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
function App() 
{
 return (
   <>
<Router>
   <Routes>
   <Route  path='/' element={<Home />}exact/>
 <Route  path= '/searched' element={<Searched /> }exact/>
<Route path='*' element={<Notfound/>}/>
<Route path='Signin' element={<Signin/>}/>
<Route path='Signup' element={<Signup/>}/>
<Route path='Signup/Employer' element={<EmployerSignupform/>}/>
<Route path='/EmployerHome' element={<EmployerHome/>}/>
<Route path='/EmployerHome/Postjob' element={<Postjob/>}/>
<Route path='/EmployerHome/EmployerDashboard' element={<EmployerDashboard/>}/>
<Route path='/EmployerHome/EmployerDashboard/:name' element={<EmployerJobInsights/>}/>
<Route path='/Signup/Jobseeker' element={<JobseekerSignup/>}/>
<Route path='/Applications' element={<JobseekerApplications/>}/>
</Routes>
</Router>
   </>
  );
}
export default App;
