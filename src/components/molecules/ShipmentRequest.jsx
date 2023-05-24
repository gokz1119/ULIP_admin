import React, { useState } from "react";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { capitalize } from "../../helpers/wordHelper";
import { getFormattedDate } from "../../helpers/dateHelper";
import axios from "axios";

export default function ShipmentRequest() {

  const cities = [
    { id: 0, name: "new delhi" },
    { id: 1, name: "mumbai" },
    { id: 2, name: "bengaluru" },
    { id: 3, name: "chennai" },
    { id: 4, name: "hyderabad" },
    { id: 5, name: "kolkata" },
    { id: 6, name: "pune" },
    { id: 7, name: "ahmedabad" },
    { id: 8, name: "jaipur" },
    { id: 9, name: "kochi" },
  ];

  const [shipmentDetails, setShipmentDetails] = useState({
    source: cities[0].name,
    destination: cities[1].name,
    date: getFormattedDate(new Date()),
    quantity: 100,
  });

  const onChange = (e) => {
    setShipmentDetails((details) => ({
      ...details,
      [e.target.name]:
        e.target.name === "quantity"
          ? parseInt(e.target.value)
          : e.target.value,
    }));
  };

  const onSubmit = (e) => {
    // IMP: Validate whether all the fields are filled
    console.log(shipmentDetails);

    // IMP: Add the shipment request url here after the backend is completed.
    const shipmentRequestUrl = "";
    axios
      .post(shipmentRequestUrl, shipmentDetails)
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
        var userPreference;

      if (confirm("Are you sure you want to continue the shipment? \nOnce submitted you cannot cancel the request") == true) {
          userPreference = "Data saved successfully!";
          } else {
          userPreference = "Save Cancelled!";
}
       
      });
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl">
        Compute <span className="text-orange-primary"> hub</span>
      </h2>
      <div className="m-5 p-4 min-h-[10vh] min-w-[50vw] md:min-w-[35vw] bg-background-secondary rounded-xl shadow-bottom">
        <form
          onSubmit={onSubmit}
          className="flex flex-col md:flex-row md:justify-evenly md:items-center"
        >
         

          <div className="flex justify-between md:flex-col md:justify-center items-center">
            <label htmlFor="date-of-shipping" className="font-semibold">
              DATE
            </label>
            <input
              required
              type="date"
              name="date"
              onChange={onChange}
              id="date-of-shipping"
              defaultValue={getFormattedDate(new Date())}
              min={getFormattedDate(new Date())}
              className="bg-background-tertiary focus-within:bg-background-primary cursor-pointer p-3 m-2 rounded-lg outline-none min-w-[10vw]"
            />
          </div>

          

          <div className="hidden md:block m-4 mt-10">
            <ButtonPrimary text="Compute" size="xl" />
          </div>
          <div className="block md:hidden m-3">
            <ButtonPrimary text="Send Request" size="lg" />
          </div>
        </form>
      </div>
    </>
  );
}
