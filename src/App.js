import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';
import Data from './Components/Data';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Names from './Components/Names';

function App() {
  return (
    <div>   
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Form/>}/>
        <Route exact path='/data' element={<Names/>}/>
        <Route exact path='/data/:name' element={<Data/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Form/> */}
       </div>
  );
}

export default App;
