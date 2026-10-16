import React, { useState,useContext } from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import{useNavigate} from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios from 'axios';
import  { userDataContext } from '../context/UserContext';
import { toast } from "react-toastify";
const Login = () => {
    const[show,setShow]=useState(false)
    const navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext);
    let{userData,setUserData} = useContext(userDataContext)
    let{loading,setLoading}=useContext(authDataContext)
     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
      const handleLogin = async (e) => {
        setLoading(true)
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }


        
      );
      setLoading(false)
      setUserData(result.data.user)
      navigate("/")
      console.log(" login k baad ka result",result);
     toast.success("Login successfully")
      
    } catch (error) {
      console.log(error);
     toast.error(error.response?.data?.message)

      console.log(error.response?.data?.message);
      // alert(error.response?.data?.message || "Something went wrong");
    }
  };




  return (
     <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
       <div className=' absolute left-6 top-6 cursor-pointer text-gray-700 hover:text-black' onClick={()=>navigate("/")} >
              <FaArrowLeft />
            </div>
    
          <form  onSubmit={handleLogin} className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
    
            <div className="text-center mb-8">
  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
    Welcome back to
  </p>

  <h1 className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight font-[Poppins]">
    <span className="text-gray-800">Next</span>
    <span className="text-[#FF385C]">Trip</span>
  </h1>

  <p className="mt-2 text-sm text-gray-500">
    Login to plan your next stay
  </p>

  <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#FF385C]"></div>
</div>
    
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
    
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
              />
            </div>
    
            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
    
              {/* Input + Eye */}
              <div className="relative">
    
                <input
                  type={show?"text":"password"}
                  id="password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
                />
                {!show && <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>{setShow(prev=>!prev)}}/>}
    
                { show && <FaRegEyeSlash
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={()=>{setShow(prev=>!prev)}}
                />}
    
              </div>
            </div>
    
            <button
            disabled={loading}
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
           {loading?"Loading":"Login"}
            </button>
             <p className=' cursor-default text-lg text-center'>Don't have an account ?<span className='text-red-600 cursor-pointer ' onClick={()=>{navigate("/signup      ")}}>Sign up</span></p>
    
          </form>
        </div>
  )
}

export default Login