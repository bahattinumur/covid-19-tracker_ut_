import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getData } from "../../redux/actions";
import { IoIosArrowBack } from "react-icons/io";
import InfoCard from "../../components/InfoCard";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import HeaderLoader from "../../components/Loader/HeaderLoader";

const DetailPage = () => {
  // Sign-Up the Store
  const { data, error, isLoading } = useSelector((store) => store);

  // Take the params from URL.
  const { country } = useParams();

  // Dispatch setting
  const dispatch = useDispatch();

  // Take datas
  const fetchData = () => {
    dispatch(getData(country));
  };

  // Call action when component appears the screen
  useEffect(() => {
    fetchData();
  }, [country]);

  // Convert Covid information into stiring.
  const covidData = Object.entries(data?.covid || {});

  return (
    <div className="min-h-[calc(100vh-75px)] bg-zinc-800 text-white p-6 grid place-items-center ">
      <div className="min-h-[80vh] bg-white rounded-lg shadow-lg p-8 max-w-3xl">
        {/* Up Content */}
        <div className="flex gap-5 justify-between items-center mb-6">
          <Link
            className="flex items-center gap-2 bg-gray-700 py-2 px-4 rounded-md hover:bg-gray-800"
            to={"/"}
          >
            <IoIosArrowBack /> Back
          </Link>

          <div className="flex items-center space-x-2">
            {isLoading ? (
              <HeaderLoader />
            ) : (
              !error && (
                <>
                  <img
                    className="w-24 h-12 rounded-md"
                    src={data.country.flags.svg}
                  />
                  <h1
                    data-testid="title"
                    className="text-3xl font-bold text-gray-900"
                  >
                    {data.country.name.common}
                  </h1>
                </>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Details */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorDisplay message={error} retry={fetchData} />
          ) : (
            covidData.map((item, key) => <InfoCard key={key} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
