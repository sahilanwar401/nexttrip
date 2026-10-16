import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from '../context/ListingContext';

const ListingPage3 = () => {
  let navigate = useNavigate()
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackendImage1,
    backEndImage2,
    setBackendImage2,
    backEndImage3,
    setBackendImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category, setCategory, handleAddListing,adding,setAdding
  } = useContext(listingDataContext)

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/listingPage2")}
          className="text-gray-700 hover:text-black text-lg sm:text-xl cursor-pointer"
        >
          <FaArrowLeft />
        </button>
      </header>

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-gray-800 text-center px-4 py-6 sm:py-8">
          {`IN ${landmark.toUpperCase()},${city.toUpperCase()}`}
        </h1>
      </div>

      {/* Images section */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:h-65 md:h-80 lg:h-90">
          {/* Main image: top on mobile, left on sm+ */}
          <div className="w-full h-45 sm:h-full sm:w-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
            <img
              src={frontEndImage1}
              alt="image1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Two images: side by side on mobile, stacked on sm+ */}
          <div className="w-full sm:w-1/2 h-27.5 sm:h-full flex flex-row sm:flex-col gap-2 sm:gap-3">
            <div className="w-1/2 sm:w-full h-full sm:h-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
              <img
                src={frontEndImage2}
                alt="image2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-1/2 sm:w-full h-full sm:h-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
              <img
                src={frontEndImage3}
                alt="image3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 wrap-break-word">
        {`${title.toUpperCase()} ${category.toUpperCase()},${landmark.toUpperCase()}`}
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed wrap-break-word">
        {description.toUpperCase()}
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-3 pb-10 text-xl sm:text-2xl md:text-3xl font-bold text-red-500">
        {`${String(rent).toUpperCase()}`}
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-10">
        <button onClick={handleAddListing} className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 cursor-pointer" disabled={adding}>
          {adding?"Adding...":"Add Listing"}
        </button>
      </div>
    </div>
  )
}

export default ListingPage3