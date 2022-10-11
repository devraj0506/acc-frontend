import React, { useState, useEffect } from "react";
import { SingleAmt } from "./SingleAmt";
import axios from "axios";

function SubTotal(props) {
  const [nameData, setNameData] = useState();
  var usefulData;
  let TotalAmt = 0;
  const [total, setTotal] = useState(0);
  const { loc } = props;

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get("https://acc-backend-done.herokuapp.com/");
        setNameData(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  if (nameData) {
    usefulData = nameData.filter((entity) => {
      if (entity.location === loc) {
        return entity;
      }
    });
  }

  if (usefulData) {
    console.log(usefulData);
    usefulData.map((entity) => {
      TotalAmt = TotalAmt + SingleAmt(entity.name);
      console.log(SingleAmt(entity.name));
    });
  }

  return <h1>₹{TotalAmt}</h1>;
}

export default SubTotal;
