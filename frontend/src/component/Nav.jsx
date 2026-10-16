import { useEffect, useState } from "react";

import { BiBuildingHouse } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaTreeCity } from "react-icons/fa6";

import { GiFamilyHouse, GiHamburgerMenu, GiWoodCabin } from "react-icons/gi";

import { IoBedOutline, IoSearchSharp } from "react-icons/io5";

import { MdBedroomParent, MdOutlinePool, MdWhatshot } from "react-icons/md";

import { SiHomeassistantcommunitystore } from "react-icons/si";

import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/nexttrip.png";
import { authDataContext } from "../context/AuthContext";
import { listingDataContext } from "../context/ListingContext";
import { userDataContext } from "../context/UserContext";

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let {
    listingData,
    setListingData,
    newListingData,
    setNewListingData,
    searchData,
    handleSearch,
    handleViewCard,
    setSearchData,
  } = useContext(listingDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  let [cate, setCate] = useState();
  let [input, setInput] = useState("");

  const handleLogOut = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(result);
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category) => {
    setCate(category);
    if (category == "trending") {
      setNewListingData(listingData);
    } else {
      setNewListingData(
        listingData.filter((list) => list.category == category)
      );
    }
  };
  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      handleSearch(input);
    } else {
      setSearchData([]);
    }
  }, [input]);

  return (
    <div className="w-full shrink-0 relative z-50 bg-white">
      {/* ================= NAVBAR ================= */}
      <div className="w-full border-b border-gray-200 px-4 sm:px-6 md:px-10 py-4">
        {/* ================= TOP NAV ================= */}
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <div className="shrink-0">
            <img
              src={logo}
              alt="NextTrip"
              className="w-32 sm:w-36 md:w-40 cursor-pointer"
            />
          </div>

          {/* ================= DESKTOP SEARCH ================= */}
          <div className="hidden sm:flex items-center w-full max-w-md border border-gray-300 rounded-full shadow-sm hover:shadow-md transition overflow-hidden">
            <input
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              placeholder="Search destinations"
              className="flex-1 min-w-0 px-5 py-3 outline-none text-sm"
            />

            <button className="mr-2 w-9 h-9 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition">
              <IoSearchSharp size={18} />
            </button>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative flex items-center gap-2 sm:gap-4 shrink-0">
            {/* LIST YOUR HOME */}
            <span
              onClick={() => navigate("/listingPage1")}
              className="hidden md:block text-sm font-medium px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              List your home
            </span>

            {/* PROFILE BUTTON */}
            <button
              onClick={() => setShow((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full hover:shadow-md transition"
            >
              <span>
                {" "}
                <GiHamburgerMenu size={18} />
              </span>
              {userData == null && (
                <span>
                  {" "}
                  <CgProfile size={28} />
                </span>
              )}
              {userData != null && (
                <span className="w-7.5 h-7.5 bg-black text-white rounded-full flex justify-center items-center">
                  {userData?.name?.slice(0, 1)}
                </span>
              )}
            </button>

            {/* ================= DROPDOWN ================= */}
            {show && (
              <div className="absolute top-full right-0 sm:right-4 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
                <ul className="list-none p-2 space-y-1">
                  {!userData && (
                    <li
                      onClick={() => navigate("/login")}
                      className="px-4 py-3 rounded-xl text-gray-800 font-medium hover:bg-gray-100 cursor-pointer transition"
                    >
                      Login
                    </li>
                  )}

                  {userData && (
                    <li
                      onClick={handleLogOut}
                      className="px-4 py-3 rounded-xl text-gray-800 font-medium hover:bg-gray-100 cursor-pointer transition"
                    >
                      Logout
                    </li>
                  )}

                  <div className="border-t border-gray-200 my-2"></div>

                  <li
                    onClick={() => navigate("/listingPage1")}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  >
                    List your home
                  </li>

                  <li
                    onClick={() => navigate("/mylisting")}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  >
                    My listing
                  </li>

                  <li
                    onClick={() => navigate("/mybooking")}
                    className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                  >
                    My Booking
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* ================= for search box================= */}

        {searchData?.length > 0 && (
          <div className="relative w-full flex justify-center">
            <div className="absolute top-2 w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl max-h-72 overflow-y-auto py-2 z-50">
              {searchData.map((search) => (
                <div
                  key={search._id}
                  onClick={() => handleClick(search._id)}
                  className="px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer transition"
                >
                  <span className="font-medium text-gray-900">
                    {search.title}
                  </span>
                  <span className="text-gray-500">
                    {" "}
                    in {search.landmark}, {search.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MOBILE SEARCH ================= */}
        <div className="flex sm:hidden items-center w-full mt-4 border border-gray-300 rounded-full shadow-sm overflow-hidden">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder="Search destinations"
            className="flex-1 min-w-0 px-5 py-3 outline-none text-sm"
          />

          <button className="mr-2 w-9 h-9 shrink-0 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition">
            <IoSearchSharp size={18} />
          </button>
        </div>
      </div>

      {/* ================= CATEGORY SECTION ================= */}

      <div className="w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* 
          min-w-max:
          categories apni required width lengi

          justify-center:
          available space hone par center mein rahengi

          gap-8:
          categories ke beech gap
        */}
        <div className="flex items-center justify-center gap-8 px-6 py-4 min-w-max min-h-24">
          {/* TRENDING */}
          <div
            onClick={() => {
              handleCategory("trending");
              setCate("");
            }}
            className="shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition"
          >
            <MdWhatshot className="w-8 h-8" />
            <h3 className="text-sm font-medium">Trending</h3>
          </div>

          {/* Villa */}
          <div
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "villa" ? "border-b" : ""
            }`}
            onClick={() => handleCategory("villa")}
          >
            <GiFamilyHouse className="w-8 h-8" />
            <h3 className="text-sm font-medium">Villa</h3>
          </div>

          {/* ROOMS */}
          <div
            onClick={() => handleCategory("rooms")}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "villa" ? "border-b" : ""
            }`}
          >
            <MdBedroomParent className="w-8 h-8" />
            <h3 className="text-sm font-medium">Rooms</h3>
          </div>

          {/* POOL HOUSE */}
          <div
            onClick={() => {
              poolHouse;
            }}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "poolHouse" ? "border-b" : ""
            }`}
          >
            <MdOutlinePool className="w-8 h-8" />
            <h3 className="text-sm font-medium">Pool House</h3>
          </div>

          {/* CABIN */}
          <div
            onClick={() => handleCategory("cabin")}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "cabin" ? "border-b" : ""
            }`}
          >
            <GiWoodCabin className="w-8 h-8" />
            <h3 className="text-sm font-medium">Cabin</h3>
          </div>

          {/* SHOPS */}
          <div
            onClick={() => {
              handleCategory("shops");
            }}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "shops" ? "border-b" : ""
            }`}
          >
            <SiHomeassistantcommunitystore className="w-8 h-8" />
            <h3 className="text-sm font-medium">Shops</h3>
          </div>

          {/*Farm House */}
          <div
            onClick={() => {
              handleCategory("farmHouse");
            }}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "farmHouse" ? "border-b" : ""
            }`}
          >
            <FaTreeCity className="w-8 h-8" />
            <h3 className="text-sm font-medium">Farm House</h3>
          </div>

          {/* PG */}
          <div
            onClick={() => {
              handleCategory("pg");
            }}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "pg" ? "border-b" : ""
            }`}
          >
            <IoBedOutline className="w-8 h-8" />
            <h3 className="text-sm font-medium">PG</h3>
          </div>

          {/* FLAT*/}
          <div
            onClick={() => {
              handleCategory("flat");
            }}
            className={`shrink-0 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-black hover:border-b-2 border-black cursor-pointer pb-2 transition ${
              cate == "flat" ? "border-b" : ""
            }`}
          >
            <BiBuildingHouse className="w-8 h-8" />
            <h3 className="text-sm font-medium">Flat</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
