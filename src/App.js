
import {BrowserRouter as Router ,Route,Routes,Link}from 'react-router-dom'
import './App.css';
import Searched from './Components/Home/searched';
import Notfound from './Components/Home/Notfound';
import Home from './Components/Home/Home';
import Signin from './Components/SigninComponents/Signin';
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
</Routes>
</Router>
   </>
  );
}
export default App;
