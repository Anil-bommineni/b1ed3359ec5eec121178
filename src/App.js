import React from "react" ;
// import "bootstrap/dist/css/bootstrap/MSInputMethodContext.css ";
import TableData from "./Components/TableData" ;
import JsonData from "./Components/JsonData" ;
import logo from './logo.svg';
import "./style.css" ;
import {BrowserRouter as Router ,Route ,Switch } from "react-router-dom" ;


function App() {
  return (
    <div className=" container-fluid">
      
      <Router>
        <Switch>
        <Route exact path ="/" component ={TableData}/>
        <Route path ="/jsonData" component ={JsonData}/>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
