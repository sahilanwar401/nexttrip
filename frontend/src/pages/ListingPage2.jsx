import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { BiBuildingHouse } from "react-icons/bi";
import { FaTreeCity } from "react-icons/fa6";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { listingDataContext } from "../context/ListingContext";

const ListingPage2 = () => {
  const navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext);

  const boxClass =
    "flex flex-col items-start justify-center gap-3 p-4 sm:p-5 rounded-xl text-gray-700 hover:border-black hover:shadow-md cursor-pointer transition border-2";

  const selectedClass = "border-black bg-gray-100 shadow-md";
  const normalClass = "border-gray-300 bg-white";

  const iconClass = "w-7 h-7 sm:w-8 sm:h-8";
  const textClass = "text-sm sm:text-base font-medium";

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/listingPage1")}
          className="text-gray-700 hover:text-black text-lg sm:text-xl cursor-pointer"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          Set your category
        </h1>
      </header>

      <div className="w-full px-4 sm:px-6 md:px-10 pt-8 pb-4 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Which of these best describes your place?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Select one category that fits your property
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-10">
        {/* Har row me 3 category */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">

          {/* Villa */}
          <div
            className={`${boxClass} ${category === "villa" ? selectedClass : normalClass}`}
            onClick={() => setCategory("villa")}
          >
            <GiFamilyHouse className={iconClass} />
            <h3 className={textClass}>Villa</h3>
          </div>

          {/* Rooms */}
          <div
            className={`${boxClass} ${category === "rooms" ? selectedClass : normalClass}`}
            onClick={() => setCategory("rooms")}
          >
            <MdBedroomParent className={iconClass} />
            <h3 className={textClass}>Rooms</h3>
          </div>

          {/* Pool House */}
          <div
            className={`${boxClass} ${category === "poolHouse" ? selectedClass : normalClass}`}
            onClick={() => setCategory("poolHouse")}
          >
            <MdOutlinePool className={iconClass} />
            <h3 className={textClass}>Pool House</h3>
          </div>

          {/* Cabin */}
          <div
            className={`${boxClass} ${category === "cabin" ? selectedClass : normalClass}`}
            onClick={() => setCategory("cabin")}
          >
            <GiWoodCabin className={iconClass} />
            <h3 className={textClass}>Cabin</h3>
          </div>

          {/* Shops */}
          <div
            className={`${boxClass} ${category === "shops" ? selectedClass : normalClass}`}
            onClick={() => setCategory("shops")}
          >
            <SiHomeassistantcommunitystore className={iconClass} />
            <h3 className={textClass}>Shops</h3>
          </div>

          {/* Farm House */}
          <div
            className={`${boxClass} ${category === "farmHouse" ? selectedClass : normalClass}`}
            onClick={() => setCategory("farmHouse")}
          >
            <FaTreeCity className={iconClass} />
            <h3 className={textClass}>Farm House</h3>
          </div>

          {/* PG */}
          <div
            className={`${boxClass} ${category === "pg" ? selectedClass : normalClass}`}
            onClick={() => setCategory("pg")}
          >
            <IoBedOutline className={iconClass} />
            <h3 className={textClass}>PG</h3>
          </div>

          {/* Flat */}
          <div
            className={`${boxClass} ${category === "flat" ? selectedClass : normalClass}`}
            onClick={() => setCategory("flat")}
          >
            <BiBuildingHouse className={iconClass} />
            <h3 className={textClass}>Flat</h3>
          </div>

        </div>

        {/* Next button - categories ke niche */}
        <div className="w-full flex justify-center mt-8">
          <button disabled={!category}
            type="button"
            onClick={() => navigate("/listingPage3")}
            className="w-full sm:w-auto sm:min-w-48 bg-red-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-600 transition cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingPage2;