import './App.css';
import { Route,  Switch } from "react-router-dom";
import Home from "./components/homePage/Home";
import TestPrevPage from "./components/testPrevPage/TestPrevPage";
import TestPage from "./components/testPage/TestPage";
import { InformProvider } from "./components/InformProvider";
import ResultPage from './components/resultPage/ResultPage';
import ResultTablePage from "./components/resultTablePage/ResultTablePage"
import ErrorPage from './components/etcPage/ErrorPage';

function App() {
  return (
    <>
      <InformProvider>
        <Switch>
          <Route path='/errorPage' component={ErrorPage}/>
          <Route path='/resultTablePage' component={ResultTablePage}/>
          <Route path='/result' component={ResultPage}/>
          <Route path='/testPage/:id' component={TestPage}/>
          <Route path='/testPrevPage' component={TestPrevPage}/>
          <Route path='/' component={Home}/>
        </Switch>
      </InformProvider>
    </> 
  );
}

export default App;
