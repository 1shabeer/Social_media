import axios from "axios";
import  { useEffect, useState } from "react";

const useAxiosFetch = (dataUrl) =>{
   
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] =useState(false);

    useEffect(()=>{
        let isMounded = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url)=>{
            setIsLoading(true);
            try{
                const response = await axios.get(url,{
                    cancelToken:source.token
                });
                if(isMounded){
                    setData(response.data);
                    setFetchError(null);
                }
            }catch(err){
              if(isMounded){
                setFetchError(err.message)
                setData([])
              }
            }finally{
             isMounded && setTimeout(()=> setIsLoading(false),2000) 
            }
        }

        fetchData(dataUrl);
       
        const cleanup = () =>{
            isMounded=false
            source.cancel();
        }
        return cleanup;

    },[dataUrl]);

    return {data, fetchError, isLoading};
}

export default useAxiosFetch;