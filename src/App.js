
import {BrowserRouter as Router ,Route,Routes,Link}from 'react-router-dom'
import './App.css';
import Searched from './Components/Home/searched';
import Notfound from './Components/Home/Notfound';
import Home from './Components/Home/Home';
import Signin from './Components/SigninComponents/Signin';
import Signup from './Components/SigninComponents/Signup';
import EmployerSignupform from './Components/SigninComponents/Employer/EmployerSignupform';
import EmployerHome from './Components/SigninComponents/Employer/EmployerHome';
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
</Routes>
</Router>
   </>
  );
}
export default App;
