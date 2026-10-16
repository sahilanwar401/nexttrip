import React, { useContext } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './context/UserContext'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
 import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  let{userData} = useContext(userDataContext)
  return (
    <>
     <ToastContainer />
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/listingPage1' element = { userData != null ? <ListingPage1/>:<Navigate to={"/"}/>}/>
      <Route path='/listingPage2' element = { userData != null ? <ListingPage2/>:<Navigate to={"/"}/>}/>
      <Route path='/listingPage3' element = { userData != null ? <ListingPage3/>:<Navigate to={"/"}/>}/>
      <Route path='/mylisting' element = { userData != null ? <MyListing/>:<Navigate to={"/"}/>}/>
      <Route path='/viewcard' element = { userData != null ? <ViewCard/>:<Navigate to={"/"}/>}/>
      <Route path='/mybooking' element = { userData != null ? <MyBooking/>:<Navigate to={"/"}/>}/>
      <Route path='/booked' element = { userData != null ? <Booked/>:<Navigate to={"/"}/>}/>





    </Routes>
    
    </>
  )
}

export default App