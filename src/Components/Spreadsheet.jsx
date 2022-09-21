import React,{useState,useEffect} from 'react'
import { SpreadsheetComponent, RowDirective, getFormatFromType,RowsDirective,SheetDirective,CellsDirective,CellDirective,ColumnsDirective,ColumnDirective,SheetsDirective } from '@syncfusion/ej2-react-spreadsheet';
import axios from 'axios';
import { AlternateEmailSharp } from '@mui/icons-material';


function Spreadsheet() {
  const [name,setName] = useState()
  const dateFormat:string = getFormatFromType("ShortDate");
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

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

    fetch()

  },[])

  console.log(name)

  return (
    <div>
      {name && (<><SpreadsheetComponent allowSave={true} saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'>
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

              {name.map((names)=>(
                <RowDirective width={800}>
                  <CellsDirective>
                    <CellDirective width={800} value={names.name}></CellDirective>
                    <CellDirective width={800} value={names.location} ></CellDirective>
                    <CellDirective width={800} format={dateFormat}></CellDirective>
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