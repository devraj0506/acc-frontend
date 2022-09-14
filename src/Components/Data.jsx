import React,{useEffect,useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'


function Data() {
const [dat,setDat] = useState([])
const [upper,setUpper] = useState()
const [lower,setLower] = useState()

let night,day,totalquan,totalfat,totalsnf,avgfat,avgsnf,totalquannight,totalfatnight,totalsnfnight
  const {name} = useParams()
  console.log(name)
useEffect(() => {
      
        const fetch = async () => {
            
          try {
           
            const data  = await axios.get(`http://localhost:5000/${name}`);
            setDat(data.data);
        
            // setDocument(data.docs.pdf);
            
            // let formattedTime = moment(data.data.ExpiresAt).format('DD/MM/YYYY HH:mm')
            // console.log(formattedTime)
            // setGetdate(formatte.dTime)
         
            console.table(data.data);
          } catch (err) {
            console.error(err);
           
          }

         
        };
        fetch();
      }, []);


  // console.log(dat)

  if(Data){

  day = dat.filter((milkdata)=>{
    return milkdata.dn==="day"
  })
  night = dat.filter((milkdata)=>{
    return milkdata.dn==="night"
  })
  }
  
  console.log(day)

   totalquan=day.reduce((total,currentItem) =>  total = total + currentItem.quantity , 0 );
   totalfat=day.reduce((total,currentItem) =>  total = total + currentItem.fat , 0 );
   totalsnf=day.reduce((total,currentItem) =>  total = total + currentItem.spl , 0 );
   totalsnfnight=night.reduce((total,currentItem) =>  total = total + currentItem.spl , 0 );
   totalfatnight=night.reduce((total,currentItem) =>  total = total + currentItem.fat , 0 );
   totalquannight=night.reduce((total,currentItem) =>  total = total + currentItem.quantity , 0 );
  console.log(`totsl is ${totalquan}`)
  console.log(`totsl is ${totalfat/day.length}`)
  console.log(`totsl is ${totalsnf/day.length}`)

avgfat = totalfat/day.length
avgsnf = totalsnf/day.length

  return (
    <>

<fieldset>
                <input placeholder="Start Date" value={lower} onChange={(e)=>setLower(e.target.value)} type="date" tabIndex="4" required/>
            </fieldset>

            <fieldset>
                <input placeholder="End Date" value={upper} onChange={(e)=>setUpper(e.target.value)} type="date" tabIndex="4" required/>
            </fieldset>

      

    <table border = "1" width = "100%" bgcolor='white'>
      <thead>
      <tr>Name: {name}</tr>
      <tr>Day</tr>
        <tr>
        <td>Date</td>
        <td>Quantity</td>
        <td>Fat</td>
        <td>SNF</td>
        </tr>
      </thead>

        
      <tbody>{
        day.filter(user => {
          if(!upper || !lower){
            return user
          }
          else if(lower <= user.date && user.date <= upper){
          return user
          }
        }).map((entry)=>(
          <tr>
          <td>{moment(entry.date).format('MMMM Do YYYY')}</td>
          <td>{entry.quantity}</td>
          <td>{entry.fat}</td>
          <td>{entry.spl}</td>
          </tr>
            
        ))}

        <tr>
      <td>TOTAL</td>
      <td>{totalquan}</td>

      <td>{avgfat}</td>
      <td>{avgsnf}</td>
      </tr>
      </tbody>

     
    </table>


     <table border = "1" width = "100%" bgcolor='white'>
      <thead>
      <tr>Night</tr>
        <tr>
        <td>Date</td>
        <td>Quantity</td>
        <td>Fat</td>
        <td>SNF</td>
        </tr>
      </thead>
        
      <tbody>{
        night.filter(user => {
          if(!upper && !lower){
            return user
          }
          else if(lower <= user.date && user.date <= upper){
          return user
          }}).map((entry)=>(
          <tr>
          <td>{moment(entry.date).format('MMMM Do YYYY')}</td>
          <td>{entry.quantity}</td>
          <td>{entry.fat}</td>
          <td>{entry.spl}</td>
          </tr>
            
        ))}

        <tr>
      <td>TOTAL</td>
      <td>{totalquannight}</td>

      <td>{totalfatnight/night.length}</td>
      <td>{totalsnfnight/night.length}</td>
      </tr>
      </tbody>

     
    </table>
    </>
  )
}

export default Data