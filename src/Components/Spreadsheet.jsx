import React,{useState,useEffect} from 'react'
import { SpreadsheetComponent, RowDirective, getFormatFromType,RowsDirective,SheetDirective,CellsDirective,CellDirective,ColumnsDirective,ColumnDirective,SheetsDirective } from '@syncfusion/ej2-react-spreadsheet';
import axios from 'axios';
import { AlternateEmailSharp } from '@mui/icons-material';
import Ganeshji from './images/ganeshji.jpeg'
import swastic from './images/swastic.png'
import om from './images/om.png'


function Spreadsheet() {
  const [name,setName] = useState()
  const [filterTerm, setFilterTerm] = useState("")
  const [date, setDate] = useState("")
  const[locs,setLocs] = useState()
  const dateFormat:string = getFormatFromType("Short Date");
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  var loc=[]

  useEffect(()=>{
    const fetch= async ()=>{
      try{
      const data = await axios.get("https://acc-backend-done.herokuapp.com/")
      setName(data.data)
      console.log(data)
      }
      catch (err) {
        console.error(err);

      }
    }

    const fetch2 = async () => {

      try {

        const data = await axios.get('https://acc-backend-done.herokuapp.com/location/data');
        setLocs(data.data);


        console.table(data.data);
      } catch (err) {
        console.error(err);

      }


    };

    fetch()
    fetch2()

  },[])

  
  if(name){
    name.map((entry)=>{
      var check = loc.find(element=>element===`${entry.location}`)
      if(!check){
        loc.push(entry.location)
      }
    })
  }

  console.log(loc)

  return (
    <div>

    <div className="gods">
          <img className='god-img' src={om} alt="" />
          <img className='god-img' src={Ganeshji} alt="" />
          <img className='god-img' src={swastic} alt="" />
          
    </div>


      
      {name && (<>
        <select className='fns' onChange={(e) => setFilterTerm(e.target.value)}>
          <option value="">Filter-by-route</option>
          {locs.map((entry) => (
            <option value={entry.location}>{entry.location}</option>
          ))}
          </select>

              {/* <input type="text" className='fns' placeholder='date' value={date} onChange={(e)=>setDate(e.target.value)}/> */}


      <SpreadsheetComponent allowOpen={true} openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open' allowSave={true} saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'>
        <SheetsDirective>
     
      {days.map((day)=>(

          <SheetDirective name={`day${day}`}>
     

            {/* <RowsDirective>
              <RowDirective>
                <CellsDirective>
                  <CellDirective value="Name"></CellDirective>
                 
                </CellsDirective>

                <CellsDirective>
                  <CellDirective value="date">

                  </CellDirective>
                </CellsDirective>
                
              </RowDirective>
              
            </RowsDirective> */}


            <RowsDirective>
              <RowDirective>
                <CellsDirective>
                  <CellDirective value='Name' ></CellDirective>
                  <CellDirective value='location' ></CellDirective>
                  <CellDirective value='date' ></CellDirective>
                  <CellDirective value='m_quantity' ></CellDirective>
                  <CellDirective value='m_fat' ></CellDirective>
                  <CellDirective value='m_snf' ></CellDirective>
                  <CellDirective value='e_quantity' ></CellDirective>
                  <CellDirective value='e_fat' ></CellDirective>
                  <CellDirective value='e_snf' ></CellDirective>
                </CellsDirective>
              </RowDirective>

            {name.filter((loc) => {
              if (filterTerm === "") {

                return loc;

              }
              else if (loc.location.toLowerCase().includes(filterTerm.toLowerCase())) {


                return loc;

              }
            }).map((names)=>(
              
                <RowDirective width={800}>
                  <CellsDirective>
                    <CellDirective width={800} value={names.name}></CellDirective>
                    <CellDirective width={800} value={names.location} ></CellDirective>
                    <CellDirective width={800} value={date} format={dateFormat}></CellDirective>
                  </CellsDirective>
                </RowDirective>
              ))}

              
             
            </RowsDirective> 

            

          </SheetDirective>
    )) }
        </SheetsDirective>
      </SpreadsheetComponent>
      </>
      ) }
    </div>
  )
}

export default Spreadsheet