import React,{useEffect,useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'


function Data() {
const [dat,setDat] = useState([])
const [upper,setUpper] = useState()
const [lower,setLower] = useState()


  let night, day, totalquan, totalfat, totalsnf, avgfat, avgsnf, totalquannight, totalfatnight, totalsnfnight, avgfatbight, avgsnfnight, lengthnight, lengthday
  const {name} = useParams()
  console.log(name)
useEffect(() => {
      
        const fetch = async () => {
            
          try {
           
            const data = await axios.get(`https://backendclient-a3tq5fc1i-mohitpareek16.vercel.app/${name}`);
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

  totalquan = day.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.quantity , 0 );


  totalfat = day.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.fat , 0 );


  totalsnf = day.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.spl , 0 );


  totalsnfnight = night.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.spl , 0 );


  totalfatnight = night.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.fat , 0 );
  
  totalquannight = night.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).reduce((total,currentItem) =>  total = total + currentItem.quantity , 0 );


  lengthday = day.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).length

  lengthnight = night.filter(user => {
    if (!upper || !lower) {
      return user
    }
    else if (lower <= user.date && user.date <= upper) {
      return user
    }
  }).length



  console.log(`totsl is ${totalquan}`)
  console.log(`totsl is ${totalfat/day.length}`)
  console.log(`totsl is ${totalsnf/day.length}`)

avgfat = totalfat/lengthday
avgsnf = totalsnf/lengthday
avgfatbight=totalfatnight/lengthnight
avgsnfnight=totalsnfnight/lengthnight

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

      <td>{avgfatbight}</td>
      <td contentEditable='true'>{avgsnfnight}</td>
      </tr>
          <tr>
            <td>TOTAL AMOUNT</td>
            <td contentEditable='true'>{totalquannight}</td>

            <td>{avgfatbight}</td>
            <td contentEditable='true'>{avgsnfnight}</td>
          </tr>
      </tbody>

     
    </table>
    </>
  )
}

export default Data