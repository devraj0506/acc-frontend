import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'

function Names() {
    const [nameData,setNameData] = useState()
    const [locs,setLocs] = useState()
    const [SearchTerm,setSearchTerm] = useState("")
    const [filterTerm,setFilterTerm] = useState("")
    const milkData = localStorage.getItem('milkData')
    const [delData,setDelData] = useState({"name":"ramu","location":"location"})
    const [isModal,setIsModal] = useState(false)
 
   


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

      const fetch2 = async () => {

        try {

          const data = await axios.get('https://acc-backend-done.herokuapp.com/location/data');
          setLocs(data.data);


          console.table(data.data);
        } catch (err) {
          console.error(err);

        }


      };

        
        fetch();
        fetch2();
      }, []);



  const DeleteName = (id, e) => {
    axios.delete(`https://acc-backend-done.herokuapp.com/${id}`)
      .then(response => {
        console.log(response)
        window.location.reload()
        alert("name deleted")
      }).catch(error => {
        console.log(error)
        console.log(id)
        alert(error)
      })
  }

      console.table(milkData)
      console.log(filterTerm)

  return (
    <>
      {locs && nameData && (
    <div className='name-list'>
        <select className='fns'  onChange={(e)=>setFilterTerm(e.target.value)}>
        <option value="">Filter-by-route</option>

      {locs.map((entry)=>(
        <option value={entry.location}>{entry.location}</option>
      )) }
          </select>

          <input className='fns' type="text" value={SearchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}} placeholder='search...'/>

          <button className='bill-print'><Link className='name-link' to={`/bill/${filterTerm}`}>get All Bills </Link></button>
          <button className='bill-print'><Link className='name-link' to={`/sheet/${filterTerm}`}>get Sheet </Link></button>

          {nameData.filter((loc) => {
            if (filterTerm === "") {

              return loc;

            }
            else if (loc.location.toLowerCase().includes(filterTerm.toLowerCase())) {


              return loc;

            }
          }).filter((nam) => {
            if (SearchTerm === "") {

              return nam;

            }
            else if (nam.name.toLowerCase().includes(SearchTerm.toLowerCase())) {


              return nam;

            }
          }).map((entry)=>(
            <div className='name-item'>
            <Link className='name-link' to={`/data/${entry._id}`}>{entry.name}</Link>
              <button className='delete-btn' onClick={()=>{
                setDelData(entry)
                setIsModal(true)
              }}>Delete</button>
            </div>)
        )}

          <Modal isOpen={isModal}
            
            contentLabel="Example Modal"
>

<p>Are you sure you want to delete?</p>
<p>Name: {delData.name}</p>
<p>Location: {delData.location}</p>
<button className='cancel-btn-modal' onClick={()=>setIsModal(false)}>Cancel</button>
<button className='delete-btn-modal' onClick={(e)=>DeleteName(delData._id)}>Delete</button>
        </Modal>
        </div>) }   
    </>
  )
}

export default Names