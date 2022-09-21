import { useState } from 'react'
// import { Dataxlsx } from './Dataxlsx'
import * as xlsx from 'xlsx'  
import Names from './Names'
import axios from 'axios'
import { Link } from 'react-router-dom'

function DataConvert() {
const [njson,setnjson] = useState()
const [Addname,setAddName] = useState()
const [location,setLocation] = useState()
let namesData = []
var arr = []


  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
        const sheetName0 = workbook.SheetNames[0];
        const worksheet0 = workbook.Sheets[sheetName0];
        const json0 = xlsx.utils.sheet_to_json(worksheet0);

        for (let index = 1; index < 15; index++) {
          const sheetName1 = workbook.SheetNames[index];
          const worksheet1 = workbook.Sheets[sheetName1];
          const json1 = xlsx.utils.sheet_to_json(worksheet1);
          Array.prototype.push.apply(json0, json1);
          
          
        }
      
        console.log(json0)
       
        
        setnjson(json0)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
    // console.log(arr)
  }
console.log("this is here")
 console.table(njson)
 localStorage.setItem('milkData',JSON.stringify(njson))


  const HandleName = async (e) => {
    e.preventDefault()
    axios.post("https://acc-backend-done.herokuapp.com/name", { name: Addname, location})
      .then((response) => {
        console.log(response);
        alert("added to database")
        // window.location.reload()
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error)

      });
  }
   
 return(
  <div className='dataCon'>
     <form className='file-form'>
       <label htmlFor="upload">Upload File</label>
       <input
         type="file"
         name="upload"
         id="upload"
         onChange={readUploadFile}
       />
     </form>
<div>
       <Link to='/data'><button className='names-btn'>TO NAMES</button></Link>
     </div>
      

     {/* <form id="contact" onSubmit={HandleName}>
       <fieldset>
       </fieldset>
       <fieldset>
       </fieldset>
       <fieldset>
       </fieldset>
     </form> */}
        <div className='add-name-form'>
         <input className='add-name' value={Addname} onChange={(e) => setAddName(e.target.value)} placeholder="ADD NEW Name" type="text" tabIndex="4" required />
       <input className='add-name' value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" type="text" tabIndex="4" required />
         <button onClick={HandleName}>Submit</button>
     </div>
  </div>
 )
  
}

export default DataConvert