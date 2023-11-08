import { useState } from "react";
import axiosInstance from "../service/axiosInstance";

const useFetch = ({ method, urlInstance }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoadding, setIsLoading] = useState(false);

  const FetchData = async () => {
    try {
      setIsLoading(false);
      const Data = await `${axiosInstance}.${method}(${urlInstance})`;
      setData(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(true);
    }FetchData
  };

  useState(() => {
    FetchData;
  }, [urlInstance]);

  return { data, error, isLoadding };
};

export default useFetch;
