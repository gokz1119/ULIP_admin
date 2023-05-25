import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../atoms/ButtonPrimary";

export default function SearchShipment() {

  const [searchString, setSearchString] = useState("")
  const navigate = useNavigate()

  const onChange = (e) => {
    e.preventDefault()
    setSearchString(e.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if(searchString === "") return

    navigate(`/shipments/${searchString}`)
  }

  return (
    <>
      <h2 className="text-3xl md:text-4xl">
        Search <span className="text-orange-primary"> shipments</span>
      </h2>
      <div className="m-5 p-4 min-h-[10vh] min-w-[50vw] md:min-w-[35vw] bg-background-secondary rounded-xl shadow-bottom">
        <form
          onSubmit={onSubmit}
          className="flex flex-col md:flex-row md:justify-evenly md:items-center"
        >
          <div className="flex justify-between md:flex-col md:justify-center items-center">
            <label htmlFor="searchString" className="font-semibold">
              SHIPMENT ID
            </label>
            <input
              required
              name="searchString"
              id="searchString"
              type="text"
              onChange={onChange}
              placeholder="Shipment ID"
              className="bg-background-tertiary focus-within:bg-background-primary p-3 m-2 rounded-lg outline-none min-w-[8vw] md:max-w-[15vw] text-end md:text-center"
            />
          </div>

          <div className="hidden md:block m-4 mt-10">
            <ButtonPrimary text="Search" size="xl" />
          </div>
          <div className="block md:hidden m-3">
            <ButtonPrimary text="Search" size="lg" />
          </div>
        </form>
      </div>
    </>
  );
}
