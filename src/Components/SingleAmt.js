import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
// import { useParams } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import { AtmOutlined, Subject } from "@mui/icons-material";

function SingleAmt(customer) {
  var Rate;
  var price = 0;
  var Cprice = 0;
  var Crate

  const allData = JSON.parse(localStorage.getItem("milkData"));
  const allRates = JSON.parse(localStorage.getItem("rateData"));
  // const AllData = JSON.parse(localStorage.getItem('milkData'))
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
    CMilkQuan,
    TotalAmt;

  if (customer) {
    CustName = customer;
    // console.log(CustName)
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

    // console.log(EcMilk)
    // console.log(McMilk)

    MavgFat = totalMFat / (usefulData.length - MzeroFat) || 0;
    EavgFat = totalEFat / (usefulData.length - EzeroFat) || 0;
    MavgSnf = totalMSnf / (usefulData.length - MzeroSnf) || 0;
    EavgSnf = totalESnf / (usefulData.length - EzeroSnf) || 0;
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

    if (Rate) {
      Rate.map((entity) => {
        console.log(entity.rate);
        price = entity.rate;
      });
    }
  }


  if (cmilkSnf) {
    
    Crate = allRates
      .filter((entity) => {
        if (Number(cmilkSnf).toFixed(1) === Number(entity.c_snf).toFixed(1)) {
          return entity;
        }
      })
    if (cmilkSnf > 8.5) {
      Cprice = 20.00
    }
    else {
      Crate.map((entity) => {
        Cprice = entity.c_price;
      });
    }
  }

  

 
  
  
  TotalAmt = Math.round(CMilkQuan * Cprice + (totalQuan - CMilkQuan) * price);

  // console.table(usefulData)

  console.log(price);
  console.log(customer);
  console.log(`Mqan is ${totalMQuan}`);
  console.log(`Eqan is ${totalEQuan}`);
  console.log(`avgfat is ${avgFat}`);
  console.log(`avgSnf is ${avgSnf}`);
  console.log(Rate);
  console.log(`total amt is ${TotalAmt}`);

  return Math.round(CMilkQuan * Cprice + (totalQuan - CMilkQuan) * price);
}

export { SingleAmt };
