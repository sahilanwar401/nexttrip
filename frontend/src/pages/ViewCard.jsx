import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from '../context/ListingContext';
import { userDataContext } from '../context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios  from 'axios';
import { authDataContext } from '../context/AuthContext';
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from '../context/BookinContext';
import { toast } from 'react-toastify';
const ViewCard = () => {
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate()
  let { cardDetails,updating,setUpdating ,deleting,setDeleting  } = useContext(listingDataContext)
  let { userData } = useContext(userDataContext)
  let [updatePopUp, setUpdatePopUp] = useState(false)
  let [bookingPopUp, setBookingPopUp] = useState(false)
  let [title, setTitle] = useState(cardDetails.title);
    let [description, setDescription] = useState(cardDetails.description);
    let [backEndImage1, setBackendImage1] = useState(null);
    let [backEndImage2, setBackendImage2] = useState(null);
    let [backEndImage3, setBackendImage3] = useState(null);
    let [rent, setRent] = useState(cardDetails.rent);
    let [city, setCity] = useState(cardDetails.city);
    let [landmark, setLandmark] = useState(cardDetails.landmark);
    let[minDate ,setMinDate]= useState("")
    let{checkIn,setCheckIn,
        checkOut,setCheckOut,
        total,setTotal,
        night,setNight,handleBooking,booking,} = useContext(bookingDataContext)

        useEffect(()=>{
          if(checkIn && checkOut){
            let inDate = new Date(checkIn)
            let outDate = new Date(checkOut)
            let n = (outDate - inDate)/(24*60*60*1000)
            setNight(n)
            let airBnbCharge = (cardDetails.rent*(7/100))
            let tax = (cardDetails.rent*(7/100))
            if(n>0){
              setTotal((cardDetails.rent * n) + airBnbCharge + tax)
            }
            else{
              setTotal(0)
            }

          }
        },[checkIn,checkOut,cardDetails.rent,total])
   

  const handleUpdateListing = async()=>{
    setUpdating(true)
    try {
          
          let formData = new FormData();
          formData.append("title", title);
          formData.append("image1", backEndImage1);
          formData.append("image2", backEndImage2);
          formData.append("image3", backEndImage3);
          formData.append("description", description);
          formData.append("rent", rent);
          formData.append("city", city);
          formData.append("landmark", landmark);
          // formData.append("category", category);
          let result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}` , formData, {
            withCredentials: true,
          });
          setUpdating(false)

          
          console.log(result);
          toast.success("Listing Updated")
          
          navigate("/")

          setTitle(""),
          setDescription(""),
          // setFrontEndImage1(null),
          //  setFrontEndImage2(null),
          //   setFrontEndImage3(null),
            setBackendImage1(null),
            setBackendImage2(null),
            setBackendImage3(null),
            setRent(""),
            setCity(""),
            setLandmark("")
            // setCategory("")
    
        } catch (error) {
          console.log(error);
          setUpdating(false)
           toast.error(error.response?.data?.message)
          
          
          
    
        }

  }

  const handleDeleteListing = async()=>{
    setDeleting(true)
    try {
       let result = await axios .delete( serverUrl + `/api/listing/delete/${cardDetails._id}`,{withCredentials:true})
      console.log(result.data);
      setDeleting(false)
      navigate("/")
      toast.success("Listing deleted")
    }
     catch (error) {
      console.log(error);
      setDeleting(false)
     toast.error(error.response?.data?.message)

      
      
    }
  }


   const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendImage1(file);
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendImage2(file);
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendImage3(file);
    
  };

  useEffect(()=>{
    let today =  new Date().toISOString().split('T')[0]
    setMinDate(today)
  },[])

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 flex flex-col [&::-webkit-scrollbar]:hidden scrollbar-none">
     <header className="sticky top-0 z-10 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-white shadow-sm">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="text-gray-700 hover:text-black text-lg sm:text-xl cursor-pointer"
  >
    <FaArrowLeft />
  </button>

  <div
    onClick={() => navigate("/")}
    className="flex flex-col items-center leading-tight cursor-pointer select-none"
  >
    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
      <span className="text-gray-800">Next</span>
      <span className="text-[#FF385C]">Trip</span>
    </h2>
    <p className="text-[10px] sm:text-xs italic text-gray-500">
      Your next stay, your next story
    </p>
  </div>

  {/* Naam ko beech mein rakhne ke liye khali jagah */}
  <div className="w-5 sm:w-6"></div>
</header>

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-gray-800 text-center px-4 py-6 sm:py-8">
          {`IN ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      {/* Images section */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:h-65 md:h-80 lg:h-90">
          {/* Main image: top on mobile, left on sm+ */}
          <div className="w-full h-45 sm:h-full sm:w-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
            <img
              src={cardDetails.image1}
              alt="image1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Two images: side by side on mobile, stacked on sm+ */}
          <div className="w-full sm:w-1/2 h-27.5 sm:h-full flex flex-row sm:flex-col gap-2 sm:gap-3">
            <div className="w-1/2 sm:w-full h-full sm:h-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
              <img
                src={cardDetails.image2}
                alt="image2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-1/2 sm:w-full h-full sm:h-1/2 overflow-hidden rounded-lg sm:rounded-xl shadow-md">
              <img
                src={cardDetails.image3}
                alt="image3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 text-lg sm:text-xl md:text-2xl font-bold text-gray-900 wrap-break-word">
        {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()},${cardDetails.landmark.toUpperCase()}`}
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-3 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed wrap-break-word">
        {cardDetails.description}
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pt-3 pb-10 text-xl sm:text-2xl md:text-3xl font-bold text-red-500">
        {`${String(cardDetails.rent).toUpperCase()}`}
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
        {cardDetails.host == userData?._id && (
          <button
            onClick={() => setUpdatePopUp((prev) => !prev)}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 cursor-pointer"
          >
            Edit Listing
          </button>
        )}

        {cardDetails.host != userData?._id && (
          <button onClick={() => setBookingPopUp((prev) => !prev)} className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 cursor-pointer">
            RESERVE
          </button>
        )}
      </div>

      {/* EDIT POPUP: dark grey background + red cross (left) + fixed-size centered form */}
      {updatePopUp && (
        <div className="fixed inset-0 z-50 bg-gray-800/95 overflow-y-auto [&::-webkit-scrollbar]:hidden       scrollbar-none">
          {/* Cross button */}
          <button
            type="button"
            onClick={() => setUpdatePopUp(false)}
            className="fixed top-6 left-6 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-xl shadow-lg cursor-pointer transition"
          >
            <RxCross2 />
          </button>

          {/* Form wrapper: screen ke beech mein */}
          <div className="min-h-full w-full flex justify-center items-center px-3 sm:px-4 py-4">
            <form onSubmit={(e)=>{e.preventDefault()}}
              className="w-full max-w-2xl bg-white p-4 sm:p-5 rounded-2xl shadow-lg"
            >
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                Update Your Details
              </h1>

              {/* Row 1: Title + Rent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div className="mb-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="rent"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rent
                  </label>
                  <input
                    type="number"
                    id="rent"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    required
                     onChange={(e)=>setRent(e.target.value)}
                    value={rent}
                  />
                </div>
              </div>

              {/* Row 2: City + Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div className="mb-3">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    required
                     onChange={(e)=>setCity(e.target.value)}
                    value={city}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="landmark"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    required
                     onChange={(e)=>setLandmark(e.target.value)}
                    value={landmark}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label
                  htmlFor="des"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  name=""
                  id="des"
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                   onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                ></textarea>
              </div>

              {/* Images: teeno ek hi row mein */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3">
                <div className="mb-3 min-w-0">
                  <label
                    htmlFor="img1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image1
                  </label>
                  <input
                    type="file"
                    id="img1"
                    className="block w-full text-xs text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-2 file:py-1.5 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
                    required
                    onChange={handleImage1}
                  />
                </div>

                <div className="mb-3 min-w-0">
                  <label
                    htmlFor="img2"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image2
                  </label>
                  <input
                    type="file"
                    id="img2"
                    className="block w-full text-xs text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-2 file:py-1.5 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
                    required
                    onChange={handleImage2}
                  />
                </div>

                <div className="mb-3 min-w-0">
                  <label
                    htmlFor="img3"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image3
                  </label>
                  <input
                    type="file"
                    id="img3"
                    className="block w-full text-xs text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-2 file:py-1.5 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
                    required
                    onChange={handleImage3}
                  />
                </div>
              </div>

              <button
              onClick={handleUpdateListing}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
                disabled={updating}
              >
                {updating ? "Updating...":"Update Listing"}
              </button>
              <button
              onClick={handleDeleteListing}
               disabled={deleting}
               type="button"
                  className="w-full mt-3 py-2 rounded-lg font-medium text-red-600 border border-red-500 bg-white hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-300 cursor-pointer"
>
                 { deleting ? "Deleting...":"Delete Listing"}
              </button>
              
            </form>
          </div>
        



        </div>
      )}
                 {/* BOOKING POPUP: sirf blur + left cross */}
            {/* BOOKING POPUP */}
           {/* BOOKING POPUP */}
            {/* BOOKING POPUP */}
            {/* BOOKING POPUP */}
      {bookingPopUp && (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-md overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
          {/* Cross button */}
          <button
            type="button"
            onClick={() => setBookingPopUp(false)}
            className="fixed top-5 left-5 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-xl shadow-lg cursor-pointer transition active:scale-95"
          >
            <RxCross2 />
          </button>

          <div className="min-h-full w-full flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT: Trip form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="p-6 sm:p-8 flex flex-col"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Confirm & Book
                </h1>

                <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
                  Your Trip
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 transition">
                    <label
                      htmlFor="checkin"
                      className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                      Check-In
                    </label>
                    <input
                      type="date"
                      id="checkin"
                      min={minDate}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-gray-900 outline-none cursor-pointer"
                    />
                  </div>

                  <div className="border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 transition">
                    <label
                      htmlFor="checkOut"
                      className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                    >
                      Check-Out
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      min={checkIn || minDate}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-gray-900 outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {night > 0 && (
                  <div className="mt-4 inline-flex self-start items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
                    {night} {night === 1 ? 'night' : 'nights'} selected
                  </div>
                )}

                <button
                  type="submit"
                  disabled={booking}
                  onClick={()=>{handleBooking(cardDetails._id)}}
                  className="mt-8 lg:mt-auto w-full bg-linear-to-r from-red-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-600 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  {booking?"Booking...":"Book Now"}
                </button>
              </form>

              {/* RIGHT: Summary */}
              <div className="bg-gray-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col gap-5">
                {/* Property */}
                <div className="flex gap-4">
                  <div className="w-28 h-24 sm:w-32 sm:h-28 shrink-0 overflow-hidden rounded-xl shadow-sm">
                    <img
                      src={cardDetails.image1}
                      alt={cardDetails.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase break-words">
                      {cardDetails.landmark}, {cardDetails.city}
                    </p>
                    <h2 className="text-base font-bold text-gray-900 uppercase break-words leading-snug mt-0.5">
                      {cardDetails.title}
                    </h2>
                    <p className="text-xs text-gray-500 uppercase break-words">
                      {cardDetails.category}
                    </p>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-gray-800">
                      <FaStar className="text-amber-500" />
                      {cardDetails.ratings}
                    </span>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Booking Price
                  </h2>

                  <div className="flex flex-col gap-3 text-sm text-gray-600">
                    <p className="flex items-center justify-between">
                      <span>{`₹${cardDetails.rent} × ${night} nights`}</span>
                      <span className="font-medium text-gray-900">
                        ₹{(cardDetails.rent * night).toLocaleString('en-IN')}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Tax</span>
                      <span className="font-medium text-gray-900">
                        ₹{((cardDetails.rent * 7) / 100).toLocaleString('en-IN')}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Airbnb Charge</span>
                      <span className="font-medium text-gray-900">
                        ₹{((cardDetails.rent * 7) / 100).toLocaleString('en-IN')}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-dashed border-gray-300 mt-4 pt-4">
                    <span className="text-base font-bold text-gray-900">
                      Total Price
                    </span>
                    <span className="text-xl font-extrabold text-red-500">
                      ₹{Number(total).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewCard