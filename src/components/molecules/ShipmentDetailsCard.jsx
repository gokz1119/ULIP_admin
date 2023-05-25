import React, { useEffect, useState } from "react";
import { capitalize } from "../../helpers/wordHelper";
import {
  getCityCoordinatesByID,
  getCityNameByID,
} from "../../helpers/cityHelper";
import { getDisplayDate } from "../../helpers/dateHelper";
import ShipmentMap from "./ShipmentMap";
import ButtonPrimary from "../atoms/ButtonPrimary";
import { generateAuthHeader } from "../../helpers/axiosHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShipmentDetailsCard({
  shipmentDetails,
  cities,
  shipmentId,
}) {
  const [statusString, setStatusString] = useState("");
  const [hasCitiesToMap, setHasCitiesToMap] = useState(false);

  const navigate = useNavigate();

  const [statusChangeDetails, setStatusChangeDetails] = useState({
    shipmentId: shipmentId,
    status: "",
  });

  const [possibleStatusUpdates, setPossibleStatusUpdates] = useState([
    { key: "ONGOINGTODESTINATION", value: "ongoing to destination" },
    { key: "PAST", value: "completed" },
  ]);
  const onChange = (e) => {
    setStatusChangeDetails((details) => ({
      ...details,
      status: e.target.value,
    }));
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();

    if (statusChangeDetails.status === "") {
      alert("Please select a status before updating!");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_BASEURL;
    const statusUpdateUrl = `${baseUrl}/admin/statusupdate`;
    const axiosConfig = generateAuthHeader();

    axios
      .post(statusUpdateUrl, statusChangeDetails, axiosConfig)
      .then((response) => {
        console.log(response.data);
        alert("Status updated successfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          alert("You aren't authorized to perform this action!");
          return;
        }
        alert("Uh-oh! Something went wrong :(");
      });
  };

  useEffect(() => {
    if (shipmentDetails.status === "PAST") {
      setStatusString("Completed");
      setHasCitiesToMap(true);
      setPossibleStatusUpdates([]);
    } else if (shipmentDetails.status === "ONGOINGTOHUB") {
      setStatusString(`Ongoing to ${shipmentDetails.hub.name}`);
      console.log("Here");
      setHasCitiesToMap(true);
      console.log("hasCities ", hasCitiesToMap);
      setPossibleStatusUpdates([
        { key: "ONGOINGTODESTINATION", value: "ongoing to destination" },
        { key: "PAST", value: "completed" },
      ]);
      setStatusChangeDetails((details) => ({
        ...details,
        status: "ONGOINGTODESTINATION",
      }));
    } else if (shipmentDetails.status === "ONGOINGTODESTINATION") {
      setStatusString(
        `Passed ${shipmentDetails.hub.name} on the way to ${getCityNameByID(
          shipmentDetails.destination,
          cities
        )}`
      );
      setHasCitiesToMap(true);
      setPossibleStatusUpdates([{ key: "PAST", value: "completed" }]);
      setStatusChangeDetails((details) => ({
        ...details,
        status: "PAST",
      }));
    } else {
      setStatusString("Upcoming; Hub not assigned");
      setPossibleStatusUpdates([]);
    }
  }, [shipmentDetails]);

  return (
    <div className="mt-32 flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-4xl">
        Shipment <span className="text-orange-primary">Details</span>
      </h2>
      <div className="bg-background-secondary md:min-w-[40vw] p-4 md:p-8 m-5 text-xl text-center rounded-xl">
        <div className="grid grid-cols-3 ">
          <span className="whitespace-nowrap text-start">Shipment ID</span>
          <span className="flex-grow">:</span>
          <br className="block sm:hidden" />
          <span className="text-orange-primary ml-2 mt-2 md:mt-0 text-end">
            {shipmentDetails._id}
          </span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Source</span>
          <span className="">:</span>
          <span className="ml-2 text-end">
            {capitalize(getCityNameByID(shipmentDetails.source, cities))}
          </span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Destination</span>
          <span className="">:</span>
          <span className="ml-2 text-end">
            {capitalize(getCityNameByID(shipmentDetails.destination, cities))}
          </span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Date</span>
          <span className="">:</span>
          <span className="ml-2 text-end">
            {getDisplayDate(shipmentDetails.date, true)}
          </span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Type of Goods</span>
          <span className="">:</span>
          <span className="ml-2 text-end">
            {capitalize(shipmentDetails.shipmentType)}
          </span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Quantity</span>
          <span className="">:</span>
          <span className="ml-2 text-end">{shipmentDetails.quantity} kg</span>
        </div>

        <div className="grid grid-cols-3  mt-2">
          <span className="whitespace-nowrap text-start">Status</span>
          <span className="">:</span>
          <span className="ml-2 text-end">{statusString}</span>
        </div>

        {shipmentDetails.hub && (
          <>
            <div className="grid grid-cols-3  mt-2">
              <span className="whitespace-nowrap text-start">
                Allocated Hub
              </span>
              <span className="">:</span>
              <span className="ml-2 text-end text-orange-primary">
                {shipmentDetails.hub.name}
              </span>
            </div>
          </>
        )}

        {(shipmentDetails.status === "ONGOINGTOHUB" ||
          shipmentDetails.status === "ONGOINGTODESTINATION") && (
          <div className="text-xl mt-3">
            <p>Change shipment status:</p>
            <div className="flex justify-center items-center">
              <select
                name="newShipmentStatus"
                id="newShipmentStatus"
                onChange={onChange}
                className="bg-background-tertiary focus-within:bg-background-primary p-3 m-3 rounded-lg outline-none cursor-pointer min-w-[10vw]"
              >
                {possibleStatusUpdates.map((status, index) => {
                  return (
                    <option key={index} value={status.key}>
                      {capitalize(status.value)}
                    </option>
                  );
                })}
              </select>
              <div onClick={handleUpdateStatus}>
                <ButtonPrimary size="xl" text="Update status" />
              </div>
            </div>
          </div>
        )}
      </div>

      {hasCitiesToMap && (
        <ShipmentMap
          citiesToMap={[
            getCityCoordinatesByID(shipmentDetails.source, cities),
            getCityCoordinatesByID(shipmentDetails.hub._id, cities),
            getCityCoordinatesByID(shipmentDetails.destination, cities),
          ]}
        />
      )}
    </div>
  );
}
