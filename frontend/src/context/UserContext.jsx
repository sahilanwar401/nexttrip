import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();
const UserContext = ({ children }) => {
  let { serverUrl } = useContext(authDataContext);
  
  let [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,getCurrentUser,
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
