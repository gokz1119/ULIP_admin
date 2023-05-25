import React, { useState } from "react";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { getFormattedDate } from "../../helpers/dateHelper";
import axios from "axios";
import { generateAuthHeader } from "../../helpers/axiosHelper";
import { useNavigate } from "react-router-dom";

export default function ShipmentRequest() {
  const navigate = useNavigate();
  const [dateDetail, setDateDetail] = useState({
    date: getFormattedDate(new Date()),
  });

  const onChange = (e) => {
    setDateDetail((details) => ({
      ...details,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // IMP: Validate whether all the fields are filled
    console.log(dateDetail);
    if (
      confirm(
        "Are you sure you want to submit the hub allocation request? \nOnce submitted you cannot cancel or edit the request"
      ) == true
    ) {
      const axiosConfig = generateAuthHeader();
      const baseUrl = import.meta.env.VITE_API_BASEURL;
      const shipmentRequestUrl = `${baseUrl}/hubs/findHub`;
      axios
        .post(shipmentRequestUrl, dateDetail, axiosConfig)
        .then((response) => {
          console.log(response)
          navigate(`/submitrequest`, {
            state: {
              hub: response.data
            }
          })
        })
        .catch((err) => {
          console.log(err);
          alert(
            "Uh-oh, couldn't reach our servers at the moment. We regret the inconvenience caused :("
          );
          navigate("/");
        });
    }
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl">
        Compute <span className="text-orange-primary"> hub</span> for date
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
            <ButtonPrimary text="Compute" size="lg" />
          </div>
        </form>
      </div>
    </>
  );
}
