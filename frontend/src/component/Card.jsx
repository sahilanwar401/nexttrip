import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { GiConfirmed } from "react-icons/gi"
import { MdOutlineCancel } from "react-icons/md"
import { useState } from 'react'
import { bookingDataContext } from '../context/BookinContext'

const Card = ({ title, landmark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) => {
  const navigate = useNavigate()
  const { userData } = useContext(userDataContext)
  let{cancelBooking}=useContext(bookingDataContext)
  const { handleViewCard } = useContext(listingDataContext)
  let[popUp,setPopUp]=useState(false)
  const handleClick = () => {
    if (userData) {
      handleViewCard(id)
    } else {
      navigate('/login')
    }
  }

  return (
    <div
      onClick={() => (!isBooked ? handleClick() : null)}
      className='w-65 max-w-[85%] shrink-0 cursor-pointer rounded-2xl bg-white p-2 border border-stone-200 transition-shadow duration-300 hover:shadow-xl'
    >
      {/* Image slider */}
      <div className='relative'>
        <div className='w-full h-60 rounded-xl overflow-x-auto flex snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scrollbar-none'>
          <img src={image1} alt={title} className='w-full h-full object-cover shrink-0 snap-center' />
          <img src={image2} alt={title} className='w-full h-full object-cover shrink-0 snap-center' />
          <img src={image3} alt={title} className='w-full h-full object-cover shrink-0 snap-center' />
        </div>

        {/* Booked + Cancel : image ke upar, transparent */}
        {isBooked && (
          <div className='absolute top-2 left-2 right-2 flex items-center justify-between'>
            <span className='inline-flex items-center gap-1 rounded-full border border-green-200/60 bg-green-50/70 px-2.5 py-1 text-xs font-semibold text-green-700 backdrop-blur-md'>
              <GiConfirmed className='text-sm text-green-600' />
              Booked
            </span>

            {host === userData?._id && (
              <button
                onClick={()=>setPopUp(true)}
                className='inline-flex items-center gap-1 rounded-full border border-red-200/60 bg-red-50/70 px-2.5 py-1 text-xs font-semibold text-red-700 backdrop-blur-md transition-colors hover:bg-red-100/90'
              >
                <MdOutlineCancel className='text-sm text-red-600' />
                Cancel
              </button>
            )}
          </div>
        )}

        {/* Popup : image ke bich me, transparent */}
        {popUp && (
          <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-sm'>
            <div className='mx-4 w-full rounded-xl border border-white/30 bg-white/20 p-4 text-center text-white shadow-lg backdrop-blur-md'>
              <div className='text-sm font-semibold'>
                Booking Cancel!
              </div>
              <div className='mt-1 text-xs'>
                Are You sure?
                <div className='mt-3 flex items-center justify-center gap-2'>
                  <button
                    onClick={()=>{cancelBooking(id);setPopUp(false)}}
                    className='rounded-full bg-red-500/90 px-4 py-1 text-xs font-semibold text-white hover:bg-red-600'
                  >
                    Yes
                  </button>
                  <button
                    onClick={()=>setPopUp(false)}
                    className='rounded-full bg-white/80 px-4 py-1 text-xs font-semibold text-stone-800 hover:bg-white'
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Details */}
      <div className='h-22 px-2 pt-3 pb-2'>
        {/* Title + rating right side */}
        <div className='flex items-center justify-between gap-2'>
          <h3 className='min-w-0 text-base font-semibold text-stone-900 truncate uppercase'>
            {title}
          </h3>
          <span className='flex shrink-0 items-center gap-1 text-sm font-medium text-stone-900'>
            <FaStar className='text-amber-500' />
            {ratings}
          </span>
        </div>

        <p className='text-sm text-stone-500 truncate uppercase'>
          {landmark}, {city}
        </p>

        <p className='mt-2 text-sm text-stone-900'>
          <span className='font-semibold'>₹{rent}</span>
          <span className='text-stone-500'> / day</span>
        </p>
      </div>
    </div>
  )
}

export default Card