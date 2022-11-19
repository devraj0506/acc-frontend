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
import AllBill from './Components/AllBill';
import AllSheet from './Components/AllSheet';
import Spinner from './Components/Spinner';
// import { AuthProvider } from './Components/Context';
function App() {

  const [nameData, setNameData] = useState()

 
  return (
    <div>   
    {/* <DataConvert/> */}
    {/* <AuthProvider> */}
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<>
          <Spreadsheet/>
          <DataConvert/>
        
        </>}/>
        <Route exact path='/data' element={<Names/>}/>
        <Route  path='/data/:id' element={<TotaComp/>}/>
        <Route  path='/bill/:loc' element={<AllBill/>}/>
        <Route  path='/sheet/:loc' element={<AllSheet/>}/>
      </Routes>
      </BrowserRouter>
      {/* </AuthProvider> */}
      {/* <Form/> */}
      {/* <Spreadsheet/>
      <DataConvert/>
     <Names/> */}

    {/* <Spinner/> */}

       </div>
  );
}

export default App;
