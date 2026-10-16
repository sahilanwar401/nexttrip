import React, { useContext } from 'react'
import Nav from '../component/Nav'
import Card from '../component/Card'
import ListingContext, { listingDataContext } from '../context/ListingContext'
import { userDataContext } from '../context/UserContext'

const Home = () => {
 
  let { listingData, setListingData ,newListingData} = useContext(listingDataContext)
console.table(listingData.map((l) => ({ title: l.title, city: l.city, rent: l.rent, image1: l.image1 })))
  return (
    <div className='w-full h-screen flex flex-col overflow-hidden'>
      <Nav />
      <div className='flex-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden'>
        <div className='w-full flex flex-wrap justify-center items-start gap-10 px-10 pt-8 pb-10'>
          {newListingData.map((list) => (
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
              ratings={list.ratings}
              isBooked={list.isBooked}
              host={list.host}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home