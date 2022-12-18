import axios from "axios";
import { useEffect, useState } from "react";

export function useGetAxios(initial_url = "") {
  const [url, setUrl] = useState(initial_url);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function getData() {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    url && getData();
  }, [url]);

  return { data, isLoading, setUrl, reFetch: getData, error };
}
