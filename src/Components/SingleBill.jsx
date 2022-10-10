import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import moment from 'moment/moment';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import { AtmOutlined } from '@mui/icons-material';



function SingleBill(props) {


    const [customer, setCustomer] = useState()
    const [Amount, setAmount] = useState(0)
    const bill = useRef()
    var Rate
    var price = 0
    var Cprice = 0
    const { id } = props
    const allData = JSON.parse(localStorage.getItem('milkData'))
    const allRates = JSON.parse(localStorage.getItem('rateData'))
    // const AllData = JSON.parse(localStorage.getItem('milkData'))
    let CustName, usefulData, totalMQuan, totalEQuan, totalQuan, totalMFat, totalEFat, totalFat, totalMSnf, totalESnf, totalsnf, MavgFat, EavgFat, avgFat, EavgSnf, MavgSnf, avgSnf, MzeroFat = 0, MzeroSnf = 0, EzeroFat = 0, EzeroSnf = 0, cmilkSnf, CMilkQuan

    useEffect(() => {
        const fetch = async () => {
            try {
                const Data = await axios.get(`https://acc-backend-done.herokuapp.com/name/${id}`)
                setCustomer(Data.data)
            } catch (error) {
                // console.log(error)
            }
        }

        fetch()

    }, []);
    // console.log(customer)
    // console.log(allData)


    if (customer) {
        CustName = customer.name
        // console.log(CustName)
        usefulData = allData.filter((customerData) => {
            return customerData.Name === CustName
        })
        totalMQuan = usefulData.reduce((total, currentItem) => total = total + currentItem.m_quantity, 0);
        totalEQuan = usefulData.reduce((total, currentItem) => total = total + currentItem.e_quantity, 0);
        totalMFat = usefulData.reduce((total, currentItem) => total = total + currentItem.m_fat, 0);
        totalEFat = usefulData.reduce((total, currentItem) => total = total + currentItem.e_fat, 0);
        totalMSnf = usefulData.reduce((total, currentItem) => total = total + currentItem.m_snf, 0);
        totalESnf = usefulData.reduce((total, currentItem) => total = total + currentItem.e_snf, 0);
        totalQuan = totalEQuan + totalMQuan

        const McMilk = usefulData.filter((cm) => {
            if (cm.m_fat === 0 && cm.m_snf !== 0) {
                return cm
            }
        })

        const EcMilk = usefulData.filter((cm) => {
            if (cm.e_fat === 0 && cm.e_snf !== 0) {
                return cm
            }
        })

        const zeroFatM = usefulData.filter((zero) => {
            if (zero.m_fat === 0) {
                return zero

            }
        })
        const zeroFatE = usefulData.filter((zero) => {

            if (zero.e_fat === 0) {
                return zero

            }
        })
        const zeroSnfM = usefulData.filter((zero) => {
            if (zero.m_snf === 0) {
                return zero

            }
        })
        const zeroSnfE = usefulData.filter((zero) => {
            if (zero.e_snf === 0) {
                return zero

            }
        })
        if (zeroFatM) {
            MzeroFat = zeroFatM.length
        }
        if (zeroFatE) {
            EzeroFat = zeroFatE.length
        }
        if (zeroSnfM) {
            MzeroSnf = zeroSnfM.length
        }
        if (zeroSnfE) {
            EzeroSnf = zeroSnfE.length
        }



        // console.log(EcMilk)
        // console.log(McMilk)

        MavgFat = (totalMFat / (usefulData.length - MzeroFat)) || 0
        EavgFat = (totalEFat / (usefulData.length - EzeroFat)) || 0
        MavgSnf = (totalMSnf / (usefulData.length - MzeroSnf)) || 0
        EavgSnf = (totalESnf / (usefulData.length - EzeroSnf)) || 0
        avgFat = ((MavgFat + EavgFat) / 2) || 0    
        avgSnf = ((MavgSnf + EavgSnf) / 2) || 0
        CMilkQuan = EcMilk.reduce((total, currentItem) => total = total + currentItem.e_quantity, 0) + McMilk.reduce((total, currentItem) => total = total + currentItem.m_quantity, 0);

        cmilkSnf = ((EcMilk.reduce((total, currentItem) => total = total + currentItem.e_snf, 0) + McMilk.reduce((total, currentItem) => total = total + currentItem.m_snf, 0)) / (EcMilk.length + McMilk.length)) || 0

        Rate = allRates.filter((entity) => {
            if (avgFat.toFixed(1) === entity.fat.toFixed(1)) {
                return entity
            }
        }).filter((entity) => {
            if (avgSnf.toFixed(1) === entity.snf.toFixed(1)) {
                return entity
            }
        })
        console.log(Rate)

        Rate.map((entity) => {
            console.log(entity.rate)
            price = entity.rate
        })
    }
    // console.table(usefulData)

    // console.log()
    const TotalAmt = (CMilkQuan * Cprice) + ((totalQuan - CMilkQuan) * price)

    return (
        <div className='two-bill'>
            {customer && (
                <div className='single-bill'>
                    <div className='names-sect'>
                        <p>{customer.name}</p>
                        <p>{customer.location}</p>
                    </div>
                    <table className='single-bill-table' border="1" width="100%" bgcolor='white'>
                        <thead>
                            {/* <tr>Name: {customer.name}</tr> */}
                            {/* <tr>Day</tr> */}
                            <tr>
                                <td>Date</td>
                                <td>M_Quantity</td>
                                <td>M_Fat</td>
                                <td>M_SNF</td>
                                <td>E_Quantity</td>
                                <td>E_Fat</td>
                                <td>E_SNF</td>
                            </tr>
                        </thead>

                        <tbody>{
                            allData.filter(user => {
                                if (user.Name === customer.name) {
                                    return user
                                }
                            }).map((entry) => (
                                <tr>
                                    <td>{moment(entry.date).format('DD/MM/YYYY')}</td>
                                    <td>{entry.m_quantity}</td>
                                    <td>{entry.m_fat}</td>
                                    <td>{entry.m_snf}</td>
                                    <td>{entry.e_quantity}</td>
                                    <td>{entry.e_fat}</td>
                                    <td>{entry.e_snf}</td>
                                </tr>

                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td>TOTAL</td>

                                <td>{totalMQuan}</td>
                                <td>{(Number(MavgFat.toFixed(1)).toFixed(2)) || 0}</td>
                                <td>{(Number(MavgSnf.toFixed(1)).toFixed(2)) || 0}</td>
                                <td>{totalEQuan}</td>
                                <td>{(Number(EavgFat.toFixed(1)).toFixed(2)) || 0 }</td>
                                <td>{(Number(EavgSnf.toFixed(1)).toFixed(2)) || 0}</td>
                            </tr>
                        </tfoot>

                    </table> </div>)}
            {customer && (<div>
                <div className='bill' ref={bill}>
                    
                    
                    <table className='single-bill-table' border="1" width="100%" bgcolor='white'>
                        <tr>
                            <td>TOTAL</td>
                            <td>Total Quantity</td>
                            <td>Total Cream Milk</td>
                            <td>Total Taza Milk</td>

                            <td>Total Fat</td>
                            <td>Total snf</td>
                            <td>Cream Milk snf</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>{totalQuan}</td>
                            <td>{CMilkQuan}</td>
                            <td>{totalQuan - CMilkQuan}</td>
                            <td>{(Number(avgFat.toFixed(1)).toFixed(2)) || 0}</td>
                            <td>{(Number(avgSnf.toFixed(1)).toFixed(2)) || 0}</td>
                            <td>{(Number(cmilkSnf.toFixed(1)).toFixed(2)) || 0}</td>
                        </tr>
                        <tr>
                            <td>Amount per L</td>
                            <td></td>
                            <td>{Cprice}</td>
                            <td>{price}</td>
                            {/* <input value={Amount} onChange={(e) => setAmount(e.target.value)} type="text" /> */}
                        </tr>
                        <tr>
                            <td>Total Amount</td>
                            <td>{Math.round((Number(TotalAmt.toFixed(2))))}</td>
                        </tr>
                    </table>
                </div>
                {/* <button className='bill-print' onClick={() => exportComponentAsJPEG(bill)}>export to image</button> */}
            </div>)}
        </div>
    )
}

export default SingleBill
