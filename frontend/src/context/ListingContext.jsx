import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authDataContext } from "./AuthContext";
export const listingDataContext = createContext();
const ListingContext = ({ children }) => {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);

  let [backEndImage1, setBackendImage1] = useState(null);
  let [backEndImage2, setBackendImage2] = useState(null);
  let [backEndImage3, setBackendImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newListingData, setNewListingData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let { serverUrl } = useContext(authDataContext);
  let[searchData,setSearchData]= useState([])

  const handleAddListing = async () => {
    try {
      setAdding(true);
      let formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) {
        formData.append("image1", backEndImage1);
      }
      if (backEndImage1) {
        formData.append("image2", backEndImage2);
      }
      if (backEndImage3) {
        formData.append("image3", backEndImage3);
      }
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      setAdding(false);
      console.log(result);

      navigate("/");
      toast.success("Listed successfully");
      setTitle(""),
        setDescription(""),
        setFrontEndImage1(null),
        setFrontEndImage2(null),
        setFrontEndImage3(null),
        setBackendImage1(null),
        setBackendImage2(null),
        setBackendImage3(null),
        setRent(""),
        setCity(""),
        setLandmark(""),
        setCategory("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);

      setAdding(false);
    }
  };
  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      console.log(result);
      setCardDetails(result.data);
      navigate("/viewcard");
    } catch (error) {
      console.log(error);
    }
  };
   const handleSearch = async(data)=>{
    try {
      let result = await axios.get(serverUrl + `/api/listing/search/?query=${data}`)
      setSearchData(result.data)
      
    } catch (error) {
      setSearchData(null)
      console.log(error);

      
      
    }

   }





  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListingData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListing();
  }, [adding, updating, deleting]);

  let value = {
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
    category,
    setCategory,
    handleAddListing,
    adding,
    setAdding,
    listingData,
    setListingData,
    getListing,
    newListingData,
    setNewListingData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    updating,
    setUpdating,
    deleting,
    setDeleting,handleSearch,searchData,setSearchData,
  };
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
};

export default ListingContext;
