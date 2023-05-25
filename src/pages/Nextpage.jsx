import React from "react";
import Navbar from "../components/molecules/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/atoms/ButtonPrimary";

export default function Nextpage() {
  const navigate = useNavigate();
  const location = useLocation();

  const hubDetails = location.state.hub;

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <Navbar type="loggedin" />
      <div className="bg-background-primary mt-40">
        <h1 className="text-4xl">Hub allocation was successful!</h1>
        <p className="mt-5 text-xl">
          The allocated hub is:{" "}
          <span className="px-2 text-orange-primary">{hubDetails.name}</span>
          <br /> (Infrastructure Index: {hubDetails.infraIndex})
        </p>
        <p className="mt-5 text-xl">
          You can view the details and status of the various requests on your
          dashboard's upcoming tab{" "}
        </p>
        <div className="mt-5" onClick={handleGoBack}>
          <ButtonPrimary size="lg" text="Back to Dashboard" />
        </div>
      </div>
    </>
  );
}
