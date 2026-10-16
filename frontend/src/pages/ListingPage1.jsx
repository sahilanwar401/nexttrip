import { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";

const ListingPage1 = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState();
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
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 flex flex-col">
      {/* Header: left = back arrow, right = title */}
      <header className="sticky top-0 z-10 w-full flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-gray-700 hover:text-black text-lg sm:text-xl cursor-pointer"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          Set Up Your Home
        </h1>
      </header>

      {/* Form area */}
      <main className="flex-1 flex justify-center px-3 sm:px-4 py-4 sm:py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/listingPage2");
          }}
          className="w-full max-w-md sm:max-w-lg md:max-w-2xl my-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
        >
          {/* form fields yahan aayenge */}

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="des"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>

            <textarea
              name=""
              id="des"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          {/* Images: mobile par 1 column, tablet/desktop par bhi clean stack */}
          <div className="mb-4">
            <label
              htmlFor="img1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image1
            </label>

            <input
              type="file"
              id="img1"
              className="block w-full text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
              required
              onChange={handleImage1}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="img2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image2
            </label>

            <input
              type="file"
              id="img2"
              className="block w-full text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
              required
              onChange={handleImage2}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="img3"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image3
            </label>

            <input
              type="file"
              id="img3"
              className="block w-full text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100 file:cursor-pointer"
              required
              onChange={handleImage3}
            />
          </div>

          {/* Rent + City: mobile par ek ke neeche ek, sm+ par side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
            <div className="mb-4">
              <label
                htmlFor="rent"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rent
              </label>

              <input
                type="number"
                id="rent"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setRent(e.target.value)}
                value={rent}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>

              <input
                type="text"
                id="city"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="landmark"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Landmark
            </label>

            <input
              type="text"
              id="landmark"
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>
      </main>
    </div>
  );
};

export default ListingPage1;
