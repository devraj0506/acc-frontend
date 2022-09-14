import React,{useState,useEffect} from 'react'
import './Form.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Form() {
    
    const [Addname,setAddName] = useState()
    const [name,setName] = useState()
    const [Value,setValue] = useState()
    const [Date,setDate] = useState()
    const [Mquan,setMquan] = useState()
    const [Equan,setEquan] = useState()
    const [Efat,setEfat] = useState()
    const [Mfat,setMfat] = useState()
    const [Esnf,setEsnf] = useState()
    const [Msnf,setMsnf] = useState()
    const [nameData,setNameData] = useState()
    


    const HandleName = async (e) =>{
        // e.preventDefault()
        axios.post("http://localhost:5000/name",{name:Addname,value:Value})
        .then((response) => {
            console.log(response);
            alert("added to database")
            // window.location.reload()
          })
          .catch((error) => {
            console.log(error.response.data);
                        
          });
    }
    const HandleForm = async (e) =>{
        // e.preventDefault()

        if(Mquan && Mfat && Msnf && Efat && Esnf && Equan){
            axios.post("http://localhost:5000/",{name:name,quantity:Mquan,fat:Mfat,spl:Msnf,date:Date,dn:"day"})
            .then((response) => {
                console.log(response);
                alert("added to database")
                // window.location.reload()
              })
              .catch((error) => {
                console.log(error.response.data);
                alert("error")        
              });
    
            
            axios.post("http://localhost:5000/",{name:name,quantity:Equan,fat:Efat,spl:Esnf,date:Date,dn:"night"})
            .then((response) => {
                console.log(response);
                
              })
              .catch((error) => {
                console.log(error.response.data);
                alert("error")          
              });
        }

        else if(Mquan && Mfat && Msnf && !Efat && !Esnf && !Equan){
            axios.post("http://localhost:5000/",{name:name,quantity:Mquan,fat:Mfat,spl:Msnf,date:Date,dn:"day"})
            .then((response) => {
                console.log(response);
                alert("added to database")
                // window.location.reload()
              })
              .catch((error) => {
                  alert("error")
                console.log(error.response.data);
                            
              });
        }

        else if(!Mquan && !Mfat && !Msnf && Efat && Esnf && Equan){
            axios.post("http://localhost:5000/",{name:name,quantity:Equan,fat:Efat,spl:Esnf,date:Date,dn:"night"})
            .then((response) => {
                console.log(response);
                
              })
              .catch((error) => {
                console.log(error.response.data);
                   alert("error")         
              });
        }

       
       
    }


    useEffect(() => {
      
        const fetch = async () => {
            
          try {
           
            const data  = await axios.get('http://localhost:5000/');
            setNameData(data.data);
        
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

      console.log(nameData)




  return (
    <>
    <div className="container">

    <Link to='/data'><button>See Data</button></Link>

        <form id="contact" onSubmit={HandleForm}>
            
            <h3>Milk Man</h3>
            <h4>All details regarding this</h4>
            <fieldset>
                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Client Name</label>
                    <select value={name} className="form-select" id="validationCustom04" onChange={(e)=>setName(e.target.value)} required>
                         <option selected disabled value="">Choose...</option>
                        {/*<option value="mohanlal">Mohan Lal</option>
                    <option value="ravikumar">Ravi kumar</option>
                    <option value = "rohanlal">Rohan Lal</option> */}
                    
                         {nameData && nameData.map((entry)=>(
                             <option value={entry.value}>{entry.name}</option>
                         ))}

                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <input placeholder="Date" value={Date} onChange={(e)=>setDate(e.target.value)} type="date" tabIndex="4" required/>
            </fieldset>
            <fieldset>
                <input placeholder="Morning milk quality" value = {Mquan} onChange={(e)=>setMquan(e.target.value)} type="text" tabIndex="1" autofocus/>
            </fieldset>
            <fieldset>
                <input value = {Mfat} onChange={(e)=>setMfat(e.target.value)} placeholder="Morning fat" type="text" tabIndex="2"/>
            </fieldset>
            <fieldset>
                <input value = {Msnf} onChange={(e)=>setMsnf(e.target.value)} placeholder="Morning snf" type="text" tabIndex="3" />
            </fieldset>
            <fieldset>
                <input value = {Equan} onChange={(e)=>setEquan(e.target.value)} placeholder="Evening milk quality" type="text" tabIndex="4" />
            </fieldset>
            <fieldset>
                <input value = {Efat} onChange={(e)=>setEfat(e.target.value)} placeholder="Evening fat" type="text" tabIndex="4" />
            </fieldset>
            <fieldset>
                <input value = {Esnf} onChange={(e)=>setEsnf(e.target.value)} placeholder="Evening snf" type="text" tabIndex="4" />
            </fieldset>
            
            <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
            </fieldset>
            <p className="copyright">Designed by <a href="startingcore" target="_blank"
                    title="startingcore">Startingcore</a></p>
        </form>

        <form id="contact" onSubmit={HandleName}>
        <fieldset>
                <input value = {Addname} onChange={(e)=>setAddName(e.target.value)} placeholder="ADD NEW Name" type="text" tabIndex="4" required/>
            </fieldset>
        <fieldset>
                <input value = {Value} onChange={(e)=>setValue(e.target.value)} placeholder="VALUE" type="text" tabIndex="4" required/>
            </fieldset>
            <fieldset>
                <button name="submit" type="submit" id="contact-submit" >Submit</button>
            </fieldset>
        </form>
    </div>


    </>
  )
}

export default Form