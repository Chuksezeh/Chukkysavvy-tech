import { useEffect, useState } from "react";
import { chukkytechAxios } from "./axios";


const useGetData = (url) => {

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    console.log("data>>>>>>>>>chukkytechAxios",chukkytechAxios)
  
  useEffect(() => {
      setIsPending(true)
      chukkytechAxios.get(url)
        .then(response => {
  
          if (!response.statusText === "OK") {
            throw Error("Could not fetch data")
          }else{
            setIsPending(false)
          }
          setIsPending(false)
          setData(response.data)
  
          setError(null)
          // console.log("data>>>>>>>>>",data)

        })
        .catch(error => {
          setError(error.message)
          setIsPending(false)
          console.log(error)
        })
    }, [url]);
    
  
    return { data, isPending, error }
  }

  
  export default useGetData