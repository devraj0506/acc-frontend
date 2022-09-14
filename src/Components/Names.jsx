import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Names() {
    const [nameData,setNameData] = useState()

    useEffect(() => {
      
        const fetch = async () => {
            
          try {
           
            const data  = await axios.get('http://localhost:5000/');
            setNameData(data.data);
        
          
            console.table(data.data);
          } catch (err) {
            console.error(err);
           
          }

         
        };
        fetch();
      }, []);

  return (
    <>
    <div>
        {nameData && nameData.map((entry)=>(
            <div>
            <Link to={`/data/${entry.value}`}>{entry.name}</Link>
            </div>
        ))}
        </div>    
    </>
  )
}

export default Names