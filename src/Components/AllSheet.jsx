import React, { useEffect, useState, useRef, useContext } from 'react'
import SingleBill from './SingleBill'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import { useReactToPrint } from 'react-to-print';
import SingleRow from './SingleRow'
import jaishree from './images/49ff1932922571.5698a4cf40ba4.jpg'
// import { TotalContext } from './Context';
import SubTotal from './SubTotal';
// import { AuthProvider } from './Context';




function AllSheet() {
    const [nameData, setNameData] = useState()
    var usefulData
    const container = useRef(null);
    const pdfExportComponent = useRef(null);
    const { loc } = useParams()
    const element = document.querySelector('.all-bill');
    const amt = JSON.parse(localStorage.getItem('total'))
    // const { subTotal, setSubTotal, subt } = useContext(TotalContext);

    // console.log(amt)
    useEffect(() => {

        const fetch = async () => {

            try {

                const data = await axios.get('https://acc-backend-done.herokuapp.com/');
                setNameData(data.data);


                console.table(data.data);
            } catch (err) {
                console.error(err);

            }


        };
        fetch();

    }, []);

    if (nameData) {
        usefulData = nameData.filter((entity) => {
            if (entity.location === loc) {
                return entity
            }
        })
    }


    const handlePrint = useReactToPrint({
        content: () => container.current,
    });

    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
            paperSize: "A4",
            margin: 40,
            fileName: `Report for ${loc}`,
        });
    };


    const printDocument = () => {


        const input = document.getElementById("all-bill");
        const pdf = new jsPDF({
            orientation: 'l',
            unit: 'px',
            format: 'a4',
            precision: 3,
            compress: true,
            putOnlyUsedFonts: true
        });
        pdf.html(input).then(() => {
            pdf.save('test.pdf');
        });

    }

    return (
        <>
            {nameData && (<div id='all-bill' className="all-bill">
                <button
                    className="bill-print"
                    onClick={handlePrint}
                >
                    Print
                </button>
                <div className='bills' ref={container}>
                    <img src={jaishree} className='shree-img' alt="" />
                    <h1>{loc}</h1>
                    <SubTotal loc={loc}/>
                    {/* <AuthProvider>
                    </AuthProvider> */}
                    {usefulData.map((entity) => (
                      
                        <SingleRow id={entity._id} />
                        
                        

                    ))}
                </div>
            </div>)}
        </>
    )
}

export default AllSheet