import logo from './logo.svg';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './App.css';
// import Form from './Components/Form';
import Data from './Components/Data';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Names from './Components/Names';

import DataConvert from './Components/DataConvert';
import Spreadsheet from './Components/Spreadsheet';
import TotaComp from './Components/TotaComp';

function App() {

  const [nameData, setNameData] = useState()

 
  return (
    <div>   
    {/* <DataConvert/> */}
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<>
          <Spreadsheet/>
          <DataConvert/>
        
        </>}/>
        <Route exact path='/data' element={<Names/>}/>
        <Route exact path='/data/:id' element={<TotaComp/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Form/> */}
      {/* <Spreadsheet/>
      <DataConvert/>
     <Names/> */}

      

       </div>
  );
}

export default App;
