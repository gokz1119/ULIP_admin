import React, { useEffect, useState } from "react";
import ShipmentHistoryTabs from "../atoms/ShipmentHistoryTabs";
import ShipmentCard from "./ShipmentCard";
import noShipment from "../../assets/vectors/no_shipments.svg";

export default function ShipmentHistory() {
  const [hasShipmentStatus, setHasShipmentStatus] = useState({
    past: false,
    ongoing: false,
    upcoming: false,
  });

  // IMP: After backend is completed remove this sample data
  const [shipmentList, setShipmentList] = useState([
    {
      shipmentId: "a213rds",
      source: "kochi",
      destination: "new delhi",
      date: "2023-06-01",
      shipmentType: "edible",
      shipmentStatus: "upcoming",
    },
    {
      shipmentId: "b125caa",
      source: "bangalore",
      destination: "mumbai",
      date: "2022-03-24",
      shipmentType: "chemicals",
      shipmentStatus: "past",
    },
    {
      shipmentId: "c234aef",
      source: "bangalore",
      destination: "chennai",
      date: "2023-05-12",
      shipmentType: "edible",
      shipmentStatus: "past",
    },
  ]);

  return (
    <>
      <h2 className="text-3xl md:text-4xl">
        <span className="text-orange-primary">Shipments</span>
      </h2>

      {shipmentList.map((shipmentDetails) => {
          return (
            <ShipmentCard
              key={shipmentDetails.shipmentId}
              shipmentDetails={shipmentDetails}
            />
          );
      })}

      {shipmentList.length === 0 && (
        <>
          <p className="m-10 text-3xl">No shipments to show!</p>
          <img
            src={noShipment}
            alt="No shipments found"
            width={"350px"}
            height={"350px"}
            className="m-10"
          />
        </>
      )}
      
    </>
  );
}
