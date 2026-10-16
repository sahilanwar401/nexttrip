import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { userDataContext } from "../context/UserContext";
import Card from "../component/Card";

const MyListing = () => {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);

  // const listings = userData?.listing || [];
  if (!userData) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6">
      <div
        className="absolute left-6 top-6 cursor-pointer text-gray-700 hover:text-black"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-full flex flex-col items-center mt-10 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-gray-900">
          MY <span className="text-red-500">LISTING</span>
        </h1>

        <div className="mt-3 w-20 h-1 rounded-full bg-linear-to-r from-red-500 to-pink-500"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {userData.listing.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            isBooked={list.isBooked}
            host={list.host}
            ratings={list.ratings}
            host={list.host}
          />
        ))}
      </div>
    </div>
  );
};

export default MyListing;