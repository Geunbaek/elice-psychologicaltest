import './App.css';
import { Route,  Switch } from "react-router-dom";
import Home from "./components/Home";
import TextPrevPage from "./components/TextPrevPage";

function App() {
  return (
    <>
      <Switch>
        <Route path='/TextPrevPage' component={TextPrevPage}/>
        <Route path='/' component={Home}/>
      </Switch>
    </> 
  );
}

export default App;
