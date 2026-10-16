import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi"
import { bookingDataContext } from '../context/BookinContext'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Star from '../component/Star'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/ListingContext'
const Booked = () => {
  let[star,setStar]=useState(null)
  let {serverUrl}= useContext(authDataContext)
  let { bookingData } = useContext(bookingDataContext)
  let{getCurrentUser}=useContext(userDataContext)
  let{getListing}=useContext(listingDataContext)
  let{cardDetails}=useContext(listingDataContext)
  let navigate = useNavigate()
  const handleRatings = async(id)=>{
    try {
      let result = await axios.post(serverUrl + `/api/listing/ratings/${id}`,{
        ratings:star
      },{withCredentials:true})
      await getCurrentUser()
      await getListing()
      console.log(result);
      navigate("/")
      
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

  const handleStar=async(value)=>{
    setStar(value)
    console.log("you Rated",value);
    

  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-slate-100 px-4 py-10'>

      {/* Confirmation card */}
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>

        <div className='flex flex-col items-center gap-3 bg-emerald-50 px-6 py-8 border-b border-emerald-100'>
          <GiConfirmed className='text-6xl text-emerald-600' />
          <h2 className='text-2xl font-semibold text-emerald-800 text-center'>
            Booking Confirmed
          </h2>
        </div>

        <div className='flex flex-col divide-y divide-slate-100 px-6'>
          <div className='flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
            <span className='text-sm font-medium text-slate-500'>Booking Id</span>
            <span className='text-sm font-semibold text-slate-800 break-all sm:text-right'>
              {bookingData._id}
            </span>
          </div>

          <div className='flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
            <span className='text-sm font-medium text-slate-500'>Owner details</span>
            <span className='text-sm font-semibold text-slate-800 break-all sm:text-right'>
              {bookingData.host?.email}
            </span>
          </div>

          <div className='flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
            <span className='text-sm font-medium text-slate-500'>Total rent</span>
            <span className='text-lg font-bold text-slate-900 sm:text-right'>
              {bookingData.totalRent}
            </span>
          </div>
        </div>

      </div>

      {/* Rating card */}
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 px-6 py-6 flex flex-col items-center gap-4'>
        <h1 className='text-lg font-semibold text-slate-800 text-center'>
          {star} out of 5 ratings
        </h1>

        <Star onRate={handleStar}/>

        <button
          onClick={()=>handleRatings(cardDetails._id)}
          className='w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors duration-150 cursor-pointer'
        >
          Submit
        </button>
      </div>

      {/* Back to home */}
      <button
        onClick={()=>navigate("/")}
        className='w-full max-w-md bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-lg transition-colors duration-150 cursor-pointer'
      >
        Back to home
      </button>

    </div>
  )
}

export default Booked