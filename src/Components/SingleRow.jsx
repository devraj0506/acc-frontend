import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
// import { useParams } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { AtmOutlined } from "@mui/icons-material";
import { TotalContext } from "./Context";
import { AuthProvider } from "./Context";
var newStart;

function Row(props) {
  var red = false;
  const [customer, setCustomer] = useState();
  const [Amount, setAmount] = useState(0);
  const bill = useRef();
  var amt = JSON.parse(localStorage.getItem("total"));
  var Rate;
  var price = 0;
  var Cprice = 0;
  var Crate ;
  const { id } = props;
  const allData = JSON.parse(localStorage.getItem("milkData"));
  const allRates = JSON.parse(localStorage.getItem("rateData"));

  let CustName,
    usefulData,
    totalMQuan,
    totalEQuan,
    totalQuan,
    totalMFat,
    totalEFat,
    totalFat,
    totalMSnf,
    totalESnf,
    totalsnf,
    MavgFat,
    EavgFat,
    avgFat,
    EavgSnf,
    MavgSnf,
    avgSnf,
    MzeroFat = 0,
    MzeroSnf = 0,
    EzeroFat = 0,
    EzeroSnf = 0,
    cmilkSnf,
    CMilkQuan;

  useEffect(() => {
    const fetch = async () => {
      try {
        const Data = await axios.get(
          `https://acc-backend-done.herokuapp.com/name/${id}`
        );
        setCustomer(Data.data);
      } catch (error) {
        // console.log(error)
      }
    };

    fetch();
  }, []);

  if (customer) {
    CustName = customer.name;

    usefulData = allData.filter((customerData) => {
      return customerData.Name === CustName;
    });
    totalMQuan = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.m_quantity),
      0
    );
    totalEQuan = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.e_quantity),
      0
    );
    totalMFat = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.m_fat),
      0
    );
    totalEFat = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.e_fat),
      0
    );
    totalMSnf = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.m_snf),
      0
    );
    totalESnf = usefulData.reduce(
      (total, currentItem) => (total = total + currentItem.e_snf),
      0
    );
    totalQuan = totalEQuan + totalMQuan;

    const McMilk = usefulData.filter((cm) => {
      if (cm.m_fat === 0 && cm.m_snf !== 0) {
        return cm;
      }
    });

    const EcMilk = usefulData.filter((cm) => {
      if (cm.e_fat === 0 && cm.e_snf !== 0) {
        return cm;
      }
    });

    const zeroFatM = usefulData.filter((zero) => {
      if (zero.m_fat === 0) {
        return zero;
      }
    });
    const zeroFatE = usefulData.filter((zero) => {
      if (zero.e_fat === 0) {
        return zero;
      }
    });
    const zeroSnfM = usefulData.filter((zero) => {
      if (zero.m_snf === 0) {
        return zero;
      }
    });
    const zeroSnfE = usefulData.filter((zero) => {
      if (zero.e_snf === 0) {
        return zero;
      }
    });
    if (zeroFatM) {
      MzeroFat = zeroFatM.length;
    }
    if (zeroFatE) {
      EzeroFat = zeroFatE.length;
    }
    if (zeroSnfM) {
      MzeroSnf = zeroSnfM.length;
    }
    if (zeroSnfE) {
      EzeroSnf = zeroSnfE.length;
    }

    MavgFat = totalMFat / (usefulData.length - MzeroFat);
    EavgFat = totalEFat / (usefulData.length - EzeroFat);
    MavgSnf = totalMSnf / (usefulData.length - MzeroSnf);
    EavgSnf = totalESnf / (usefulData.length - EzeroSnf);
    avgFat = (MavgFat + EavgFat) / 2 || 0;
    avgSnf = (MavgSnf + EavgSnf) / 2 || 0;
    CMilkQuan =
      EcMilk.reduce(
        (total, currentItem) => (total = total + currentItem.e_quantity),
        0
      ) +
      McMilk.reduce(
        (total, currentItem) => (total = total + currentItem.m_quantity),
        0
      );

    cmilkSnf =
      (EcMilk.reduce(
        (total, currentItem) => (total = total + currentItem.e_snf),
        0
      ) +
        McMilk.reduce(
          (total, currentItem) => (total = total + currentItem.m_snf),
          0
        )) /
        (EcMilk.length + McMilk.length) || 0;

    Rate = allRates
      .filter((entity) => {
        if (avgFat.toFixed(1) === entity.fat.toFixed(1)) {
          return entity;
        }
      })
      .filter((entity) => {
        if (avgSnf.toFixed(1) === entity.snf.toFixed(1)) {
          return entity;
        }
      });

    Rate.map((entity) => {
      price = entity.rate;
    });
  }

if(cmilkSnf){
  Crate = allRates
    .filter((entity) => {
      if (cmilkSnf.toFixed(1) === entity.c_snf.toFixed(1)) {
        return entity;
      }
    })
if(cmilkSnf > 8.0 ){
Cprice = 8.00
}
else{
  Crate.map((entity) => {
    Cprice = entity.c_price;
  });
}
    
}


  const TotalAmt = CMilkQuan * Cprice + (totalQuan - CMilkQuan) * price;
  if (TotalAmt) {
    newStart = TotalAmt;
  }

  const checkRed = (fat, snf) => {
    if (Number(fat.toFixed(2)) < 3.0 || Number(snf.toFixed(2)) < 8.0) {
      red = true;
    }
  };

  if (cmilkSnf) {
    if (Number(cmilkSnf.toFixed(2)) < 8.0) {
      red = true;
    }
  }

  if (avgFat && avgSnf) {
    checkRed(avgFat, avgSnf, cmilkSnf);
  }

  return (
    <div className="fif-bill">
      {customer && (
        <div>
          <div className="bill" ref={bill}>
            <table
              className="single-bill-table2"
              border="1"
              width="100%"
              bgcolor="white"
            >
              <tr>
                <td>Name</td>
                <td>Total Quantity</td>
                <td>Total Cream Milk</td>
                <td>Total Taza Milk</td>

                <td>Total Fat</td>
                <td>Total snf</td>
                <td>Cream Milk snf</td>
                <td>Cream per L</td>
                <td>Taza per L</td>
                <td>Total Amount</td>
              </tr>
              <tr>
                <td>{customer.name}</td>
                <td>{totalQuan}</td>
                <td>{CMilkQuan}</td>
                <td>{totalQuan - CMilkQuan}</td>
                <td className={red ? "red" : ""}>
                  {Number(avgFat).toFixed(2)}
                </td>
                <td className={red ? "red" : ""}>
                  {Number(avgSnf).toFixed(2)}
                </td>
                <td>{Number(cmilkSnf).toFixed(2)}</td>
                <td>{Cprice}</td>
                <td>{price}</td>
                <td>{Math.round(Number(TotalAmt.toFixed(2)))}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
