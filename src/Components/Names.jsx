import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Names() {
    const [nameData,setNameData] = useState()
    const milkData = localStorage.getItem('milkData')
 
   


    useEffect(() => {
      
        const fetch = async () => {
            
          try {
           
            const data  = await axios.get('https://acc-backend-done.herokuapp.com/');
            setNameData(data.data);
        
          
            console.table(data.data);
          } catch (err) {
            console.error(err);
           
          }

         
        };
        fetch();
      }, []);

      console.table(milkData)

  return (
    <>
    <div className='name-list'>
        {nameData && (nameData.map((entry)=>(
            <div className='name-item'>
            <Link className='name-link' to={`/data/${entry._id}`}>{entry.name}</Link>
            
            </div>)
        ))}
        </div>    
    </>
  )
}

export default Names