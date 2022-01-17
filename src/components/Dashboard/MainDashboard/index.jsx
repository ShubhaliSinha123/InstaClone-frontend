import { useState, useEffect } from "react";

import LoadingSpinner from "../../../ui/LoadingSpinner";
import DashboardLayout from "./dashboard";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [resultData, setResultData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    setHasError(null);
    const fetchData = async () => {
      try {
        const result = await fetch("/all-posts", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        const data = await result.json();
        setResultData(data.data);
        setIsLoading(false);
      } catch (error) {
        setHasError(error.message);
      }
    };
    fetchData();
  }, [token]);


  return (
    <>
      {isLoading && !hasError ? (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {resultData.map((data, id) => (
            <div key={id}>
            <DashboardLayout id={id} data={data} />
            </div>
          ))}
        </>
      )
    }
    <div>{hasError}</div>
    </>
  );
};

export default Dashboard;
