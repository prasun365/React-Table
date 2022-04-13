import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./TableContainer";
import { SelectColumnFilter } from "./Filter";
import LoadingSpinner from "./LoadingSpinner";

import "./App.css";

// For GET requests
axios.interceptors.response.use(
  (res) => {
     
     return res;
  },
  (err) => {
  
     return Promise.reject(err);
  }
);

function App() {
  const [data, setData] = useState([]);
  const [errorState, setErrorState]= useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
        setTimeout(() => {
          axios("http://api.tvmaze.com/search/shows?q=girls")
          .then((res) => {
            setData(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
          setErrorState(JSON.stringify(err.message));
          setIsLoading(false);
          }
          
          );
        },2000)  
  }, []);

  const columns = [
    {
      Header: "Name",
      accessor: "show.name",
    },
    {
      Header: "Type",
      accessor: "show.type",
    },
    {
      Header: "Language",
      accessor: "show.language",
    },
    {
      Header: "Official Site",
      accessor: "show.officialSite",
      Cell: ({ cell: { value } }) =>
        value ? <a href={value}>{value}</a> : "-",
    },
    {
      Header: "Rating",
      accessor: "show.rating.average",
      Cell: ({ cell: { value } }) => value || "-",
    },
    {
      Header: "Status",
      accessor: "show.status",
      Filter: SelectColumnFilter,
      filter: "includes",
    },
    {
      Header: "Premiered",
      accessor: "show.premiered",
      // disable the filter for particular column
      disableFilters: true,
      Cell: ({ cell: { value } }) => value || "-",
    },
    {
      Header: "Time",
      accessor: "show.schedule.time",
      disableFilters: true,
      Cell: ({ cell: { value } }) => value || "-",
    },
  ];

  return (
    <div className="App">
      
      {errorState? <h1>{errorState}</h1>: isLoading ? <LoadingSpinner /> :<Table columns={columns} data={data} />}
    </div>
  );
}

export default App;
