import React from "react";
import { Link } from "react-router-dom";
import Searched from "./searched";
const Button=()=>{
return(
<>
<a><Link to='/searched'> Search</Link></a>
</>
);
}
export default Button;
