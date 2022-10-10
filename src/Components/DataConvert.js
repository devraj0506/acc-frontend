import { useState, useEffect } from 'react'
// import { Dataxlsx } from './Dataxlsx'
import * as xlsx from 'xlsx'
import Names from './Names'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './dataconvert.css'

function DataConvert() {
  const [njson, setnjson] = useState()
  const [Addname, setAddName] = useState()
  const [locs, setLocs] = useState()
  const [location, setLocation] = useState()
  const [loc, setLoc] = useState()
  const [rate, setRate] = useState()
  let namesData = []
  var arr = []


  useEffect(() => {


    const fetch2 = async () => {

      try {

        const data = await axios.get('https://acc-backend-done.herokuapp.com/location/data');
        setLocs(data.data);


        console.table(data.data);
      } catch (err) {
        console.error(err);

      }


    };


    fetch2()

  }, [])


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




  const readRateFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array', cellDates: true, dateNF: 'yyyy/mm/dd;@' });
        const sheetName0 = workbook.SheetNames[0];
        const worksheet0 = workbook.Sheets[sheetName0];
        const json = xlsx.utils.sheet_to_json(worksheet0);



        // console.log(json)


        setRate(json)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
    // console.log(arr)
  }

  console.table(rate)


  console.log("this is here")
  console.table(njson)
  localStorage.setItem('milkData', JSON.stringify(njson))
  localStorage.setItem('rateData', JSON.stringify(rate))
  localStorage.setItem('total',JSON.stringify([0,0]))
  


  const HandleName = async (e) => {
    e.preventDefault()
    axios.post("https://acc-backend-done.herokuapp.com/name", { name: Addname, location })
      .then((response) => {
        console.log(response);
        alert("added to database")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error)

      });
  }

  const HandleLoc = async (e) => {
    e.preventDefault()
    axios.post("https://acc-backend-done.herokuapp.com/location", { location: loc })
      .then((response) => {
        console.log(response);
        alert("added to database")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error)

      });
  }

  return (
    <div className='dataCon'>
      <form className='file-form'>
        <label htmlFor="upload">Data File</label>
        <input
          type="file"
          name="Data file"
          placeholder='Data file'
          id="upload"
          onChange={readUploadFile}
        />

        <label htmlFor="upload">Rate File</label>
        <input
          
          type="file"
          name="Data file"
          placeholder='Data file'
          id="upload"
          onChange={readRateFile}
        />
      </form>
      <div className='section123'>
        <div className='right'>
          <div>
            <Link to='/data'><button className='names-btn custom-btn btn-1'>TO NAMES</button></Link>
          </div>



          {locs && (<div className='add-name-form'>

            <h1>Add Name</h1>
            <input className='add-name input-feild' value={Addname} onChange={(e) => setAddName(e.target.value)} placeholder="ADD NEW Name" type="text" tabIndex="4" required />
            <select className='fns' value={location} onChange={(e) => setLocation(e.target.value)} >
              <option value="">Select-Location</option>
              {locs.map((entry) => (
                <option value={entry.location}>{entry.location}</option>
              ))}
            </select>
            <button onClick={HandleName} className='btn8'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </div>)}
        </div>
        <div className='left'>
          <div className='add-name-form'>

            <h1>Add Location</h1>
            <input className='add-name input-feild' value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="ADD Location" type="text" tabIndex="4" required />

            <button onClick={HandleLoc} className='btn8'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </div>


        </div>
      </div>
    </div>
  )

}

export default DataConvert