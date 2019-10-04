import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Calculator from './component/cal/calculator';

function App() {
  return (
    <div>
      <Router>
        <div>
        
          <div>
          
            <Switch>
              <Route exact path="/" component={Calculator} />
            
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
